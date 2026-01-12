// Enhanced Report Service with Fusion Engine and PDF Generation

import Report from '../models/Report.js'
import Test from '../models/Test.js'
import { generateUnifiedReport } from '../utils/reportFusion.js'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

// Generate comprehensive psychometric report
export async function generateReportFromTest(userId) {
  // Find latest completed test for user
  const test = await Test.findOne({ user: userId, status: 'completed' }).sort({ createdAt: -1 })
  if (!test) throw { statusCode: 400, message: 'No completed test found for user' }
  
  // Check if report already exists for this test
  const existingReport = await Report.findOne({ test: test._id })
  if (existingReport) {
    return existingReport
  }
  
  // Generate unified report using fusion engine
  const reportData = generateUnifiedReport(test, test.section_scores)
  
  // Create report document
  const report = new Report({
    user: userId,
    test: test._id,
    ...reportData,
    pdf_generated: false,
  })
  
  await report.save()
  return report
}

// Get report by ID
export async function getReportById(id) {
  const report = await Report.findById(id).populate('user', 'name email class').populate('test')
  if (!report) throw { statusCode: 404, message: 'Report not found' }
  return report
}

// Get all reports for a user
export async function getUserReports(userId) {
  const reports = await Report.find({ user: userId }).sort({ createdAt: -1 }).populate('test')
  return reports
}

// Generate PDF for report (placeholder - will implement HTML-to-PDF)
export async function generateReportPDF(reportId) {
  const report = await Report.findById(reportId).populate('user', 'name email class')
  if (!report) throw { statusCode: 404, message: 'Report not found' }

  // Create a full report PDF (all sections)
  const { pdfUrl } = await generateReportSectionPDF(reportId, 'all')
  return { pdfUrl, report }
}

export async function generateReportSectionPDF(reportId, sectionKey) {
  const report = await Report.findById(reportId)
    .populate('user', 'name email class')
    .populate('test')
  if (!report) throw { statusCode: 404, message: 'Report not found' }

  const section = (sectionKey || 'all').toLowerCase()
  const safeSection = section.replace(/[^a-z0-9_-]/g, '_')

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const outDir = path.resolve(__dirname, '..', '..', 'uploads', 'pdfs')
  await fs.mkdir(outDir, { recursive: true })

  const fileName = `report_${reportId}_${safeSection}.pdf`
  const outPath = path.join(outDir, fileName)

  const html = buildReportHtml({ report, section })

  // Puppeteer works reliably for styling and page layout.
  // Note: On some hosts you may need additional Chromium deps.
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '18mm', right: '14mm', bottom: '18mm', left: '14mm' },
    })
  } finally {
    await browser.close()
  }

  const pdfUrl = `/pdfs/${fileName}`
  // Keep legacy fields updated for "all".
  if (section === 'all') {
    report.pdf_url = pdfUrl
    report.pdf_generated = true
    await report.save()
  }

  return { pdfUrl, report }
}

function buildReportHtml({ report, section }) {
  const userName = report.user?.name || 'Student'
  const userClass = report.user?.class ? String(report.user.class) : ''
  const createdAt = report.createdAt ? new Date(report.createdAt).toLocaleString() : ''

  const title = section === 'all' ? 'Career Assessment Report' : `Career Assessment Report - ${section.toUpperCase()}`

  const sections = Array.isArray(report.section_insights) ? report.section_insights : []
  const filtered = section === 'all'
    ? sections
    : sections.filter((s) => String(s.section || '').toLowerCase().includes(section))

  const sectionBlocks = filtered.length
    ? filtered.map((s) => {
        const recs = Array.isArray(s.recommendations) ? s.recommendations : []
        return `
          <div class="card">
            <h2>${escapeHtml(s.section)}</h2>
            <p><b>Score:</b> ${escapeHtml(String(s.score ?? ''))} &nbsp; <b>Percentage:</b> ${escapeHtml(String(s.percentage ?? ''))}%</p>
            <p><b>Level:</b> ${escapeHtml(String(s.strength_level ?? ''))}</p>
            <h3>Insights</h3>
            <p>${escapeHtml(String(s.insights ?? ''))}</p>
            ${recs.length ? `<h3>Recommendations</h3><ul>${recs.map((r) => `<li>${escapeHtml(String(r))}</li>`).join('')}</ul>` : ''}
          </div>
        `
      }).join('')
    : `<div class="card"><p>No section data found for "${escapeHtml(section)}".</p></div>`

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${escapeHtml(title)}</title>
      <style>
        :root { --primary: #1e3a8a; --muted: #6b7280; }
        body { font-family: Arial, Helvetica, sans-serif; color: #111827; margin: 0; padding: 0; }
        .wrap { padding: 24px; }
        .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 18px; }
        .title { font-size: 22px; font-weight: 800; color: var(--primary); margin: 0; }
        .meta { margin-top: 6px; color: var(--muted); font-size: 12px; }
        .grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; }
        h2 { margin: 0 0 8px 0; font-size: 16px; color: #111827; }
        h3 { margin: 10px 0 6px 0; font-size: 13px; color: #111827; }
        p, li { font-size: 12px; line-height: 1.5; }
        ul { margin: 6px 0 0 18px; padding: 0; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="header">
          <p class="title">${escapeHtml(title)}</p>
          <div class="meta">
            <div><b>Name:</b> ${escapeHtml(userName)}${userClass ? ` &nbsp; <b>Class:</b> ${escapeHtml(userClass)}` : ''}</div>
            ${createdAt ? `<div><b>Generated:</b> ${escapeHtml(createdAt)}</div>` : ''}
          </div>
        </div>

        <div class="card">
          <h2>Summary</h2>
          <p>${escapeHtml(String(report.summary ?? ''))}</p>
          <p><b>Dominant Profile:</b> ${escapeHtml(String(report.dominant_profile ?? ''))}</p>
          <p><b>Overall Percentage:</b> ${escapeHtml(String(report.overall_percentage ?? ''))}%</p>
        </div>

        <div class="grid">
          ${sectionBlocks}
        </div>
      </div>
    </body>
  </html>
  `
}

function escapeHtml(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}


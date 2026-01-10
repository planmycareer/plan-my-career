// Enhanced Report Service with Fusion Engine and PDF Generation

import Report from '../models/Report.js'
import Test from '../models/Test.js'
import { generateUnifiedReport } from '../utils/reportFusion.js'

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
  
  // PDF generation will be implemented with html-pdf-node
  // For now, mark as generated and return mock URL
  const pdfUrl = `/pdfs/report_${reportId}.pdf`
  report.pdf_url = pdfUrl
  report.pdf_generated = true
  await report.save()
  
  return { pdfUrl, report }
}


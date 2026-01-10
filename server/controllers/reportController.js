// Enhanced Report Controller

import { generateReportFromTest, getReportById, getUserReports, generateReportPDF } from '../services/reportService.js'

export async function generateReport(req, res, next) {
  try {
    const report = await generateReportFromTest(req.user._id)
    res.json({ 
      success: true, 
      reportId: report._id,
      message: 'Report generated successfully',
    })
  } catch (err) {
    next(err)
  }
}

export async function getReport(req, res, next) {
  try {
    const report = await getReportById(req.params.id)
    
    // Ownership check (admin can view all)
    if (req.user.role !== 'admin' && String(report.user._id) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Forbidden: You can only view your own reports' })
    }
    
    res.json({ success: true, report })
  } catch (err) {
    next(err)
  }
}

export async function getMyReports(req, res, next) {
  try {
    const reports = await getUserReports(req.user._id)
    res.json({ success: true, reports, total: reports.length })
  } catch (err) {
    next(err)
  }
}

export async function downloadPDF(req, res, next) {
  try {
    const { reportId } = req.params
    const report = await getReportById(reportId)
    
    // Ownership check
    if (req.user.role !== 'admin' && String(report.user._id) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }
    
    const { pdfUrl } = await generateReportPDF(reportId)
    
    res.json({ 
      success: true, 
      pdfUrl,
      message: 'PDF generated successfully',
    })
  } catch (err) {
    next(err)
  }
}


import express from 'express'
import { auth } from '../middleware/authMiddleware.js'
import { generateReport, getReport, getMyReports, downloadPDF, downloadSectionPDF } from '../controllers/reportController.js'

const router = express.Router()

router.post('/generate', auth, generateReport)
router.get('/my', auth, getMyReports)
router.get('/:id', auth, getReport)
router.get('/:reportId/pdf', auth, downloadPDF)
router.get('/:reportId/pdf/:section', auth, downloadSectionPDF)

export default router


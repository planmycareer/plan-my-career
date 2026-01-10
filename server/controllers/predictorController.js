// Enhanced Predictor Controller

import { predictColleges } from '../services/predictorService.js'

export async function predict(req, res, next) {
  try {
    const { exam, rank, category, state, quota, round, gender } = req.body
    
    if (!exam || !rank || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'exam, rank, and category are required fields',
      })
    }
    
    const result = await predictColleges({ 
      exam, 
      rank: Number(rank), 
      category, 
      state,
      quota: quota || 'AI',
      round: round ? Number(round) : null,
      gender: gender || null,
    })
    
    res.json({ success: true, ...result })
  } catch (err) {
    next(err)
  }
}


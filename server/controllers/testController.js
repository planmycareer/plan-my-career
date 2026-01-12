// Test Controller - Handles test submission and retrieval

import { loadAllQuestions } from '../services/dataLoader.service.js';
import { calculateScores, validateAnswers } from '../services/scoring.service.js';
import { generateCompleteReport } from '../services/reportSelector.service.js';
import Test from '../models/Test.js';

/**
 * Get all test questions
 * GET /api/test/questions
 */
export async function getQuestions(req, res, next) {
  try {
    const questions = loadAllQuestions();
    
    // Remove correct answers from response (security)
    const questionsForClient = questions.map(q => ({
      id: q.id,
      section: q.section,
      subsection: q.subsection,
      question: q.question,
      options: q.options
    }));

    res.json({
      success: true,
      data: questionsForClient,
      total: questionsForClient.length
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Submit test answers
 * POST /api/test/submit
 */
export async function submitTest(req, res, next) {
  try {
    const { answers } = req.body;
    const userId = req.user.id;

    // Validate answers
    const validation = validateAnswers(answers);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error
      });
    }

    // Calculate scores
    const scoringResults = calculateScores(answers);

    // Generate complete report
    const reportData = generateCompleteReport(scoringResults);

    // Save test result to database
    const testResult = await Test.create({
      user: userId,
      answers,
      scores: scoringResults.subsectionScores,
      bestSubsections: scoringResults.bestSubsections,
      report: reportData,
      completedAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: {
        testId: testResult._id,
        report: reportData,
        scores: scoringResults.subsectionScores,
        bestSubsections: scoringResults.bestSubsections
      },
      message: 'Test submitted successfully'
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get user's latest test report
 * GET /api/test/report
 */
export async function getLatestReport(req, res, next) {
  try {
    const userId = req.user.id;

    const testResult = await Test.findOne({ user: userId })
      .sort({ completedAt: -1 })
      .select('-answers'); // Don't send answers back

    if (!testResult) {
      return res.status(404).json({
        success: false,
        message: 'No test results found. Please complete the test first.'
      });
    }

    res.json({
      success: true,
      data: {
        testId: testResult._id,
        report: testResult.report,
        scores: testResult.scores,
        bestSubsections: testResult.bestSubsections,
        completedAt: testResult.completedAt
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get specific test result by ID
 * GET /api/test/:testId
 */
export async function getTestById(req, res, next) {
  try {
    const { testId } = req.params;
    const userId = req.user.id;

    const testResult = await Test.findOne({
      _id: testId,
      user: userId
    }).select('-answers');

    if (!testResult) {
      return res.status(404).json({
        success: false,
        message: 'Test result not found'
      });
    }

    res.json({
      success: true,
      data: {
        testId: testResult._id,
        report: testResult.report,
        scores: testResult.scores,
        bestSubsections: testResult.bestSubsections,
        completedAt: testResult.completedAt
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all test attempts for a user
 * GET /api/test/history
 */
export async function getTestHistory(req, res, next) {
  try {
    const userId = req.user.id;

    const tests = await Test.find({ user: userId })
      .sort({ completedAt: -1 })
      .select('completedAt scores bestSubsections')
      .limit(10);

    res.json({
      success: true,
      data: tests,
      total: tests.length
    });
  } catch (error) {
    next(error);
  }
}

// Legacy support for old API
export async function fetchQuestions(req, res, next) {
  return getQuestions(req, res, next);
}

export async function submit(req, res, next) {
  return submitTest(req, res, next);
}


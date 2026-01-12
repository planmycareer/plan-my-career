// Scoring Engine Service
// Calculates scores for submitted test answers

import { loadAllQuestions, getSections, getSubsections } from './dataLoader.service.js';

/**
 * Calculate scores for submitted answers
 * @param {Object} answers - Object with questionId as key and selected answer index as value
 * @returns {Object} Scoring results with subsection and section scores
 */
export function calculateScores(answers) {
  const allQuestions = loadAllQuestions();
  const sections = getSections();
  
  // Initialize score structures
  const subsectionScores = {};
  const sectionScores = {};
  const detailedScores = {};

  // Calculate scores for each question
  allQuestions.forEach(question => {
    const { id, section, subsection, correctAnswer } = question;
    const userAnswer = answers[id];

    // Initialize section and subsection if not exists
    if (!subsectionScores[section]) {
      subsectionScores[section] = {};
      detailedScores[section] = {};
    }
    
    if (!subsectionScores[section][subsection]) {
      subsectionScores[section][subsection] = {
        correct: 0,
        total: 0,
        score: 0
      };
      detailedScores[section][subsection] = [];
    }

    // For objective questions (with correctAnswer)
    if (correctAnswer !== null && correctAnswer !== undefined) {
      subsectionScores[section][subsection].total += 1;
      
      if (userAnswer === correctAnswer) {
        subsectionScores[section][subsection].correct += 1;
        subsectionScores[section][subsection].score += 1;
      }

      detailedScores[section][subsection].push({
        questionId: id,
        userAnswer,
        correctAnswer,
        isCorrect: userAnswer === correctAnswer
      });
    }
    // For subjective/interest-based questions (Likert scale)
    else {
      // Score based on answer value (0-4 for Strongly Disagree to Strongly Agree)
      const score = userAnswer !== undefined ? userAnswer : 0;
      subsectionScores[section][subsection].total += 1;
      subsectionScores[section][subsection].score += score;

      detailedScores[section][subsection].push({
        questionId: id,
        userAnswer,
        score
      });
    }
  });

  // Calculate section-level best subsections
  const bestSubsections = {};
  
  sections.forEach(section => {
    const sectionId = section.id;
    const subsections = section.subsections;
    
    let maxScore = -1;
    let bestSubsection = null;

    subsections.forEach(subsectionId => {
      if (subsectionScores[sectionId] && subsectionScores[sectionId][subsectionId]) {
        const score = subsectionScores[sectionId][subsectionId].score;
        
        if (score > maxScore) {
          maxScore = score;
          bestSubsection = subsectionId;
        }
      }
    });

    if (bestSubsection) {
      bestSubsections[sectionId] = bestSubsection;
    }

    // Store section summary
    sectionScores[sectionId] = {
      subsections: subsectionScores[sectionId] || {},
      bestSubsection,
      maxScore
    };
  });

  return {
    subsectionScores,
    sectionScores,
    bestSubsections,
    detailedScores
  };
}

/**
 * Calculate percentage score for a subsection
 * @param {Object} subsectionScore - Subsection score object
 * @returns {number} Percentage score
 */
export function calculatePercentage(subsectionScore) {
  if (!subsectionScore || subsectionScore.total === 0) {
    return 0;
  }
  return Math.round((subsectionScore.score / subsectionScore.total) * 100);
}

/**
 * Validate submitted answers
 * @param {Object} answers - Submitted answers
 * @returns {Object} Validation result
 */
export function validateAnswers(answers) {
  if (!answers || typeof answers !== 'object') {
    return {
      isValid: false,
      error: 'Answers must be an object'
    };
  }

  const allQuestions = loadAllQuestions();
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = allQuestions.length;

  if (answeredCount === 0) {
    return {
      isValid: false,
      error: 'No answers provided'
    };
  }

  // Check if all questions are answered (optional - can be removed for partial submissions)
  if (answeredCount < totalQuestions) {
    return {
      isValid: true,
      warning: `Only ${answeredCount} out of ${totalQuestions} questions answered`
    };
  }

  return {
    isValid: true,
    answeredCount,
    totalQuestions
  };
}

/**
 * Get performance level based on score
 * @param {number} percentage - Percentage score
 * @returns {string} Performance level
 */
export function getPerformanceLevel(percentage) {
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 60) return 'Good';
  if (percentage >= 40) return 'Average';
  return 'Needs Improvement';
}

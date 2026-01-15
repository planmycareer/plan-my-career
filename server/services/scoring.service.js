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


  // Special handling for Section 4 (Learning Style): count A/B/C answers
  let section4OptionCounts = { A: 0, B: 0, C: 0 };

  allQuestions.forEach(question => {
    const { id, section, subsection, correctAnswer } = question;
    const userAnswer = answers[id];

    // Section 4: Learning Style (10 Qs, 3 options)
    if (section === 'SECTION_4') {
      // Option index: 0 = A, 1 = B, 2 = C
      if (userAnswer === 0) section4OptionCounts.A++;
      else if (userAnswer === 1) section4OptionCounts.B++;
      else if (userAnswer === 2) section4OptionCounts.C++;

      // Store for completeness (not used for scoring)
      if (!subsectionScores[section]) subsectionScores[section] = {};
      if (!subsectionScores[section][subsection]) {
        subsectionScores[section][subsection] = { total: 0, score: 0 };
        detailedScores[section] = detailedScores[section] || {};
        detailedScores[section][subsection] = [];
      }
      subsectionScores[section][subsection].total += 1;
      detailedScores[section][subsection].push({ questionId: id, userAnswer });
      return;
    }

    // All other sections: original logic
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
    } else {
      // Likert scoring (A=+5, B=+4, C=+3, D=+2, E=+1)
      const score = userAnswer !== undefined ? Math.max(0, 5 - Number(userAnswer)) : 0;
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

    // Section 4: pick dominant option (A/B/C)
    if (sectionId === 'SECTION_4') {
      // Find max count
      const max = Math.max(section4OptionCounts.A, section4OptionCounts.B, section4OptionCounts.C);
      let best = null;
      if (max === 0) {
        best = null;
      } else if (
        section4OptionCounts.A === max &&
        section4OptionCounts.A !== section4OptionCounts.B &&
        section4OptionCounts.A !== section4OptionCounts.C
      ) {
        best = 'VISUAL';
      } else if (
        section4OptionCounts.B === max &&
        section4OptionCounts.B !== section4OptionCounts.A &&
        section4OptionCounts.B !== section4OptionCounts.C
      ) {
        best = 'AUDITORY';
      } else if (
        section4OptionCounts.C === max &&
        section4OptionCounts.C !== section4OptionCounts.A &&
        section4OptionCounts.C !== section4OptionCounts.B
      ) {
        best = 'PRACTICAL';
      } else {
        // Tie: show MIXED (or default to VISUAL)
        best = 'VISUAL';
      }
      bestSubsections[sectionId] = best;
      sectionScores[sectionId] = {
        subsections: subsectionScores[sectionId] || {},
        bestSubsection: best,
        maxScore: max
      };
      return;
    }

    // All other sections: compute percentage per subsection and pick the highest
    let maxPercentage = -1;
    let bestSubsection = null;
    const subsectionData = subsectionScores[sectionId] || {};
    subsections.forEach(subsectionId => {
      const data = subsectionData[subsectionId];
      if (data) {
        // For sections where 'score' was accumulated as points (Likert), treat score/total
        const total = data.total || 0;
        const score = data.score || data.correct || 0;
        const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
        // attach percentage to data for downstream use
        subsectionData[subsectionId].percentage = percentage;
        if (percentage > maxPercentage) {
          maxPercentage = percentage;
          bestSubsection = subsectionId;
        }
      } else {
        // Ensure subsection exists with zero values
        subsectionData[subsectionId] = { total: 0, score: 0, percentage: 0 };
      }
    });
    if (bestSubsection) {
      bestSubsections[sectionId] = bestSubsection;
    }
    sectionScores[sectionId] = {
      subsections: subsectionData,
      bestSubsection,
      maxPercentage
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

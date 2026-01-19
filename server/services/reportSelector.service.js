// Report Selector Service
// Maps best subsections to expert reports

import { loadSubsectionReport, getSections } from './dataLoader.service.js';
import { calculatePercentage, getPerformanceLevel } from './scoring.service.js';

/**
 * Generate complete report for all sections
 * @param {Object} scoringResults - Results from scoring engine
 * @returns {Object} Complete report with all sections
 */
export function generateCompleteReport(scoringResults) {
  const { subsectionScores, sectionScores, bestSubsections } = scoringResults;
  const sections = getSections();
  
  const sectionReports = {};
  const reportSummary = {
    totalSections: sections.length,
    completedSections: 0,
    overallStrengths: [],
    topCareerRecommendations: []
  };

  // Generate report for each section
  sections.forEach(section => {
    const sectionId = section.id;
    const bestSubsection = bestSubsections[sectionId];

    if (!bestSubsection) {
      // Section not completed or no data
      sectionReports[sectionId] = {
        sectionName: section.name,
        status: 'incomplete',
        message: 'Section not completed'
      };
      return;
    }

    try {
      // Section 4: Learning Style (VISUAL/AUDITORY/PRACTICAL)
      if (sectionId === 'SECTION_4') {
        const subsectionReport = loadSubsectionReport(sectionId, bestSubsection);
        sectionReports[sectionId] = {
          sectionId,
          sectionName: section.name,
          bestSubsection,
          report: subsectionReport
        };
        reportSummary.completedSections += 1;
        return;
      }

      // Section 7: short Likert (5 qs). Determine report by total points across subsection
      if (sectionId === 'SECTION_7') {
        const scores = subsectionScores[sectionId] || {};
        // SECTION_7 uses subsection 'GENERAL'
        const data = scores['GENERAL'] || { score: 0, total: 0 };
        // data.score contains accumulated points (Likert converted)
        const totalPoints = data.score || 0;
        const reportKey = totalPoints >= 16 && totalPoints <= 25 ? 'HIGH' : 'LOW';
        const subsectionReport = loadSubsectionReport(sectionId, reportKey);
        sectionReports[sectionId] = {
          sectionId,
          sectionName: section.name,
          bestSubsection: reportKey,
          score: data.score,
          totalQuestions: data.total,
          percentage: calculatePercentage(data),
          report: subsectionReport
        };
        reportSummary.completedSections += 1;
        return;
      }

      // All other sections: original logic
      const subsectionReport = loadSubsectionReport(sectionId, bestSubsection);
      const scores = subsectionScores[sectionId] || {};
      const bestSubsectionScore = scores[bestSubsection] || { score: 0, total: 1 };
      const percentage = calculatePercentage(bestSubsectionScore);
      const performanceLevel = getPerformanceLevel(percentage);

      sectionReports[sectionId] = {
        sectionId,
        sectionName: section.name,
        bestSubsection,
        score: bestSubsectionScore.score,
        totalQuestions: bestSubsectionScore.total,
        percentage,
        performanceLevel,
        subsectionScores: scores,
        report: subsectionReport
      };

      reportSummary.completedSections += 1;
      if (Array.isArray(subsectionReport.strengths)) {
        reportSummary.overallStrengths.push(...subsectionReport.strengths.slice(0, 2));
      }
      if (Array.isArray(subsectionReport.careerPaths)) {
        reportSummary.topCareerRecommendations.push(
          ...subsectionReport.careerPaths.slice(0, 2).map(career => ({
            ...career,
            source: section.name
          }))
        );
      }
    } catch (error) {
      console.error(`Error loading report for ${sectionId}:`, error.message);
      sectionReports[sectionId] = {
        sectionId,
        sectionName: section.name,
        status: 'error',
        message: 'Report not available',
        error: error.message
      };
    }
  });

  // Deduplicate and limit recommendations
  reportSummary.overallStrengths = [...new Set(reportSummary.overallStrengths)].slice(0, 10);
  reportSummary.topCareerRecommendations = reportSummary.topCareerRecommendations.slice(0, 10);

  return {
    reportSummary,
    sectionReports,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Generate report for a specific section
 * @param {string} sectionId - Section ID
 * @param {Object} scoringResults - Scoring results
 * @returns {Object} Section report
 */
export function generateSectionReport(sectionId, scoringResults) {
  const { subsectionScores, bestSubsections } = scoringResults;
  // Special handling for SECTION_7
  if (sectionId === 'SECTION_7') {
    const scores = subsectionScores[sectionId] || {};
    const data = scores['GENERAL'] || { score: 0, total: 0 };
    const totalPoints = data.score || 0;
    const reportKey = totalPoints >= 16 && totalPoints <= 25 ? 'HIGH' : 'LOW';
    const subsectionReport = loadSubsectionReport(sectionId, reportKey);
    return {
      sectionId,
      bestSubsection: reportKey,
      score: data.score,
      totalQuestions: data.total,
      percentage: calculatePercentage(data),
      subsectionScores: scores,
      report: subsectionReport
    };
  }

  const bestSubsection = bestSubsections[sectionId];

  if (!bestSubsection) {
    throw new Error(`No best subsection found for section: ${sectionId}`);
  }

  const subsectionReport = loadSubsectionReport(sectionId, bestSubsection);
  const scores = subsectionScores[sectionId] || {};
  const bestSubsectionScore = scores[bestSubsection] || { score: 0, total: 1 };
  const percentage = calculatePercentage(bestSubsectionScore);
  const performanceLevel = getPerformanceLevel(percentage);

  return {
    sectionId,
    bestSubsection,
    score: bestSubsectionScore.score,
    totalQuestions: bestSubsectionScore.total,
    percentage,
    performanceLevel,
    subsectionScores: scores,
    report: subsectionReport
  };
}

/**
 * Get career recommendations from multiple sections
 * @param {Object} allSectionReports - All section reports
 * @returns {Array} Prioritized career recommendations
 */
export function getCareerRecommendations(allSectionReports) {
  const careerMap = new Map();

  Object.values(allSectionReports).forEach(sectionReport => {
    if (sectionReport.report && sectionReport.report.careerPaths) {
      sectionReport.report.careerPaths.forEach(career => {
        if (!careerMap.has(career.title)) {
          careerMap.set(career.title, {
            ...career,
            mentionedInSections: [sectionReport.sectionName],
            score: sectionReport.percentage
          });
        } else {
          const existing = careerMap.get(career.title);
          existing.mentionedInSections.push(sectionReport.sectionName);
          existing.score += sectionReport.percentage;
        }
      });
    }
  });

  // Sort by number of mentions and total score
  return Array.from(careerMap.values())
    .sort((a, b) => {
      const aScore = a.mentionedInSections.length * 1000 + a.score;
      const bScore = b.mentionedInSections.length * 1000 + b.score;
      return bScore - aScore;
    })
    .slice(0, 10);
}

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
      // Load the report for the best subsection
      const subsectionReport = loadSubsectionReport(sectionId, bestSubsection);
      
      // Get subsection scores
      const scores = subsectionScores[sectionId] || {};
      const bestSubsectionScore = scores[bestSubsection] || { score: 0, total: 1 };
      const percentage = calculatePercentage(bestSubsectionScore);
      const performanceLevel = getPerformanceLevel(percentage);

      // Build section report
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
      
      // Collect overall strengths
      if (subsectionReport.strengths) {
        reportSummary.overallStrengths.push(...subsectionReport.strengths.slice(0, 2));
      }

      // Collect career recommendations
      if (subsectionReport.careerPaths) {
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

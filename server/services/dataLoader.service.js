// Data Loader Service
// Loads all question and report data from JS files

import { sections } from '../data/sections.js';
import { section1Questions } from '../data/section1/questions.js';
import { section2Questions } from '../data/section2/questions.js';
import { section3Questions } from '../data/section3/questions.js';
import { section4Questions } from '../data/section4/questions.js';
import { section5Questions } from '../data/section5/questions.js';
import { section6Questions } from '../data/section6/questions.js';
import { section7Questions } from '../data/section7/questions.js';
import { section1Reports } from '../data/section1/reports.js';
import { reports as section2Reports } from '../data/section2/reports.js';
import { section3Reports } from '../data/section3/reports.js';
import { section4Reports } from '../data/section4/reports.js';
import { section5Reports } from '../data/section5/reports.js';
import { section6Reports } from '../data/section6/reports.js';
import { section7Reports } from '../data/section7/reports.js';

// Cache for loaded data
let questionsCache = null;
let reportsCache = null;

/**
 * Load all questions from all sections
 * @returns {Array} All questions with section and subsection info
 */
export function loadAllQuestions() {
  if (questionsCache) {
    return questionsCache;
  }

  // Combine all question sections
  // TODO: Add more sections as they are created
  const allQuestions = [
    ...section1Questions,
    ...section2Questions,
    ...section3Questions,
  ...section4Questions,
  ...section5Questions,
  ...section6Questions,
  ...section7Questions,
    // ...section5Questions,
    // ...section6Questions,
    // ...section7Questions,
  ];

  questionsCache = allQuestions;
  return allQuestions;
}

/**
 * Load questions for a specific section
 * @param {string} sectionId - Section ID (e.g., 'SECTION_1')
 * @returns {Array} Questions for that section
 */
export function loadSectionQuestions(sectionId) {
  const allQuestions = loadAllQuestions();
  return allQuestions.filter(q => q.section === sectionId);
}

/**
 * Load questions for a specific subsection
 * @param {string} sectionId - Section ID
 * @param {string} subsectionId - Subsection ID
 * @returns {Array} Questions for that subsection
 */
export function loadSubsectionQuestions(sectionId, subsectionId) {
  const allQuestions = loadAllQuestions();
  return allQuestions.filter(q => q.section === sectionId && q.subsection === subsectionId);
}

/**
 * Load all reports from all sections
 * @returns {Object} Reports indexed by section
 */
export function loadAllReports() {
  if (reportsCache) {
    return reportsCache;
  }

  // Combine all report sections
  // TODO: Add more sections as they are created (sections 4-7)
  const allReports = {
    SECTION_1: section1Reports,
    SECTION_2: section2Reports,
    SECTION_3: section3Reports,
  SECTION_4: section4Reports,
  SECTION_5: section5Reports,
  SECTION_6: section6Reports,
  SECTION_7: section7Reports,
    // SECTION_5: section5Reports,
    // SECTION_6: section6Reports,
    // SECTION_7: section7Reports,
  };

  reportsCache = allReports;
  return allReports;
}

/**
 * Load report for a specific section and subsection
 * @param {string} sectionId - Section ID
 * @param {string} subsectionId - Subsection ID
 * @returns {Object} Report object
 */
export function loadSubsectionReport(sectionId, subsectionId) {
  const allReports = loadAllReports();
  const sectionReports = allReports[sectionId];
  
  if (!sectionReports) {
    throw new Error(`No reports found for section: ${sectionId}`);
  }

  const report = sectionReports[subsectionId];
  
  if (!report) {
    throw new Error(`No report found for subsection: ${subsectionId} in section: ${sectionId}`);
  }

  return report;
}

/**
 * Get section configuration
 * @returns {Array} Section configuration
 */
export function getSections() {
  return sections;
}

/**
 * Get subsections for a specific section
 * @param {string} sectionId - Section ID
 * @returns {Array} Subsection names
 */
export function getSubsections(sectionId) {
  const section = sections.find(s => s.id === sectionId);
  return section ? section.subsections : [];
}

/**
 * Clear cache (useful for testing or reloading data)
 */
export function clearCache() {
  questionsCache = null;
  reportsCache = null;
}

/**
 * Get question by ID
 * @param {string} questionId - Question ID
 * @returns {Object} Question object
 */
export function getQuestionById(questionId) {
  const allQuestions = loadAllQuestions();
  return allQuestions.find(q => q.id === questionId);
}

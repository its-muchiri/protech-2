/**
 * Google Indexing API Module
 * 
 * This module handles submitting URLs to Google Indexing API for faster crawling.
 * 
 * Setup Required:
 * 1. Create a Google Cloud Project
 * 2. Enable "Indexing API" in Google Cloud Console
 * 2. Create a Service Account with "Owner" or "Editor" role
 * 3. Download the JSON key file
 * 4. Add the service account email as an Owner in Google Search Console
 * 5. Set GOOGLE_INDEXING_KEY_PATH environment variable to the path of the JSON key file
 * 
 * Usage:
 *   const { submitUrl, submitUrlUpdated, submitUrlDeleted } = require('./lib/indexing-api');
 *   await submitUrlUpdated('https://www.pro-tech.co.ke/blog/my-post');
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const INDEXING_API_SCOPES = ['https://www.googleapis.com/auth/indexing'];
const INDEXING_API_VERSION = 'v3';
const LOG_FILE = path.join(process.cwd(), 'logs', 'indexing-api.log');

// Ensure log directory exists
const logDir = path.dirname(LOG_FILE);
if (!require('fs').existsSync(logDir)) {
  require('fs').mkdirSync(logDir, { recursive: true });
}

/**
 * Load and authorize the Google Indexing API client
 */
async function getIndexingClient() {
  const keyPath = process.env.GOOGLE_INDEXING_KEY_PATH;
  
  if (!keyPath) {
    throw new Error('GOOGLE_INDEXING_KEY_PATH environment variable not set. Please set it to the path of your Google Service Account JSON key file.');
  }
  
  const fullKeyPath = path.isAbsolute(keyPath) ? keyPath : path.join(process.cwd(), keyPath);
  
  if (!require('fs').existsSync(fullKeyPath)) {
    throw new Error(`Google service account key file not found at: ${fullKeyPath}`);
  }
  
  const auth = new google.auth.GoogleAuth({
    keyFile: fullKeyPath,
    scopes: INDEXING_API_SCOPES,
  });
  
  const authClient = await auth.getClient();
  return google.indexing({
    version: INDEXING_API_VERSION,
    auth: authClient,
  });
}

/**
 * Log indexing activity to file
 */
function logActivity(entry) {
  const logEntry = `${new Date().toISOString()} | ${JSON.stringify(entry)}\n`;
  fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
}

/**
 * Submit a URL to Google Indexing API
 * @param {string} url - Full URL to submit (e.g., https://www.pro-tech.co.ke/blog/my-post)
 * @param {string} type - 'URL_UPDATED' or 'URL_DELETED'
 * @returns {Promise<Object>} API response
 */
async function submitUrl(url, type = 'URL_UPDATED') {
  try {
    const client = await getIndexingClient();
    
    const response = await client.urlNotifications.publish({
      requestBody: {
        url,
        type,
      },
    });
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      url,
      type,
      status: 'success',
      response: response.data,
    };
    
    logActivity(logEntry);
    return { success: true, data: response.data };
  } catch (error) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      url,
      type,
      status: 'error',
      error: error.message,
      code: error.code,
      response: error.response?.data,
    };
    
    logActivity(logEntry);
    return { success: false, error: error.message, code: error.code };
  }
}

/**
 * Submit URL_UPDATED (for new or updated pages)
 */
async function submitUrlUpdated(url) {
  return submitUrl(url, 'URL_UPDATED');
}

/**
 * Submit URL_DELETED (for removed pages)
 */
async function submitUrlDeleted(url) {
  return submitUrl(url, 'URL_DELETED');
}

/**
 * Submit multiple URLs with rate limiting
 * @param {Array<string>} urls - Array of URLs to submit
 * @param {string} type - 'URL_UPDATED' or 'URL_DELETED'
 * @param {number} delayMs - Delay between requests in ms (default 200ms for ~300/min)
 * @returns {Promise<Array>} Array of results
 */
async function submitUrlsBatch(urls, type = 'URL_UPDATED', delayMs = 200) {
  const results = [];
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const result = await submitUrl(urls[i], type);
    results.push({ url, ...result });
    
    // Rate limiting - Google Indexing API default quota is 200/day
    // 200ms delay = ~300 requests/minute max, but we'll be limited by daily quota
    if (i < urls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  return results;
}

/**
 * Read the indexing log file
 */
function getLog() {
  const logPath = LOG_FILE;
  if (!fs.existsSync(logPath)) {
    return [];
  }
  
  const content = fs.readFileSync(LOG_PATH, 'utf8');
  return content.trim().split('\n').filter(Boolean).map(line => {
    try {
      return JSON.parse(line);
    } catch {
      return { raw: line };
    }
  });
}

module.exports = {
  submitUrl,
  submitUrlUpdated,
  submitUrlDeleted,
  submitUrlsBatch,
  getLog,
  INDEXING_API_SCOPES,
  LOG_FILE,
};
#!/usr/bin/env node
/**
 * Post-Build Script: Submit New/Updated Blog Posts to Google Indexing API
 * 
 * This script runs after the Next.js build completes and:
 * 1. Detects new/updated blog posts by comparing with previous build manifest
 * 2. Submits new/updated URLs to Google Indexing API
 * 3. Logs all submissions for auditing
 * 
 * Usage: node scripts/submit-to-indexing-api.js
 * 
 * Environment Variables Required:
 * - GOOGLE_INDEXING_KEY_PATH: Path to Google Service Account JSON key file
 * - SITE_URL: Base URL of the site (default: https://www.pro-tech.co.ke)
 */

const fs = require('fs');
const path = require('path');
const { submitUrlUpdated, submitUrlsBatch, getLog } = require('../lib/indexing-api');

const SITE_URL = process.env.SITE_URL || 'https://www.pro-tech.co.ke';
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const MANIFEST_PATH = path.join(process.cwd(), '.vercel', 'output', 'static', 'blog-manifest.json');
const PREVIOUS_MANIFEST_PATH = path.join(process.cwd(), '.last-deploy-manifest.json');

const POST_BUILD_MANIFEST_PATH = path.join(process.cwd(), '.last-deploy-manifest.json');

/**
 * Get all blog post slugs from the content directory
 */
function getCurrentBlogSlugs() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(blogDir)) return [];
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  return files.map(f => {
    const slug = f.replace('.md', '');
    const filePath = path.join(BLOG_DIR, file);
    const stats = fs.statSync(filePath);
    return {
      slug,
      url: `https://www.pro-tech.co.ke/blog/${slug}`,
      modifiedTime: stats.mtimeMs,
      file,
    };
  });
}

/**
 * Load previous deploy manifest
 */
function loadPreviousManifest() {
  if (fs.existsSync(PREVIOUS_MANIFEST_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(PREVIOUS_MANIFEST_PATH, 'utf8'));
    } catch {
      return {};
    }
  }
  return {};
}

/**
 * Save current manifest for next deploy comparison
 */
function saveManifest(manifest) {
  fs.writeFileSync(PREVIOUS_MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

/**
 * Get new/updated URLs by comparing with previous manifest
 */
function getChangedUrls(currentSlugs, previousManifest) {
  const newUrls = [];
  const updatedUrls = [];
  
  for (const post of currentSlugs) {
    const previous = previousManifest[post.slug];
    
    if (!previous) {
      // New post
      newUrls.push(post.url);
    } else if (post.modifiedTime > previous.modifiedTime) {
      // Updated post
      updatedUrls.push(post.url);
    }
  }
  
  return { newUrls, updatedUrls };
}

/**
 * Main function to submit changed URLs to Indexing API
 */
async function submitChangedPosts() {
  console.log('🔍 Checking for new/updated blog posts...');
  
  // Check if required env vars are set
  const keyPathEnv = process.env.GOOGLE_INDEXING_KEY_PATH;
  if (!keyPathEnv) {
    console.log('⚠️  GOOGLE_INDEXING_KEY_PATH not set. Skipping Indexing API submission.');
    console.log('   Set GOOGLE_INDEXING_KEY_PATH environment variable to enable auto-indexing.');
    return { skipped: true, reason: 'GOOGLE_INDEXING_KEY_PATH not set' };
  }
  
  // Check if key file exists
  const keyPath = path.isAbsolute(keyPathEnv) 
    ? keyPathEnv 
    : path.join(process.cwd(), keyPathEnv);
    
  if (!fs.existsSync(keyPath)) {
    console.log(`⚠️  Service account key not found at: ${keyPath}`);
    console.log('   Skipping Indexing API submission.');
    return { skipped: true, reason: 'Service account key not found' };
  }
  
  // Get current blog posts
  const currentSlugs = getCurrentBlogSlugs();
  console.log(`📚 Found ${currentSlugs.length} blog posts`);
  
  // Load previous manifest
  const previousManifest = loadPreviousManifest();
  const previousCount = Object.keys(previousManifest).length;
  
  if (previousCount === 0) {
    console.log('📝 First deploy detected - no previous manifest found');
    console.log('   All posts will be treated as new...');
  }
  
  // Get changed URLs
  const { newUrls, updatedUrls } = getChangedUrls(
    currentSlugs,
    previousManifest
  );
  
  console.log(`🆕 New posts: ${newUrls.length}`);
  console.log(`🔄 Updated posts: ${updatedUrls.length}`);
  
  if (newUrls.length === 0 && updatedUrls.length === 0) {
    console.log('✅ No new or updated posts to submit');
    return { submitted: 0, new: 0, updated: 0 };
  }
  
  // Combine all URLs to submit
  const urlsToSubmit = [...newUrls, ...updatedUrls];
  
  // Check quota - default is 200/day
  const totalToSubmit = urlsToSubmit.length;
  if (totalToSubmit > 190) {
    console.log(`⚠️  Warning: ${totalToSubmit} URLs to submit exceeds recommended daily quota (200/day)`);
    console.log('   Consider batching: only submitting first 190 URLs');
    urlsToSubmit.splice(190);
  }
  
  // Submit new URLs
  let results = { new: 0, updated: 0, failed: 0 };
  
  if (newUrls.length > 0) {
    console.log(`\n📤 Submitting ${newUrls.length} new URLs...`);
    const newResults = await submitUrlsBatch(newUrls, 'URL_UPDATED', 300);
    results.new = newResults.filter(r => r.success).length;
    results.failed += newResults.filter(r => !r.success).length;
  }
  
  // Submit updated URLs
  if (updatedUrls.length > 0) {
    console.log(`\n📤 Submitting ${updatedUrls.length} updated URLs...`);
    const updatedResults = await submitUrlsBatch(updatedUrls, 'URL_UPDATED', 300);
    results.updated = updatedResults.filter(r => r.success).length;
    results.failed += updatedResults.filter(r => !r.success).length;
  }
  
  // Save new manifest
  const currentSlugsForManifest = getCurrentBlogSlugs();
  for (const post of currentSlugsForManifest) {
    previousManifest[post.slug] = { modifiedTime: post.modifiedTime };
  }
  saveManifest(previousManifest);
  
  console.log('\n✅ Indexing API submission complete!');
  console.log(`   ✅ New URLs submitted: ${results.new}`);
  console.log(`   🔄 Updated URLs submitted: ${results.updated}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  
  return results;
}

// Run if called directly
if (require.main === module) {
  submitChangedPosts()
    .then(results => {
      console.log('\n✅ Indexing submission complete');
      process.exit(results.failed > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('❌ Indexing submission failed:', error);
      process.exit(1);
    });
}

module.exports = { submitChangedPosts };
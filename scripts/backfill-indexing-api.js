#!/usr/bin/env node
/**
 * Backfill Script: Submit ALL Existing Blog Posts to Google Indexing API
 * 
 * This script submits ALL existing blog posts to the Indexing API.
 * Run this ONCE after setting up the Indexing API to get historical posts indexed.
 * 
 * Usage: node scripts/backfill-indexing-api.js [--batch-size=180] [--delay=300]
 * 
 * Options:
 *   --batch-size=N    Number of URLs to submit per day (default: 180, max 200)
 *   --delay=MS        Delay between requests in ms (default: 300)
 *   --dry-run         Show what would be submitted without actually submitting
 *   --resume          Resume from where it left off (uses checkpoint file)
 * 
 * Environment Variables Required:
 * - GOOGLE_INDEXING_KEY_PATH: Path to Google Service Account JSON key file
 * - SITE_URL: Base URL of the site (default: https://www.pro-tech.co.ke)
 */

const fs = require('fs');
const path = require('path');
const { submitUrlsBatch } = require('../lib/indexing-api');

async function main() {
  const args = process.argv.slice(2);
  const options = {
    batchSize: 180,
    delay: 300,
    dryRun: false,
    resume: false,
  };
  
  // Parse arguments
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--batch-size=')) {
      options.batchSize = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--delay=')) {
      options.delay = parseInt(arg.split('=')[1], 10);
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--resume') {
      options.resume = true;
    }
  }
  
  // Validate batch size
  if (options.batchSize > 200) {
    console.log('⚠️  Batch size limited to 200 (Google daily quota). Setting to 200.');
    options.batchSize = 200;
  }
  
  // Check required env vars
  const keyPath = process.env.GOOGLE_INDEXING_KEY_PATH;
  if (!keyPath) {
    console.error('❌ Error: GOOGLE_INDEXING_KEY_PATH environment variable not set');
    console.log('   Set it to the path of your Google Service Account JSON key file');
    process.exit(1);
  }
  
  const keyPathEnv = process.env.GOOGLE_INDEXING_KEY_PATH;
  const keyPath = path.isAbsolute(keyPathEnv) 
    ? keyPathEnv 
    : path.join(process.cwd(), keyPathEnv);
    
  if (!require('fs').existsSync(keyPath)) {
    console.error(`❌ Service account key not found at: ${keyPath}`);
    process.exit(1);
  }
  
  // Load all blog posts
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  console.log(`📚 Total blog files found: ${files.length}`);
  
  const posts = [];
  for (const file of fs.readdirSync(path.join(process.cwd(), 'content', 'blog')).filter(f => f.endsWith('.md'))) {
    const content = fs.readFileSync(path.join(__dirname, '..', 'content', 'blog', file), 'utf8');
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (frontmatterMatch) {
      const fm = frontmatterMatch[1];
      const slugMatch = fm.match(/slug:\s*["']?([^"'\n]+)["']?/);
      const finalSlug = slugMatch ? slugMatch[1].trim() : file.replace('.md', '');
      
      posts.push({
        slug: finalSlug,
        url: `https://www.pro-tech.co.ke/blog/${finalSlug}`,
      });
    }
  }
  
  console.log(`📚 Total blog posts found: ${posts.length}`);
  
  // Check for checkpoint if resuming
  let startIndex = 0;
  const checkpointPath = path.join(__dirname, '..', '.indexing-backfill-checkpoint.json');
  
  if (options.resume && fs.existsSync(checkpointPath)) {
    try {
      const checkpoint = JSON.parse(fs.readFileSync(checkpointPath, 'utf8'));
      startIndex = checkpoint.lastIndex + 1;
      console.log(`📍 Resuming from index ${startIndex} (${checkpoint.processed} URLs processed)`);
    } catch (e) {
      console.log('⚠️  Could not read checkpoint, starting from beginning');
    }
  }
  
  // Calculate batches
  const allUrls = posts.map(p => `https://www.pro-tech.co.ke/blog/${p.slug}`);
  const totalUrls = allUrls.length;
  const startBatch = Math.floor(startIndex / 200);
  
  console.log(`\n📊 Backfill Summary:`);
  console.log(`   Total URLs to submit: ${totalUrls}`);
  console.log(`   Batch size per day: ${options.batchSize}`);
  console.log(`   Delay between requests: ${options.delay}ms`);
  console.log(`   Starting from index: ${startIndex}`);
  console.log(`   Dry run: ${options.dryRun ? 'YES' : 'NO'}`);
  console.log('');
  
  if (options.dryRun) {
    console.log('\n🔍 DRY RUN - No actual submissions will be made');
    console.log(`Would submit ${totalUrls} URLs in ${Math.ceil(totalUrls / 200)} days`);
    return;
  }
  
  // Process in batches
  let processed = 0;
  let totalSuccess = 0;
  let totalFailed = 0;
  
  for (let i = startIndex; i < totalUrls; i += 200) {
    const batch = allUrls.slice(i, Math.min(i + 200, totalUrls.length));
    const batchNumber = Math.floor(i / 200) + 1;
    const totalBatches = Math.ceil(totalUrls / 200);
    
    console.log(`\n📦 Batch ${batchNumber}/${Math.ceil(totalUrls / 200)} (${batch.length} URLs)`);
    
    if (options.dryRun) {
      console.log(`   [DRY RUN] Would submit ${batch.length} URLs`);
      continue;
    }
    
    try {
      const results = await submitUrlsBatch(batch, 'URL_UPDATED', 300);
      const success = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      console.log(`   ✅ Success: ${success} | ❌ Failed: ${failed}`);
      
      totalSuccess += success;
      totalFailed += failed;
      
      // Save checkpoint
      const checkpoint = {
        lastIndex: i + batch.length - 1,
        processed: i + batch.length,
        totalSuccess,
        totalFailed,
        timestamp: new Date().toISOString(),
      };
      fs.writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2));
      
      // Delay between batches to avoid hitting rate limits
      if (i + 200 < totalUrls) {
        console.log(`   ⏳ Waiting 60 seconds before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    } catch (error) {
      console.error(`❌ Batch failed:`, error.message);
      totalFailed += batch.length;
    }
  }
  
  console.log('\n✅ Backfill complete!');
  console.log(`   ✅ Total successful: ${totalSuccess}`);
  console.log(`   ❌ Total failed: ${totalFailed}`);
  
  // Clean up checkpoint on success
  if (fs.existsSync(checkpointPath)) {
    fs.unlinkSync(checkpointPath);
  }
}

// Load dependencies
const fs = require('fs');
const path = require('path');
const { submitUrlsBatch } = require('../lib/indexing-api');

if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✅ Backfill complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Backfill failed:', error);
      process.exit(1);
    });
}

module.exports = {};
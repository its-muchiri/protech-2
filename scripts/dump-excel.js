// Dump all Excel files into structured JSON for analysis
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'blog articles');
const outDir = path.join(__dirname, '..', 'data', 'excel-dump');
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.xlsx'));

let globalSummary = {};

for (const file of files) {
  const filePath = path.join(sourceDir, file);
  const wb = XLSX.readFile(filePath);
  const fileData = { file, sheets: {} };

  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    fileData.sheets[sheetName] = rows;
  }

  const baseName = path.basename(file, '.xlsx').replace(/[^a-z0-9]/gi, '_');
  fs.writeFileSync(path.join(outDir, `${baseName}.json`), JSON.stringify(fileData, null, 2));
  globalSummary[file] = {
    sheets: Object.keys(fileData.sheets),
    totalRows: Object.values(fileData.sheets).reduce((acc, rows) => acc + rows.length, 0),
  };
}

fs.writeFileSync(path.join(outDir, '_summary.json'), JSON.stringify(globalSummary, null, 2));
console.log('Done. Summary:');
console.log(JSON.stringify(globalSummary, null, 2));

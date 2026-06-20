import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const pdfjsPath = path.resolve(
  '.codex-tools/pdf-review/node_modules/pdfjs-dist/legacy/build/pdf.mjs',
);
const pdfjs = await import(pathToFileURL(pdfjsPath).href);

const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error('Usage: node extract_pdf_text.mjs <pdf-path>');
  process.exit(1);
}

const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjs.getDocument({
  data,
  disableWorker: true,
  useSystemFonts: true,
}).promise;

console.log(`PAGES\t${doc.numPages}`);

function itemY(item) {
  return Math.round(item.transform[5] * 10) / 10;
}

function itemX(item) {
  return Math.round(item.transform[4] * 10) / 10;
}

for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
  const page = await doc.getPage(pageNum);
  const text = await page.getTextContent({ includeMarkedContent: false });
  const rows = new Map();

  for (const item of text.items) {
    if (!item.str || !item.str.trim()) continue;
    const y = itemY(item);
    if (!rows.has(y)) rows.set(y, []);
    rows.get(y).push({
      x: itemX(item),
      str: item.str.replace(/\s+/g, ' ').trim(),
    });
  }

  const lines = [...rows.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([, items]) =>
      items
        .sort((a, b) => a.x - b.x)
        .map((item) => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter(Boolean);

  console.log(`\n===== PAGE ${pageNum} =====`);
  for (const line of lines) {
    console.log(line);
  }
}

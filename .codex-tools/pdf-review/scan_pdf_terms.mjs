import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const pdfjsPath = path.resolve(
  '.codex-tools/pdf-review/node_modules/pdfjs-dist/legacy/build/pdf.mjs',
);
const pdfjs = await import(pathToFileURL(pdfjsPath).href);

const [pdfPath, termsArg] = process.argv.slice(2);
if (!pdfPath || !termsArg) {
  console.error('Usage: node scan_pdf_terms.mjs <pdf-path> <term1,term2,...>');
  process.exit(1);
}

const terms = termsArg.split(',').map((term) => term.trim()).filter(Boolean);
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjs.getDocument({
  data,
  disableWorker: true,
  useSystemFonts: true,
}).promise;

for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
  const page = await doc.getPage(pageNum);
  const text = await page.getTextContent({ includeMarkedContent: false });
  const pageText = text.items.map((item) => item.str ?? '').join(' ');
  const hits = terms.filter((term) => pageText.includes(term));
  if (hits.length) {
    console.log(`PAGE ${pageNum}: ${hits.join(', ')}`);
  }
}

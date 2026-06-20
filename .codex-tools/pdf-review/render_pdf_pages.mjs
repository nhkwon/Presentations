import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  createCanvas,
  DOMMatrix,
  ImageData,
  Path2D,
} from '@napi-rs/canvas';

globalThis.DOMMatrix = DOMMatrix;
globalThis.ImageData = ImageData;
globalThis.Path2D = Path2D;

const pdfjsPath = path.resolve(
  '.codex-tools/pdf-review/node_modules/pdfjs-dist/legacy/build/pdf.mjs',
);
const pdfjs = await import(pathToFileURL(pdfjsPath).href);

const [pdfPath, outDir = '.codex-tools/pdf-review/pages', pagesArg = 'all'] =
  process.argv.slice(2);

if (!pdfPath) {
  console.error('Usage: node render_pdf_pages.mjs <pdf-path> [out-dir] [pages]');
  console.error('Example pages: all, 1,3,16-18');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjs.getDocument({
  data,
  disableWorker: true,
  useSystemFonts: true,
}).promise;

function expandPages(arg) {
  if (arg === 'all') {
    return Array.from({ length: doc.numPages }, (_, i) => i + 1);
  }
  const pages = new Set();
  for (const part of arg.split(',')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const [start, end] = trimmed.split('-').map((value) => Number(value));
    if (Number.isFinite(start) && Number.isFinite(end)) {
      for (let p = start; p <= end; p += 1) pages.add(p);
    } else if (Number.isFinite(start)) {
      pages.add(start);
    }
  }
  return [...pages].filter((p) => p >= 1 && p <= doc.numPages).sort((a, b) => a - b);
}

for (const pageNum of expandPages(pagesArg)) {
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext('2d');
  await page.render({ canvasContext: context, viewport }).promise;
  const outPath = path.join(outDir, `page-${String(pageNum).padStart(2, '0')}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(outPath);
}

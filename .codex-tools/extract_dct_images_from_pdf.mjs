import fs from 'node:fs';
import path from 'node:path';

const [inputPdf, outDir] = process.argv.slice(2);

if (!inputPdf || !outDir) {
  throw new Error('Usage: node extract_dct_images_from_pdf.mjs <inputPdf> <outDir>');
}

fs.mkdirSync(outDir, { recursive: true });
for (const file of fs.readdirSync(outDir)) {
  if (/^img_\d+_\d+x\d+\.jpg$/i.test(file)) {
    fs.unlinkSync(path.join(outDir, file));
  }
}

const data = fs.readFileSync(inputPdf);
const text = data.toString('latin1');
const objectRe = /(\d+)\s+(\d+)\s+obj\b/g;
const records = [];
let match;

function readNumber(dict, key) {
  const re = new RegExp(`/${key}\\s+(\\d+)`);
  const m = dict.match(re);
  return m ? Number(m[1]) : 0;
}

while ((match = objectRe.exec(text))) {
  const objStart = match.index;
  const objNo = Number(match[1]);
  const streamMarker = text.indexOf('stream', objectRe.lastIndex);
  const endObj = text.indexOf('endobj', objectRe.lastIndex);
  if (streamMarker === -1 || endObj === -1 || streamMarker > endObj) continue;

  const dict = text.slice(objStart, streamMarker);
  if (!/\/Subtype\s*\/Image/.test(dict) || !/\/DCTDecode/.test(dict)) continue;

  let streamStart = streamMarker + 'stream'.length;
  if (text[streamStart] === '\r' && text[streamStart + 1] === '\n') streamStart += 2;
  else if (text[streamStart] === '\n') streamStart += 1;
  else if (text[streamStart] === '\r') streamStart += 1;

  let streamEnd = text.indexOf('endstream', streamStart);
  if (streamEnd === -1 || streamEnd > endObj) continue;
  if (text[streamEnd - 2] === '\r' && text[streamEnd - 1] === '\n') streamEnd -= 2;
  else if (text[streamEnd - 1] === '\n' || text[streamEnd - 1] === '\r') streamEnd -= 1;

  const width = readNumber(dict, 'Width');
  const height = readNumber(dict, 'Height');
  const bytes = data.subarray(streamStart, streamEnd);
  if (bytes.length < 1024 || bytes[0] !== 0xff || bytes[1] !== 0xd8) continue;

  const name = `img_${String(objNo).padStart(4, '0')}_${width}x${height}.jpg`;
  fs.writeFileSync(path.join(outDir, name), bytes);
  records.push({ name, objNo, width, height, bytes: bytes.length });
}

records.sort((a, b) => (b.width * b.height) - (a.width * a.height));
fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify(records, null, 2),
  'utf8'
);

console.log(`Extracted ${records.length} JPEG images to ${outDir}`);
console.log(records.slice(0, 20).map((r) => `${r.name} ${r.width}x${r.height} ${r.bytes}`).join('\n'));

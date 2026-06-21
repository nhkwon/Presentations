import fs from 'node:fs';
import path from 'node:path';

const [pagesDir, outputPdf] = process.argv.slice(2);

if (!pagesDir || !outputPdf) {
  throw new Error('Usage: node jpg_pages_to_pdf.mjs <pagesDir> <outputPdf>');
}

const files = fs.readdirSync(pagesDir)
  .filter((name) => /\.jpe?g$/i.test(name))
  .sort((a, b) => a.localeCompare(b))
  .map((name) => path.join(pagesDir, name));

if (files.length === 0) {
  throw new Error(`No JPEG pages found in ${pagesDir}`);
}

function getJpegSize(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (
      marker === 0xc0 || marker === 0xc1 || marker === 0xc2 ||
      marker === 0xc3 || marker === 0xc5 || marker === 0xc6 ||
      marker === 0xc7 || marker === 0xc9 || marker === 0xca ||
      marker === 0xcb || marker === 0xcd || marker === 0xce ||
      marker === 0xcf
    ) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  throw new Error('Could not read JPEG size');
}

const pageWidth = 595.28;
const pageHeight = 841.89;
const objects = new Map();
const kids = [];

objects.set(1, Buffer.from('<< /Type /Catalog /Pages 2 0 R >>', 'ascii'));

files.forEach((file, index) => {
  const imgData = fs.readFileSync(file);
  const { width, height } = getJpegSize(imgData);
  const imageObj = 3 + index * 3;
  const contentObj = imageObj + 1;
  const pageObj = imageObj + 2;
  kids.push(`${pageObj} 0 R`);

  const imgHeader = Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgData.length} >>\nstream\n`, 'ascii');
  const imgFooter = Buffer.from('\nendstream', 'ascii');
  objects.set(imageObj, Buffer.concat([imgHeader, imgData, imgFooter]));

  const content = `q\n${pageWidth.toFixed(2)} 0 0 ${pageHeight.toFixed(2)} 0 0 cm\n/Im1 Do\nQ`;
  objects.set(contentObj, Buffer.from(`<< /Length ${Buffer.byteLength(content, 'ascii')} >>\nstream\n${content}\nendstream`, 'ascii'));

  objects.set(pageObj, Buffer.from(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /XObject << /Im1 ${imageObj} 0 R >> >> /Contents ${contentObj} 0 R >>`, 'ascii'));
});

objects.set(2, Buffer.from(`<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${kids.length} >>`, 'ascii'));

const parts = [Buffer.from('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n', 'binary')];
const offsets = [0];

for (const id of Array.from(objects.keys()).sort((a, b) => a - b)) {
  offsets[id] = Buffer.concat(parts).length;
  parts.push(Buffer.from(`${id} 0 obj\n`, 'ascii'));
  parts.push(objects.get(id));
  parts.push(Buffer.from('\nendobj\n', 'ascii'));
}

const xrefOffset = Buffer.concat(parts).length;
const maxId = Math.max(...objects.keys());
const xref = [`xref`, `0 ${maxId + 1}`, `0000000000 65535 f `];
for (let id = 1; id <= maxId; id += 1) {
  xref.push(`${String(offsets[id] ?? 0).padStart(10, '0')} 00000 n `);
}
xref.push('trailer');
xref.push(`<< /Size ${maxId + 1} /Root 1 0 R >>`);
xref.push('startxref');
xref.push(String(xrefOffset));
xref.push('%%EOF');
parts.push(Buffer.from(`${xref.join('\n')}\n`, 'ascii'));

fs.writeFileSync(outputPdf, Buffer.concat(parts));
console.log(`Wrote ${outputPdf} with ${files.length} pages`);

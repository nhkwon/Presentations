import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const inputMd = path.join(root, '서울과기대_스마트시티_10p_정리_UTF8.md');
const imageDir = path.join(root, '.codex-tools', 'smart_pdf_images');
const outDir = path.join(root, '.codex-tools', 'seoultech_smartcity_visual_pptx');

const visuals = [
  { file: 'img_0006_2199x1648.jpg', caption: 'Smart city infrastructure and digital data layer' },
  { file: 'img_0229_866x540.jpg', caption: 'Construction data, analytics, and AI platform concept' },
  { file: 'img_0135_933x547.jpg', caption: 'Smart construction technology fields' },
  { file: 'img_0653_1339x495.jpg', caption: 'BIM and digital twin-based infrastructure modeling' },
  { file: 'img_0993_1024x676.jpg', caption: 'Automated equipment and compaction quality management' },
  { file: 'img_0677_932x1028.jpg', caption: 'BIM-based prefabrication and modular infrastructure' },
  { file: 'img_1003_1319x702.jpg', caption: 'Robotics and remote/autonomous construction equipment' },
  { file: 'img_0357_1183x757.jpg', caption: 'AI and IoT-based safety management' },
  { file: 'img_0120_902x637.jpg', caption: 'Technology gap, limitation, and improvement direction' },
  { file: 'img_0506_881x612.jpg', caption: 'BIM-centered construction management integration' },
];

function escapeXml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  }[c]));
}

function parseSlides(markdown) {
  const slides = [];
  const headingRe = /^### 추가 (\d+)\. (.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRe.exec(markdown))) {
    headings.push({
      no: Number(match[1]),
      title: match[2].trim(),
      start: match.index,
      bodyStart: headingRe.lastIndex,
    });
  }
  for (let h = 0; h < headings.length; h += 1) {
    const heading = headings[h];
    const nextStart = headings[h + 1]?.start ?? markdown.indexOf('\n## 기존 내용', heading.bodyStart);
    const bodyEnd = nextStart === -1 ? markdown.length : nextStart;
    const body = markdown.slice(heading.bodyStart, bodyEnd);
    const core = body.match(/\*\*핵심 문장:\*\*\s*(.+)/)?.[1]?.trim() ?? '';
    const footer = body.match(/\*\*하단 강조문:\*\*\s*(.+)/)?.[1]?.trim() ?? '';
    const note = body.match(/\*\*발표 멘트:\*\*\s*(.+)/)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
    const cards = [];
    const cardRe = /^\*\*(?!핵심 문장:|하단 강조문:|발표 멘트:)(.+?)\*\*\r?\n((?:- .+(?:\r?\n|$))+)/gm;
    let cardMatch;
    while ((cardMatch = cardRe.exec(body))) {
      const bullets = cardMatch[2]
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith('- '))
        .map((line) => line.slice(2).trim());
      cards.push({ title: cardMatch[1].trim(), bullets });
    }
    slides.push({
      no: heading.no,
      title: heading.title,
      core,
      cards: cards.slice(0, 3),
      footer,
      note,
    });
  }
  if (slides.length !== 10) {
    throw new Error(`Expected 10 slides, parsed ${slides.length}`);
  }
  return slides;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

const EMU = 914400;
function emu(inch) {
  return Math.round(inch * EMU);
}

function getJpegSize(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    if (marker === 0xd9 || marker === 0xda) break;
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

function pptParagraph(text, opts = {}) {
  const size = opts.size ?? 1500;
  const color = opts.color ?? '172033';
  const bold = opts.bold ? ' b="1"' : '';
  return `<a:p><a:pPr marL="0"><a:defRPr sz="${size}"/></a:pPr><a:r><a:rPr lang="ko-KR" sz="${size}"${bold}><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:rPr><a:t>${escapeXml(text)}</a:t></a:r><a:endParaRPr lang="ko-KR"/></a:p>`;
}

function pptShape(id, name, x, y, w, h, paragraphs, fill = 'FFFFFF', line = 'D5DDE7') {
  return `<p:sp>
    <p:nvSpPr><p:cNvPr id="${id}" name="${escapeXml(name)}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
    <p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="${fill}"/></a:solidFill><a:ln w="9525"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln></p:spPr>
    <p:txBody><a:bodyPr wrap="square" lIns="73152" tIns="45720" rIns="73152" bIns="45720"/><a:lstStyle/>${paragraphs.join('')}</p:txBody>
  </p:sp>`;
}

function pptImage(id, relId, x, y, w, h, name) {
  return `<p:pic>
    <p:nvPicPr><p:cNvPr id="${id}" name="${escapeXml(name)}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
    <p:blipFill><a:blip r:embed="${relId}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
    <p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:ln w="9525"><a:solidFill><a:srgbClr val="B8C7D8"/></a:solidFill></a:ln></p:spPr>
  </p:pic>`;
}

function makeNotesXml(slide, index) {
  const noteText = slide.note || `${slide.title} 발표 멘트`;
  const paragraphs = [
    pptParagraph(`추가 ${index + 1}. ${slide.title}`, { size: 1500, bold: true, color: '123C69' }),
    pptParagraph(noteText, { size: 1200, color: '172033' }),
  ];
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      <p:sp>
        <p:nvSpPr><p:cNvPr id="2" name="Notes Placeholder"/><p:cNvSpPr txBox="1"/><p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="685800" y="548640"/><a:ext cx="5486400" cy="7315200"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr>
        <p:txBody><a:bodyPr wrap="square"/><a:lstStyle/>${paragraphs.join('')}</p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:notes>`;
}

function makeNotesMasterXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notesMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:notesStyle>
    <a:lvl1pPr algn="l"><a:defRPr sz="1200"><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:defRPr></a:lvl1pPr>
  </p:notesStyle>
</p:notesMaster>`;
}

function imageFit(visual, frameX, frameY, frameW, frameH) {
  const imageAspect = visual.width / visual.height;
  const frameAspect = frameW / frameH;
  let w;
  let h;
  if (imageAspect > frameAspect) {
    w = frameW;
    h = frameW / imageAspect;
  } else {
    h = frameH;
    w = frameH * imageAspect;
  }
  return {
    x: frameX + (frameW - w) / 2,
    y: frameY + (frameH - h) / 2,
    w,
    h,
  };
}

function makeSlideXml(slide, index, visual) {
  let id = 2;
  const shapes = [];

  const frame = { x: 7.08, y: 2.05, w: 5.45, h: 3.72 };
  shapes.push(pptShape(id++, 'image-frame', frame.x, frame.y, frame.w, frame.h, [], 'F7FAFD', 'D5DDE7'));
  const fitted = imageFit(visual, frame.x + 0.1, frame.y + 0.1, frame.w - 0.2, frame.h - 0.2);
  shapes.push(pptImage(id++, 'rId2', fitted.x, fitted.y, fitted.w, fitted.h, visual.file));
  shapes.push(pptShape(id++, 'caption', 7.08, 5.86, 5.45, 0.28, [pptParagraph(`${visual.caption} | 스마트건설관리공학_최종.pdf`, { size: 760, color: '607289' })], 'FFFFFF', 'FFFFFF'));

  shapes.push(pptShape(id++, 'section', 0.55, 0.24, 1.15, 0.34, [pptParagraph(`추가 ${index + 1}`, { size: 1120, bold: true, color: 'FFFFFF' })], '1D70B8', '1D70B8'));
  shapes.push(pptShape(id++, 'title', 0.55, 0.62, 12.2, 0.52, [pptParagraph(slide.title, { size: 2550, bold: true, color: '123C69' })], 'FFFFFF', 'FFFFFF'));
  shapes.push(pptShape(id++, 'core', 0.65, 1.22, 12.0, 0.62, [pptParagraph(slide.core, { size: 1320, bold: true, color: '123C69' })], 'EDF5FB', 'B8D7EE'));

  const cardX = 0.65;
  const cardY = 2.06;
  const cardW = 6.0;
  const cardH = 1.18;
  slide.cards.forEach((card, cardIndex) => {
    const paragraphs = [pptParagraph(card.title, { size: 1320, bold: true, color: '0F426E' })];
    for (const bullet of card.bullets.slice(0, 4)) {
      paragraphs.push(pptParagraph(`• ${bullet}`, { size: 950, color: '172033' }));
    }
    shapes.push(pptShape(id++, `card${cardIndex + 1}`, cardX, cardY + cardIndex * 1.28, cardW, cardH, paragraphs, 'FFFFFF', 'D5DDE7'));
  });

  shapes.push(pptShape(id++, 'footer', 0.65, 6.25, 12.0, 0.54, [pptParagraph(slide.footer, { size: 1180, bold: true, color: '0F426E' })], 'F7FAFD', 'D5DDE7'));
  shapes.push(pptShape(id++, 'brand', 9.0, 7.07, 3.6, 0.22, [pptParagraph('Smart City Construction Management', { size: 820, color: '607289' })], 'FFFFFF', 'FFFFFF'));

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree>
    <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
    <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    ${shapes.join('\n')}
  </p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
}

function writePptxFolder(slides) {
  fs.rmSync(outDir, { recursive: true, force: true });
  const dirs = [
    '',
    '_rels',
    'docProps',
    'ppt',
    'ppt/_rels',
    'ppt/media',
    'ppt/notesSlides',
    'ppt/notesSlides/_rels',
    'ppt/notesMasters',
    'ppt/notesMasters/_rels',
    'ppt/slides',
    'ppt/slides/_rels',
    'ppt/slideLayouts',
    'ppt/slideLayouts/_rels',
    'ppt/slideMasters',
    'ppt/slideMasters/_rels',
    'ppt/theme',
  ];
  dirs.forEach((d) => ensureDir(path.join(outDir, d)));

  const visualMeta = visuals.map((visual, i) => {
    const src = path.join(imageDir, visual.file);
    const buffer = fs.readFileSync(src);
    const size = getJpegSize(buffer);
    const mediaName = `image${i + 1}.jpg`;
    fs.copyFileSync(src, path.join(outDir, 'ppt', 'media', mediaName));
    return { ...visual, ...size, mediaName };
  });

  const overrideSlides = slides.map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join('');
  const overrideNotes = slides.map((_, i) => `<Override PartName="/ppt/notesSlides/notesSlide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/>`).join('');
  fs.writeFileSync(path.join(outDir, '[Content_Types].xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="jpg" ContentType="image/jpeg"/>
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/notesMasters/notesMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${overrideSlides}
  ${overrideNotes}
</Types>`, 'utf8');

  fs.writeFileSync(path.join(outDir, '_rels/.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`, 'utf8');

  fs.writeFileSync(path.join(outDir, 'docProps/app.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex OpenXML Visual Draft</Application><PresentationFormat>On-screen Show (16:9)</PresentationFormat><Slides>${slides.length}</Slides><Company></Company>
</Properties>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'docProps/core.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>서울과기대 스마트시티 10p PPT 초안 이미지 포함</dc:title><dc:creator>Codex</dc:creator><cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-06-21T00:00:00Z</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">2026-06-21T00:00:00Z</dcterms:modified>
</cp:coreProperties>`, 'utf8');

  const slideIds = slides.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`).join('');
  fs.writeFileSync(path.join(outDir, 'ppt/presentation.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:notesMasterIdLst><p:notesMasterId r:id="rId${slides.length + 2}"/></p:notesMasterIdLst>
  <p:sldIdLst>${slideIds}</p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000" type="wide"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>`, 'utf8');

  const presRels = [`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>`];
  slides.forEach((_, i) => presRels.push(`<Relationship Id="rId${i + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`));
  presRels.push(`<Relationship Id="rId${slides.length + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="notesMasters/notesMaster1.xml"/>`);
  fs.writeFileSync(path.join(outDir, 'ppt/_rels/presentation.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${presRels.join('')}</Relationships>`, 'utf8');

  slides.forEach((slide, i) => {
    fs.writeFileSync(path.join(outDir, `ppt/slides/slide${i + 1}.xml`), makeSlideXml(slide, i, visualMeta[i]), 'utf8');
    fs.writeFileSync(path.join(outDir, `ppt/slides/_rels/slide${i + 1}.xml.rels`), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${visualMeta[i].mediaName}"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide" Target="../notesSlides/notesSlide${i + 1}.xml"/></Relationships>`, 'utf8');
    fs.writeFileSync(path.join(outDir, `ppt/notesSlides/notesSlide${i + 1}.xml`), makeNotesXml(slide, i), 'utf8');
    fs.writeFileSync(path.join(outDir, `ppt/notesSlides/_rels/notesSlide${i + 1}.xml.rels`), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="../slides/slide${i + 1}.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="../notesMasters/notesMaster1.xml"/></Relationships>`, 'utf8');
  });

  fs.writeFileSync(path.join(outDir, 'ppt/notesMasters/notesMaster1.xml'), makeNotesMasterXml(), 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/notesMasters/_rels/notesMaster1.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`, 'utf8');

  fs.writeFileSync(path.join(outDir, 'ppt/slideLayouts/slideLayout1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/slideLayouts/_rels/slideLayout1.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>`, 'utf8');

  fs.writeFileSync(path.join(outDir, 'ppt/slideMasters/slideMaster1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
  <p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles>
</p:sldMaster>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/slideMasters/_rels/slideMaster1.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/theme/theme1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="SmartCityVisual">
  <a:themeElements>
    <a:clrScheme name="SmartCityVisual"><a:dk1><a:srgbClr val="172033"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="123C69"/></a:dk2><a:lt2><a:srgbClr val="EDF5FB"/></a:lt2><a:accent1><a:srgbClr val="1D70B8"/></a:accent1><a:accent2><a:srgbClr val="0F426E"/></a:accent2><a:accent3><a:srgbClr val="5BA4D9"/></a:accent3><a:accent4><a:srgbClr val="7A90A8"/></a:accent4><a:accent5><a:srgbClr val="6CA97A"/></a:accent5><a:accent6><a:srgbClr val="D69A2D"/></a:accent6><a:hlink><a:srgbClr val="1D70B8"/></a:hlink><a:folHlink><a:srgbClr val="0F426E"/></a:folHlink></a:clrScheme>
    <a:fontScheme name="SmartCityFonts"><a:majorFont><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:majorFont><a:minorFont><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:minorFont></a:fontScheme>
    <a:fmtScheme name="SmartCityFmt"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme>
  </a:themeElements>
</a:theme>`, 'utf8');
}

const slides = parseSlides(fs.readFileSync(inputMd, 'utf8'));
writePptxFolder(slides);
console.log(`wrote ${outDir}`);

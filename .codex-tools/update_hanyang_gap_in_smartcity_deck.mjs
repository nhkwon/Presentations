import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, '.codex-tools', 'inspect_existing_14p');
const workDir = path.join(root, '.codex-tools', 'update_hanyang_gap_15p_work');
const sourceNotesPath = path.join(root, '.codex-tools', 'update_hanyang_gap_source_notes.txt');

const EMU = 914400;
const theme = {
  navy: '122A4C',
  blue: '1D70B8',
  sky: 'EDF5FB',
  teal: '1F8B87',
  green: '4E9357',
  gray: '607289',
  lightLine: 'D5DDE7',
  text: '172033',
  amber: 'D69A2D',
  red: 'C84747',
};

function emu(inch) {
  return Math.round(inch * EMU);
}

function xmlEscape(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  }[char]));
}

function read(relPath) {
  return fs.readFileSync(path.join(workDir, relPath), 'utf8');
}

function write(relPath, text) {
  fs.writeFileSync(path.join(workDir, relPath), text, 'utf8');
}

function replaceText(xml, oldText, newText) {
  const next = xml.split(xmlEscape(oldText)).join(xmlEscape(newText));
  if (next === xml) {
    throw new Error(`Text not found for replacement: ${oldText}`);
  }
  return next;
}

function pptParagraph(text, opts = {}) {
  const size = opts.size ?? 1100;
  const color = opts.color ?? theme.text;
  const bold = opts.bold ? ' b="1"' : '';
  return `<a:p><a:pPr marL="0"><a:defRPr sz="${size}"/></a:pPr><a:r><a:rPr lang="ko-KR" sz="${size}"${bold}><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:rPr><a:t>${xmlEscape(text)}</a:t></a:r><a:endParaRPr lang="ko-KR"/></a:p>`;
}

function pptShape(id, name, x, y, w, h, paragraphs, fill = 'FFFFFF', line = 'D5DDE7', geometry = 'rect') {
  return `<p:sp>
    <p:nvSpPr><p:cNvPr id="${id}" name="${xmlEscape(name)}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
    <p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm><a:prstGeom prst="${geometry}"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="${fill}"/></a:solidFill><a:ln w="9525"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln></p:spPr>
    <p:txBody><a:bodyPr wrap="square" lIns="73152" tIns="45720" rIns="73152" bIns="45720"><a:normAutofit fontScale="88000" lnSpcReduction="8000"/></a:bodyPr><a:lstStyle/>${paragraphs.join('')}</p:txBody>
  </p:sp>`;
}

function headerShapes(slideNumber, title) {
  let id = 2;
  const shapes = [];
  shapes.push(pptShape(id++, 'section-label', 0.55, 0.18, 3.4, 0.28, [
    pptParagraph('Smart City Construction Management', { size: 760, color: theme.gray, bold: true }),
  ], 'FFFFFF', 'FFFFFF'));
  shapes.push(pptShape(id++, 'deck-label', 9.05, 0.18, 3.65, 0.28, [
    pptParagraph('2026.1학기 서울과학기술대학교 발표자료', { size: 760, color: theme.gray }),
  ], 'FFFFFF', 'FFFFFF'));
  shapes.push(pptShape(id++, 'title', 0.55, 0.58, 10.95, 0.56, [
    pptParagraph(title, { size: 2200, color: theme.navy, bold: true }),
  ], 'FFFFFF', 'FFFFFF'));
  shapes.push(pptShape(id++, 'slide-number', 12.3, 0.62, 0.32, 0.28, [
    pptParagraph(String(slideNumber), { size: 800, color: theme.gray }),
  ], 'FFFFFF', 'FFFFFF'));
  return { shapes, nextId: id };
}

function makeKpiCard(id, x, y, w, h, label, value, detail, color) {
  return pptShape(id, `kpi-${label}`, x, y, w, h, [
    pptParagraph(label, { size: 820, color: theme.gray, bold: true }),
    pptParagraph(value, { size: 2050, color, bold: true }),
    pptParagraph(detail, { size: 760, color: theme.text }),
  ], 'FFFFFF', theme.lightLine, 'roundRect');
}

function makeTableRow(idRef, y, cells, fills = []) {
  const widths = [2.25, 1.35, 1.35, 1.35, 5.25];
  const xs = [0.82, 3.07, 4.42, 5.77, 7.12];
  const shapes = [];
  cells.forEach((cell, index) => {
    shapes.push(pptShape(
      idRef.value++,
      `gap-row-${y}-${index}`,
      xs[index],
      y,
      widths[index],
      0.42,
      [pptParagraph(cell, {
        size: index === 4 ? 720 : 780,
        color: index === 0 ? theme.navy : theme.text,
        bold: index === 0 || y < 3.45,
      })],
      fills[index] ?? 'FFFFFF',
      theme.lightLine,
    ));
  });
  return shapes;
}

function makeGapSlideXml() {
  const { shapes, nextId } = headerShapes(6, '국내 스마트시티 기술 Gap과 건설관리 과제');
  let id = nextId;
  shapes.push(pptShape(id++, 'core-message', 0.65, 1.2, 12.0, 0.62, [
    pptParagraph('국내 스마트시티는 발전단계와 기술성숙도에서 글로벌 대비 gap이 존재하며, 건설관리는 이를 도시 인프라 데이터·KPI·운영 환류 체계로 줄여야 한다.', { size: 1160, color: theme.navy, bold: true }),
  ], theme.sky, 'B8D7EE', 'roundRect'));

  shapes.push(makeKpiCard(id++, 0.65, 2.0, 2.88, 1.05, '발전단계', '3~4단계', '반복·관리 수준, AI·데이터 최적화 전 단계', theme.blue));
  shapes.push(makeKpiCard(id++, 3.77, 2.0, 2.88, 1.05, '평균 TRL', '7.1 vs 5.3', '글로벌 평균 대비 국내 평균', theme.red));
  shapes.push(makeKpiCard(id++, 6.89, 2.0, 2.88, 1.05, '성숙도', '74.6%', '국내 TRL / 글로벌 TRL', theme.amber));
  shapes.push(makeKpiCard(id++, 10.01, 2.0, 2.64, 1.05, 'AI 역량', '78.1%', '미국 대비 국내 AI 기술수준(2017)', theme.teal));

  const idRef = { value: id };
  shapes.push(...makeTableRow(idRef, 3.35, ['도메인', '글로벌', '국내', 'Gap', '건설관리 연결 과제'], ['F2F6FA', 'F2F6FA', 'F2F6FA', 'F2F6FA', 'F2F6FA']));
  shapes.push(...makeTableRow(idRef, 3.83, ['Building & Infra', '7.7', '6.2', '-1.5', 'BEMS·센서·시설물 유지관리 데이터를 BIM/DT와 연결']));
  shapes.push(...makeTableRow(idRef, 4.31, ['Digital Twin', '7.0', '4.7', '-2.3', 'As-built BIM, GIS, IoT를 도시 자산관리 모델로 통합']));
  shapes.push(...makeTableRow(idRef, 4.79, ['Government', '7.4', '4.9', '-2.5', '재난·안전·민원·공공서비스 KPI를 현장 데이터와 연동']));
  shapes.push(...makeTableRow(idRef, 5.27, ['Energy / People', '7.3 / 7.0', '4.8 / 4.8', '-2.5 / -2.2', '탄소·에너지·시민참여 리빙랩을 공사·운영 데이터와 연결']));
  id = idRef.value;

  shapes.push(pptShape(id++, 'bottom-message', 0.65, 6.12, 12.0, 0.52, [
    pptParagraph('Project Data → Facility Data → Urban Asset Data → Smart City KPI Feedback', { size: 1060, color: theme.navy, bold: true }),
  ], 'F7FAFD', theme.lightLine, 'roundRect'));
  shapes.push(pptShape(id++, 'source', 0.65, 6.72, 12.0, 0.28, [
    pptParagraph('Source: 한양대학교 스마트시티 거버넌스 14주차 교안(2024.06.07), 국내·외 스마트시티 기술 Gap 분석', { size: 650, color: theme.gray }),
  ], 'FFFFFF', 'FFFFFF'));

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>${shapes.join('\n')}</p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
}

function makeNotesXml(title, note) {
  const paragraphs = [
    pptParagraph(title, { size: 1500, color: theme.navy, bold: true }),
    pptParagraph(note, { size: 1200, color: theme.text }),
  ];
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    <p:sp><p:nvSpPr><p:cNvPr id="2" name="Notes Placeholder"/><p:cNvSpPr txBox="1"/><p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="685800" y="548640"/><a:ext cx="5486400" cy="7315200"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr wrap="square"/><a:lstStyle/>${paragraphs.join('')}</p:txBody></p:sp>
  </p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:notes>`;
}

fs.rmSync(workDir, { recursive: true, force: true });
fs.cpSync(sourceDir, workDir, { recursive: true });

// Update existing slide copy.
let slide2 = read('ppt/slides/slide2.xml');
slide2 = replaceText(slide2, '스마트시티의 개념에서 출발해 기술체계, 개별 기술, 한계와 발전방향, 본인 연구와의 연결 순서로 전개한다.', '스마트시티와 건설관리의 관계에서 출발해 국내 기술 Gap, 개별 기술, 운영모델, 본인 연구 확장 순서로 전개한다.');
slide2 = replaceText(slide2, '05   기술 한계와 개선·발전방향 및 본인 연구 확장', '05   국내 Gap 해소를 위한 운영모델 및 본인 연구 확장');
write('ppt/slides/slide2.xml', slide2);

let slide5 = read('ppt/slides/slide5.xml');
slide5 = replaceText(slide5, '국내 스마트건설관리 현황과 필요성', '국내 스마트시티·건설관리 Gap과 전환 필요성');
slide5 = replaceText(slide5, '국내 건설산업은 생산성·디지털화·인프라 경쟁력 측면의 개선 필요성이 크며, 스마트시티 구현을 위해 데이터 기반 건설관리로 전환해야 한다.', '국내 건설산업의 생산성 격차와 스마트시티 기술성숙도 격차는 건설단계 데이터가 도시 운영으로 이어지지 못하는 구조적 문제와 연결된다.');
slide5 = replaceText(slide5, '경쟁력 격차', '스마트시티 Gap');
slide5 = replaceText(slide5, '• 국내 건설기업 글로벌 종합 경쟁력 7위', '• 국내 스마트시티 발전단계: 3~4단계');
slide5 = replaceText(slide5, '• 건설 인프라 경쟁력은 11위로 상대적 저조', '• 평균 TRL: 글로벌 7.1 vs 국내 5.3(74.6%)');
slide5 = replaceText(slide5, '• 고령화·숙련공 부족으로 자동화 수요 증가', '• 건설 데이터의 표준화·연계·검증 역량 필요');
slide5 = replaceText(slide5, '• 시공 데이터를 도시 운영 데이터로 연결 필요', '• 프로젝트 CM을 도시 인프라 운영관리로 확장');
slide5 = replaceText(slide5, '스마트시티 건설관리는 선택적 기술 도입이 아니라, 생산성·안전성·운영 효율성을 높이기 위한 필수 전환 방향이다.', '스마트시티 건설관리는 생산성 문제와 기술성숙도 gap을 동시에 줄이는 데이터 기반 전환 전략이다.');
write('ppt/slides/slide5.xml', slide5);

let slide12 = read('ppt/slides/slide12.xml');
slide12 = replaceText(slide12, '스마트건설관리 기술의 한계와 개선·발전방향', '스마트건설관리 기술 Gap과 개선·발전방향');
slide12 = replaceText(slide12, '기술 도입의 다음 단계는 현장 적용성과 데이터 연계성을 갖춘 통합 스마트건설관리 체계 구축이다.', '핵심 과제는 개별 기술 확보보다 실증-확산, 표준 데이터, KPI 평가를 연결하는 통합 관리체계 구축이다.');
slide12 = replaceText(slide12, 'From Technology Adoption to Integrated Smart Construction Management', 'From Technology Adoption to KPI-based Smart City Construction Management');
write('ppt/slides/slide12.xml', slide12);

let slide13 = read('ppt/slides/slide13.xml');
slide13 = replaceText(slide13, '스마트시티 건설관리 운영 모델', '스마트시티 건설관리 운영·거버넌스 모델');
slide13 = replaceText(slide13, '현장 데이터는 프로젝트 관리, 시설물 관리, 도시 운영 의사결정으로 이어지는 폐쇄루프형 관리체계로 연결되어야 한다.', '현장 데이터는 CPS 기반 실시간 모니터링과 KPI 평가를 거쳐 정책·실증·확산 의사결정으로 환류되어야 한다.');
slide13 = replaceText(slide13, '드론·LiDAR·센서·장비 데이터', '현장·시설·도시센서 데이터');
slide13 = replaceText(slide13, '예측·최적화·위험분석', 'TRL·KPI·위험예측');
slide13 = replaceText(slide13, '자산관리·안전·탄소·회복탄력성', '실증·확산·예산·유지관리');
slide13 = replaceText(slide13, '수집 → 모델링 → 예측 → 대응 → 운영 데이터 환류', '수집 → 모델링 → 예측·KPI → 대응 → 정책·운영 데이터 환류');
write('ppt/slides/slide13.xml', slide13);

let slide14 = read('ppt/slides/slide14.xml');
slide14 = replaceText(slide14, '기존 BIM·AI·안전관리 연구를 스마트시티 건설관리의 데이터 기반 의사결정 체계로 확장할 수 있다.', '기존 연구는 국내 스마트시티 기술 Gap을 줄이는 AI·BIM·Digital Twin 기반 건설관리 연구로 확장할 수 있다.');
slide14 = replaceText(slide14, '• 스마트시티 인프라 Digital Twin 기반', '• Digital Twin·TRL gap을 줄이는 기반 데이터');
slide14 = replaceText(slide14, '• 작업자 및 시민 안전관리로 확장', '• 작업자·시민 안전과 실시간 사고 대응');
slide14 = replaceText(slide14, '• 도시 인프라 생애주기 자산관리로 확장', '• 도시 인프라 점검·보수 데이터 표준화');
slide14 = replaceText(slide14, 'AI·BIM·Digital Twin 기반 스마트건설관리 연구를 통해 스마트시티의 안전성, 지속가능성, 운영 효율성을 높인다.', 'AI·BIM·Digital Twin 기반 연구를 통해 국내 스마트시티의 기술성숙도 gap과 건설관리 생산성 gap을 함께 줄인다.');
write('ppt/slides/slide14.xml', slide14);

// Insert the new slide after original slide 5 in presentation order.
write('ppt/slides/slide15.xml', makeGapSlideXml());
write('ppt/slides/_rels/slide15.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide" Target="../notesSlides/notesSlide15.xml"/></Relationships>');
write('ppt/notesSlides/notesSlide15.xml', makeNotesXml(
  '6. 국내 스마트시티 기술 Gap과 건설관리 과제',
  '14주차 교안의 국내·외 스마트시티 기술 Gap 분석을 건설관리 관점으로 연결한 장표입니다. 국내 스마트시티 추진 수준은 발전단계 3~4단계에 머물러 있고, 도메인별 평균 TRL은 글로벌 7.1 대비 국내 5.3, 즉 74.6% 수준으로 제시됩니다. 특히 Digital Twin, Government, Energy, People 영역의 gap은 건설단계에서 생성되는 BIM, 센서, 유지관리, 안전, 탄소 데이터를 도시 운영 KPI로 연결하지 못하는 문제와 맞닿아 있습니다. 따라서 건설관리는 Project Data를 Facility Data와 Urban Asset Data로 확장하고, 이를 스마트시티 KPI 평가와 운영 환류로 연결하는 역할을 해야 합니다.',
));
write('ppt/notesSlides/_rels/notesSlide15.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="../slides/slide15.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="../notesMasters/notesMaster1.xml"/></Relationships>');

let contentTypes = read('[Content_Types].xml');
contentTypes = contentTypes.replace('</Types>', '<Override PartName="/ppt/slides/slide15.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/><Override PartName="/ppt/notesSlides/notesSlide15.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/></Types>');
write('[Content_Types].xml', contentTypes);

let rels = read('ppt/_rels/presentation.xml.rels');
rels = rels.replace('</Relationships>', '<Relationship Id="rId17" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide15.xml"/></Relationships>');
write('ppt/_rels/presentation.xml.rels', rels);

let presentation = read('ppt/presentation.xml');
presentation = presentation.replace('<p:sldId id="260" r:id="rId6"/>', '<p:sldId id="260" r:id="rId6"/><p:sldId id="270" r:id="rId17"/>');
write('ppt/presentation.xml', presentation);

let app = read('docProps/app.xml');
app = app.replace('<Slides>14</Slides>', '<Slides>15</Slides>');
write('docProps/app.xml', app);

// Renumber visible page markers and note headings for slides after the inserted slide.
for (let slideNo = 6; slideNo <= 14; slideNo += 1) {
  const newNo = slideNo + 1;
  const slideRel = `ppt/slides/slide${slideNo}.xml`;
  let slideXml = read(slideRel);
  slideXml = slideXml.replace(`<a:t>${slideNo}</a:t>`, `<a:t>${newNo}</a:t>`);
  write(slideRel, slideXml);

  const notesRel = `ppt/notesSlides/notesSlide${slideNo}.xml`;
  let notesXml = read(notesRel);
  notesXml = notesXml.replace(`<a:t>${slideNo}. `, `<a:t>${newNo}. `);
  write(notesRel, notesXml);
}

let notes5 = read('ppt/notesSlides/notesSlide5.xml');
notes5 = replaceText(notes5, '5. 국내 스마트건설관리 현황과 필요성', '5. 국내 스마트시티·건설관리 Gap과 전환 필요성');
notes5 = replaceText(notes5, '스마트건설관리공학 자료에서는 국내 건설산업이 디지털화와 생산성 측면에서 개선 필요성이 크다고 설명합니다. 특히 국내 건설업 노동생산성은 선진국 대비 약 50% 수준으로 제시되고, 글로벌 선도 수준의 시간당 부가가치가 35.6달러인 반면 국내는 18.7달러 수준으로 제시됩니다. 또한 국내 건설기업의 종합 경쟁력은 7위이지만 건설 인프라 경쟁력은 11위로 상대적으로 낮습니다. 따라서 스마트시티 구현을 위해서는 건설단계부터 데이터를 생성하고 운영 데이터로 연결하는 관리체계가 필요합니다.', '스마트건설관리공학 자료의 생산성·경쟁력 수치와 14주차 교안의 스마트시티 기술성숙도 gap을 한 문장으로 연결했습니다. 국내 건설업 노동생산성은 선진국 대비 약 50% 수준이고, 시간당 부가가치는 글로벌 35.6달러 대비 국내 18.7달러로 제시됩니다. 여기에 국내 스마트시티 발전 수준은 3~4단계, 평균 TRL은 글로벌 7.1 대비 국내 5.3으로 제시됩니다. 따라서 문제는 단순한 기술 도입이 아니라 건설단계 데이터가 도시 운영과 KPI 평가로 연결되지 못하는 구조이며, 건설관리가 이를 연결하는 역할을 해야 합니다.');
write('ppt/notesSlides/notesSlide5.xml', notes5);

let notes12 = read('ppt/notesSlides/notesSlide12.xml');
notes12 = replaceText(notes12, '스마트건설관리 기술의 한계와 개선·발전방향', '스마트건설관리 기술 Gap과 개선·발전방향');
notes12 = replaceText(notes12, '스마트건설 기술의 한계는 기술 자체가 없다는 것보다 기술들이 현장에서 서로 연결되지 못한다는 점입니다. 따라서 BIM, Digital Twin, AI, 센서, 장비 데이터를 하나의 통합 플랫폼으로 연결하고, 데이터 수집-분석-예측-대응 프로세스를 정립해야 합니다.', '스마트건설 기술의 한계는 기술 자체가 없다는 것보다 현장 적용성과 확산 구조가 약하다는 점입니다. 14주차 교안의 gap 분석처럼 국가시범도시, 혁신성장동력, 챌린지 과제에서도 도메인별 미보유 기술과 확산 단절이 남아 있습니다. 따라서 BIM, Digital Twin, AI, 센서, 장비 데이터를 통합하고, 실증-확산-KPI 평가가 반복되는 스마트건설관리 체계가 필요합니다.');
write('ppt/notesSlides/notesSlide12.xml', notes12);

let notes13 = read('ppt/notesSlides/notesSlide13.xml');
notes13 = replaceText(notes13, '스마트시티 건설관리 운영 모델', '스마트시티 건설관리 운영·거버넌스 모델');
notes13 = replaceText(notes13, '스마트시티 건설관리는 단방향 정보관리보다 폐쇄루프형 운영 모델이 중요합니다. 현장 데이터가 BIM과 Digital Map으로 정리되고, AI 분석을 통해 예측과 최적화가 이루어지며, 그 결과가 도시 운영과 유지관리 의사결정으로 환류되어야 합니다.', '스마트시티 건설관리는 단방향 정보관리보다 CPS 기반 폐쇄루프형 운영모델이 중요합니다. 현장 데이터가 BIM과 Digital Map으로 정리되고, AI 분석과 KPI 평가를 통해 예측과 최적화가 이루어지며, 그 결과가 유지관리뿐 아니라 정책, 실증, 확산 의사결정으로 환류되어야 합니다. 이 구조가 국내 스마트시티 기술 gap을 줄이는 건설관리 관점의 실행모델입니다.');
write('ppt/notesSlides/notesSlide13.xml', notes13);

let notes14 = read('ppt/notesSlides/notesSlide14.xml');
notes14 = replaceText(notes14, '제 연구는 BIM 기반 가상건설, 웨어러블 기반 안전관리, KoBERT와 Transformer 기반 하자 및 유지관리 플랫폼으로 확장되어 왔습니다. 이 연구들은 스마트시티 건설관리에서 요구하는 데이터 기반 의사결정, 안전관리, 유지관리 체계와 직접 연결될 수 있습니다.', '제 연구는 BIM 기반 가상건설, 웨어러블 기반 안전관리, KoBERT와 Transformer 기반 하자 및 유지관리 플랫폼으로 확장되어 왔습니다. 이 연구들은 국내 스마트시티 기술성숙도 gap을 줄이는 AI·BIM·Digital Twin 기반 건설관리 연구와 직접 연결됩니다. 특히 BIM 연구는 Digital Twin 기반 데이터모델, 안전관리 연구는 실시간 사고대응과 시민안전, NLP 유지관리 연구는 도시 인프라 점검·보수 데이터 표준화로 확장될 수 있습니다.');
write('ppt/notesSlides/notesSlide14.xml', notes14);

fs.writeFileSync(sourceNotesPath, [
  'Source notes for SeoulTech smart city construction management update',
  '',
  '- Existing deck: 서울과기대_스마트시티_추가섹션_14p_초안.pptx',
  '- Added source: (한양대학교) 스마트시티 거버넌스_14주차(240607) 교안.pdf, especially 국내·외 스마트시티 기술 Gap 분석, 사업의 시급성 slides: domestic smart city stage 3~4, average TRL global 7.1 vs Korea 5.3, Korea as 74.6% of global TRL, AI technology level 78.1% vs U.S. in 2017.',
  '- Supporting sources: (한양대학교) 스마트시티 거버넌스_3주차(240321) 교안_v1.pdf for CPS loop/data-platform framing; (한양대학교) 스마트시티 거버넌스_12~13주차(240531) 교안.pdf and 13~14주차 교안 for technology application, 실증-확산, 리빙랩, and governance framing.',
  '- Existing smart construction metrics retained from prior draft/source material: construction labor productivity below about 50% of advanced-country level; hourly value added global $35.6 vs Korea $18.7.',
  '',
].join('\n'), 'utf8');

console.log(`Updated PPTX working folder: ${workDir}`);
console.log(`Source notes: ${sourceNotesPath}`);

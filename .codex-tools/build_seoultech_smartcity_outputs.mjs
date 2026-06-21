import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = {
  md: path.join(root, '서울과기대_스마트시티_10p_정리_UTF8.md'),
  txt: path.join(root, '서울과기대_스마트시티_10p_정리_UTF8.txt'),
  html: path.join(root, '서울과기대_스마트시티_10p_정리.html'),
  pdf: path.join(root, '서울과기대_스마트시티_10p_정리.pdf'),
  pptxDir: path.join(root, '.codex-tools', 'seoultech_smartcity_pptx'),
};

const slides = [
  {
    title: '스마트시티와 건설관리의 관계',
    core: '스마트시티는 ICT 서비스의 집합이 아니라, 도시를 구성하는 건축물과 인프라의 생애주기 데이터를 계획·시공·운영 단계에서 연결하는 체계이다.',
    cards: [
      { title: 'Smart City', bullets: ['교통·에너지·안전·환경·공공서비스', '도시 운영을 위한 ICT 서비스', '서비스를 가능하게 하는 물리적 인프라 필요'] },
      { title: 'Construction Management', bullets: ['기획·설계·조달·시공·유지관리', '공정·원가·품질·안전·협업관리', '건축물·인프라 데이터 생성과 검증'] },
      { title: 'Urban Operation', bullets: ['시설물 운영과 자산관리', '위험관리와 시민 안전', '지속가능성과 회복탄력성 관리'] },
    ],
    footer: '건설관리는 스마트시티의 물리적 인프라를 데이터 기반 도시 운영체계로 전환하는 연결 분야이다.',
    note: '본격적인 기술 내용을 말씀드리기 전에 스마트시티와 건설관리의 관계를 먼저 정리합니다. 스마트시티 서비스가 작동하려면 건축물, 도로, 교량, 공공시설과 같은 물리적 인프라가 필요하고, 건설관리는 이 인프라를 기획·설계·시공·유지관리하며 데이터를 생성하고 검증합니다.',
  },
  {
    title: '스마트시티에서 건설관리의 역할',
    core: '스마트시티에서 건설관리는 개별 프로젝트 관리에서 도시 인프라 생애주기 관리로 확장된다.',
    cards: [
      { title: 'Project-level CM', bullets: ['공정관리', '원가관리', '품질관리', '안전관리', '계약 및 협업관리'] },
      { title: 'Smart City-level CM', bullets: ['도시 인프라 자산관리', '예측형 유지관리', '시민 안전 및 생활환경 관리', '탄소·에너지 성능 관리', '도시 리스크 및 회복탄력성 관리'] },
      { title: 'Data Flow', bullets: ['Project Data', 'Facility Data', 'Urban Asset Data', '도시 운영 의사결정으로 확장'] },
    ],
    footer: 'Project Data → Facility Data → Urban Asset Data',
    note: '기존 건설관리는 프로젝트 단위의 공정, 원가, 품질, 안전관리가 중심이었습니다. 스마트시티에서는 이 역할이 도시 인프라 자산관리, 예측형 유지관리, 시민 안전, 탄소·에너지 성능관리로 확장됩니다.',
  },
  {
    title: '스마트시티 건설관리 기술 분야',
    core: '스마트건설 기술은 개별 자동화 기술이 아니라, 도시 인프라 의사결정을 위한 데이터 통합 기술이다.',
    cards: [
      { title: '데이터·정보관리', bullets: ['드론, LiDAR, MMS, 센서 네트워크, CPS', '3D/4D/5D/6D BIM, As-built BIM', 'City Digital Twin'] },
      { title: '시공·생산 자동화', bullets: ['MG/MC, 원격·자율 장비, IoT 장비관제', 'XR-HMI, 로보틱 크레인, 원격 건설로봇', 'TBM 머신러닝 자동화'] },
      { title: '스마트 안전·유지관리', bullets: ['AI 영상분석, 웨어러블, AR 위험 시각화', '임시구조물 실시간 모니터링', 'DfMA, 프리팹 부재 제작·품질검사 자동화'] },
    ],
    footer: '기술의 최종 목표는 공정·원가·품질·안전·유지관리 의사결정을 통합하는 것이다.',
    note: '스마트시티 건설관리는 드론·LiDAR 기반 데이터 취득, BIM·Digital Twin 정보관리, 장비관제와 시공 자동화, 프리팹·모듈러, 로보틱스, 스마트 안전관리의 결합으로 이해할 수 있습니다.',
  },
  {
    title: '현장 데이터와 Digital Twin',
    core: '스마트시티 건설관리의 출발점은 현장 변화를 정밀하게 계측하고, 이를 Digital Map과 As-built BIM으로 전환하는 것이다.',
    cards: [
      { title: '기술', bullets: ['드론, LiDAR, MMS, 센서 네트워크', 'CPS, AR/VR/MR', '열화·진동·환경 모니터링'] },
      { title: '현재 한계', bullets: ['단순 측량 수준에 머무는 경우가 많음', '현장 의사결정 정보 생성 부족', '2D 도면·구두 설명 중심의 정보 공유'] },
      { title: '개선방향', bullets: ['AI 기반 자율계측', '초정밀 Digital Map 자동 생성', 'As-built BIM 및 City Digital Twin 연계'] },
    ],
    footer: 'Digital Map → As-built BIM → City Digital Twin',
    note: '현재 드론과 LiDAR 계측은 활용되고 있지만 단순 측량이나 시범 적용에 머무는 경우가 많습니다. 앞으로는 AI 기반 자율계측, 초정밀 Digital Map, CPS 분석과 시각화를 통해 As-built BIM과 City Digital Twin으로 연결해야 합니다.',
  },
  {
    title: '장비관제와 시공 자동화',
    core: '장비 중심 공종은 관리자 경험 기반 운영에서 AI·IoT 기반 통합관제와 자동화 의사결정으로 전환되어야 한다.',
    cards: [
      { title: '기술', bullets: ['클라우드 BIM, C-Map, Fleet Management', 'MG/MC, 원격·자율 장비, XR-HMI', 'GPR, IRT, HRI, Intelligent Compaction'] },
      { title: '현재 한계', bullets: ['장비 투입·토량배분이 관리자 경험에 의존', 'GPS·통신 음영지역에서 위치추적 단절', '운전자 숙련도에 따른 품질 편차'] },
      { title: '개선방향', bullets: ['Web 기반 통합 관제 플랫폼', 'Smart Local Network와 Wi-Fi Positioning', '실시간 품질평가 및 장비 연동 자동제어'] },
    ],
    footer: '장비 자동화의 핵심은 장비 자체가 아니라 데이터·통신·관제·의사결정의 통합이다.',
    note: '토공과 도로공사처럼 장비 의존도가 높은 분야에서는 장비 조합, 토량배분, 작업경로가 관리자 경험에 의존하는 경우가 많습니다. 클라우드 BIM, C-Map, IoT, 스마트 로컬 네트워크, XR 기반 원격조종을 통합한 관제 플랫폼이 필요합니다.',
  },
  {
    title: '디지털 기반 프리팹·인프라 BIM',
    core: '프리팹·모듈러 인프라는 설계-제작-운반-조립시공 정보를 BIM 기반으로 연결할 때 생산성과 품질을 높일 수 있다.',
    cards: [
      { title: '주요 기술', bullets: ['BIM 기반 구조해석, 설계검토, 가상시공', 'DfMA 기반 프리팹 부재 설계·제작', '3D 스캐닝, AR/VR, 3D 프린팅, 자동 품질검사'] },
      { title: '현재 한계', bullets: ['2D 도면 기반 설계·제작 오류', '설계자-제작자-시공자 간 정보전달 한계', '프리팹 인프라 BIM 연구와 표준 부족'] },
      { title: '개선방향', bullets: ['BIM 기반 설계-제작-시공 협업 시스템', '다형상 프리팹 부재 생산장비 및 자동 품질검사', 'Infra IFC, 4D/5D 연계, 조립시공 사전검토'] },
    ],
    footer: 'BIM은 프리팹 인프라의 생산성, 품질, 조립시공 안정성을 높이는 핵심 기반이다.',
    note: '프리팹과 모듈러 인프라는 스마트시티의 빠르고 효율적인 인프라 구축과 연결됩니다. 2D 도면 기반 설계와 제작은 오류와 재설계, 공기 지연으로 이어질 수 있기 때문에 BIM 기반 설계-제작-시공 협업이 필요합니다.',
  },
  {
    title: '로보틱스·원격시공·TBM 자동화',
    core: '고위험·고난도 공종은 로보틱스, VR 원격조종, 머신러닝 기반 자동화로 작업자 위험을 줄이고 시공품질을 높여야 한다.',
    cards: [
      { title: '교량 고소작업', bullets: ['인력 중심 작업과 추락 위험', '고령·미숙련 작업자 증가', '3D 스캐닝 기반 로보틱 크레인 필요'] },
      { title: '원격 건설로봇', bullets: ['원격조종의 현장감 부족', '몰입형 VR, 다중 카메라, 햅틱·force feedback', '고위험 작업의 원격·무인화'] },
      { title: 'TBM 자동화', bullets: ['굴진데이터 방대, 실시간 분석 어려움', '운전자 숙련도 의존', '머신러닝 기반 이상예측과 자동 운전제어'] },
    ],
    footer: 'Remote and Robotic Construction → Safer and More Reliable Smart Infrastructure',
    note: '교량 고소작업과 터널공사처럼 위험하고 복잡한 공종에는 로보틱스와 원격시공이 중요합니다. TBM 공사는 데이터가 방대하지만 실시간 분석이 어렵기 때문에 머신러닝 기반 예측과 자동 운전제어가 필요합니다.',
  },
  {
    title: 'AI 기반 스마트 안전관리',
    core: '스마트시티의 건설관리는 작업자 안전뿐 아니라 시민 안전, 생활환경, 임시구조물 안전까지 통합적으로 관리해야 한다.',
    cards: [
      { title: '기술', bullets: ['AI 영상분석, IoT, 다중영상, CPS', '웨어러블, 스마트 PPE, AR 위험 시각화', '저가 센서, 비접촉 점검, 임시구조물 모니터링'] },
      { title: '현재 한계', bullets: ['사고 감지 후 대응 중심', '소규모 현장의 시스템·전문인력 부족', '고가 센서와 육안점검 의존'] },
      { title: '개선방향', bullets: ['예측지원 스마트 안전 통합관제', '공정·작업환경별 위험 프로파일링', 'Safety Data → Risk Prediction → Real-time Response'] },
    ],
    footer: 'Safety Data → Risk Prediction → Real-time Response',
    note: '기존 안전관리는 위험요소를 감지하거나 사고 발생 후 대응하는 데 머무는 경우가 많습니다. 앞으로는 AI 영상분석, IoT 센서, 웨어러블, AR 위험 시각화, 디지털트윈 기반 안전관제를 결합해야 합니다.',
  },
  {
    title: '스마트건설관리 기술의 한계와 개선방향',
    core: '스마트건설 기술의 과제는 개별 기술 확보가 아니라, 현장 적용성과 데이터 연계성을 갖춘 통합 관리체계 구축이다.',
    cards: [
      { title: '현재 한계', bullets: ['기술이 분야별로 분절되어 있음', '현장 데이터가 의사결정으로 연결되지 못함', '장비·센서·플랫폼 간 표준과 연계 부족'] },
      { title: '현장 적용 제약', bullets: ['GPS·통신 음영지역과 현장환경 제약', '고가 장비와 전문가 의존', '안전·품질·공정·원가가 따로 관리됨'] },
      { title: '개선방향', bullets: ['BIM-Digital Twin-AI 기반 통합 플랫폼', '데이터 수집-분석-예측-대응 프로세스 정립', '개방형 표준, API, 공통 데이터모델'] },
    ],
    footer: 'From Technology Adoption to Integrated Smart Construction Management',
    note: '스마트건설 기술의 한계는 기술이 없다는 것보다 기술들이 현장에서 서로 연결되지 못한다는 점입니다. 드론, 센서, 장비, BIM, AI가 하나의 통합 플랫폼에서 의사결정으로 이어져야 합니다.',
  },
  {
    title: '스마트시티 건설관리 발전방향',
    core: '스마트시티에서 건설관리는 프로젝트 단위 관리에서 도시 인프라 생애주기 의사결정 체계로 발전해야 한다.',
    cards: [
      { title: '발전방향', bullets: ['BIM, Digital Map, IoT, 유지관리 이력, 민원 데이터 연결', '하자, 노후도, 안전위험, 공정지연, 품질저하 사전 예측', '장비관제, 로보틱스, 원격시공, 자율계측 활용'] },
      { title: '공공가치', bullets: ['작업자 안전과 시민 안전', '생활환경, 탄소, 회복탄력성 고려', '도시 인프라 운영 효율성 향상'] },
      { title: '본인 연구와 연결', bullets: ['BIM 기반 가상건설', '웨어러블 기반 안전관리', 'KoBERT·Transformer 기반 하자 및 유지관리 플랫폼', 'Digital Twin·AI 기반 스마트 현장관리로 확장'] },
    ],
    footer: 'AI·BIM·Digital Twin 기반 스마트건설관리를 통해 스마트시티의 안전성, 지속가능성, 운영 효율성을 높인다.',
    note: '스마트시티에서 건설관리는 도시 인프라 생애주기 의사결정 체계로 발전해야 합니다. 제 연구 역시 BIM 기반 가상건설, 웨어러블 기반 안전관리, KoBERT 기반 유지관리 플랫폼으로 확장되어 왔기 때문에 이 방향과 연결됩니다.',
  },
];

const summary = [
  '기존 1장 표지와 2장 Contents는 유지하고, 그 뒤에 10장짜리 스마트시티 섹션을 붙이는 구성이다.',
  '첫 슬라이드는 본격적인 기술 설명 전에 스마트시티와 건설관리의 관계를 개념적으로 정리한다.',
  '이후 스마트건설관리공학 자료의 분야별 기술을 스마트시티 건설관리 관점으로 재구성한다.',
  '핵심은 분야별 기술 나열이 아니라 기술-한계-개선방향을 통해 건설관리의 통합 의사결정 역할을 보여주는 것이다.',
];

function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function escapeXml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
}

function makeMarkdown() {
  const lines = [];
  lines.push('# 서울과기대 기존 1, 2장 뒤 스마트시티 10p PPT 초안');
  lines.push('');
  lines.push('## 구성 전략');
  lines.push('');
  for (const item of summary) lines.push(`- ${item}`);
  lines.push('');
  lines.push('## 핵심 메시지');
  lines.push('');
  lines.push('> 스마트시티에서 건설관리는 건축물과 인프라의 생애주기 데이터를 AI·BIM·Digital Twin 기반으로 연결하여, 도시의 안전성, 지속가능성, 운영 효율성을 높이는 핵심 의사결정 체계이다.');
  lines.push('');
  lines.push('## 10p 슬라이드 구성');
  lines.push('');
  slides.forEach((slide, i) => {
    lines.push(`### 추가 ${i + 1}. ${slide.title}`);
    lines.push('');
    lines.push(`**핵심 문장:** ${slide.core}`);
    lines.push('');
    for (const card of slide.cards) {
      lines.push(`**${card.title}**`);
      for (const bullet of card.bullets) lines.push(`- ${bullet}`);
      lines.push('');
    }
    lines.push(`**하단 강조문:** ${slide.footer}`);
    lines.push('');
    lines.push(`**발표 멘트:** ${slide.note}`);
    lines.push('');
  });
  lines.push('## 기존 내용으로 넘어가는 연결 멘트');
  lines.push('');
  lines.push('이러한 스마트시티 건설관리 관점에서, 제가 어떤 배경을 통해 BIM, 건설관리, AI 기반 스마트건설 연구를 수행해 왔는지 간단히 말씀드리겠습니다.');
  lines.push('');
  lines.push('이제 스마트시티 건설관리의 핵심 기반기술 중 하나인 BIM 기반 가상건설과 건설관리 활용을 구체적으로 설명드리겠습니다.');
  lines.push('');
  lines.push('## 발표 운영 메모');
  lines.push('');
  lines.push('- 스마트시티 10장 섹션: 약 10~11분');
  lines.push('- 기존 학력소개: 약 2분');
  lines.push('- 기존 BIM 기반 건설관리: 약 5분');
  lines.push('- 교육계획 및 마무리: 약 2분');
  lines.push('- 시간이 부족하면 `로보틱스·원격시공·TBM 자동화`와 `분야별 한계와 개선방향`을 압축 후보로 둔다.');
  lines.push('');
  return `${lines.join('\n')}\n`;
}

function makeText(md) {
  return md
    .replace(/^# /gm, '')
    .replace(/^## /gm, '\n')
    .replace(/^### /gm, '\n')
    .replace(/\*\*/g, '')
    .replace(/^> /gm, '')
    .replace(/^- /gm, '• ');
}

function makeHtml() {
  const slideSections = slides.map((slide, i) => `
    <section class="slide">
      <div class="num">추가 ${i + 1}</div>
      <h2>${escapeHtml(slide.title)}</h2>
      <p class="core">${escapeHtml(slide.core)}</p>
      <div class="cards">
        ${slide.cards.map((card) => `
          <article>
            <h3>${escapeHtml(card.title)}</h3>
            <ul>${card.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
          </article>
        `).join('')}
      </div>
      <p class="footer">${escapeHtml(slide.footer)}</p>
      <div class="note"><strong>발표 멘트</strong><br>${escapeHtml(slide.note)}</div>
    </section>`).join('\n');
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>서울과기대 스마트시티 10p PPT 초안</title>
<style>
  @page { size: A4; margin: 15mm; }
  body { font-family: "Malgun Gothic", "맑은 고딕", sans-serif; color: #172033; line-height: 1.55; }
  h1 { font-size: 24px; margin: 0 0 12px; color: #123c69; }
  h2 { font-size: 20px; margin: 0 0 8px; color: #123c69; }
  h3 { font-size: 14px; margin: 0 0 6px; color: #0f426e; }
  .intro { border-left: 5px solid #1d70b8; padding-left: 14px; margin-bottom: 18px; }
  .message { background: #edf5fb; border: 1px solid #b8d7ee; border-radius: 6px; padding: 10px 12px; font-weight: 700; }
  .slide { page-break-inside: avoid; border-top: 2px solid #1d70b8; padding-top: 12px; margin: 22px 0 26px; }
  .num { color: #607289; font-size: 12px; font-weight: 700; margin-bottom: 4px; }
  .core { background: #f4f8fc; border-left: 4px solid #2d7dbb; padding: 8px 10px; font-weight: 700; }
  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 10px 0; }
  article { border: 1px solid #d5dde7; border-radius: 6px; padding: 9px 10px; min-height: 100px; }
  ul { margin: 0; padding-left: 18px; }
  li { margin: 3px 0; }
  .footer { color: #0f426e; font-weight: 700; border-top: 1px solid #d5dde7; padding-top: 8px; }
  .note { font-size: 12px; color: #39495f; background: #fafafa; border: 1px solid #e2e6ea; border-radius: 6px; padding: 8px 10px; }
  @media print { .slide { break-inside: avoid; } }
</style>
</head>
<body>
  <h1>서울과기대 기존 1, 2장 뒤 스마트시티 10p PPT 초안</h1>
  <div class="intro">
    <p><strong>전제:</strong> 기존 1장 표지와 2장 Contents는 유지하고, 아래 10장을 기존 2장 바로 뒤에 붙인다.</p>
    <ul>${summary.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
  </div>
  <p class="message">스마트시티에서 건설관리는 건축물과 인프라의 생애주기 데이터를 AI·BIM·Digital Twin 기반으로 연결하여, 도시의 안전성, 지속가능성, 운영 효율성을 높이는 핵심 의사결정 체계이다.</p>
  ${slideSections}
</body>
</html>`;
}

const EMU = 914400;
function emu(inch) { return Math.round(inch * EMU); }

function pptParagraph(text, opts = {}) {
  const size = opts.size ?? 1800;
  const color = opts.color ?? '172033';
  const bold = opts.bold ? ' b="1"' : '';
  return `<a:p><a:pPr marL="0"><a:defRPr sz="${size}"/></a:pPr><a:r><a:rPr lang="ko-KR" sz="${size}"${bold}><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:rPr><a:t>${escapeXml(text)}</a:t></a:r><a:endParaRPr lang="ko-KR"/></a:p>`;
}

function pptShape(id, name, x, y, w, h, paragraphs, fill = 'FFFFFF', line = 'D5DDE7') {
  return `<p:sp>
    <p:nvSpPr><p:cNvPr id="${id}" name="${escapeXml(name)}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
    <p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="${fill}"/></a:solidFill><a:ln w="9525"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln></p:spPr>
    <p:txBody><a:bodyPr wrap="square" lIns="91440" tIns="54864" rIns="91440" bIns="54864"/><a:lstStyle/>${paragraphs.join('')}</p:txBody>
  </p:sp>`;
}

function makeSlideXml(slide, index) {
  let id = 2;
  const shapes = [];
  shapes.push(pptShape(id++, 'section', 0.55, 0.25, 1.2, 0.35, [pptParagraph(`추가 ${index + 1}`, { size: 1200, bold: true, color: 'FFFFFF' })], '1D70B8', '1D70B8'));
  shapes.push(pptShape(id++, 'title', 0.55, 0.65, 12.2, 0.65, [pptParagraph(slide.title, { size: 3000, bold: true, color: '123C69' })], 'FFFFFF', 'FFFFFF'));
  shapes.push(pptShape(id++, 'core', 0.65, 1.35, 12.0, 0.75, [pptParagraph(slide.core, { size: 1600, bold: true, color: '123C69' })], 'EDF5FB', 'B8D7EE'));
  const cardY = 2.25;
  const cardW = 3.82;
  slide.cards.forEach((card, cardIndex) => {
    const x = 0.65 + cardIndex * 4.05;
    const paragraphs = [pptParagraph(card.title, { size: 1700, bold: true, color: '0F426E' })];
    for (const bullet of card.bullets.slice(0, 5)) paragraphs.push(pptParagraph(`• ${bullet}`, { size: 1320, color: '172033' }));
    shapes.push(pptShape(id++, `card${cardIndex + 1}`, x, cardY, cardW, 3.15, paragraphs, 'FFFFFF', 'D5DDE7'));
  });
  shapes.push(pptShape(id++, 'footer', 0.65, 5.65, 12.0, 0.75, [pptParagraph(slide.footer, { size: 1500, bold: true, color: '0F426E' })], 'F7FAFD', 'D5DDE7'));
  shapes.push(pptShape(id++, 'brand', 9.2, 6.85, 3.4, 0.25, [pptParagraph('Smart City Construction Management', { size: 900, color: '607289' })], 'FFFFFF', 'FFFFFF'));
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

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writePptxFolder() {
  fs.rmSync(out.pptxDir, { recursive: true, force: true });
  const dirs = [
    '',
    '_rels',
    'docProps',
    'ppt',
    'ppt/_rels',
    'ppt/slides',
    'ppt/slides/_rels',
    'ppt/slideLayouts',
    'ppt/slideLayouts/_rels',
    'ppt/slideMasters',
    'ppt/slideMasters/_rels',
    'ppt/theme',
  ];
  dirs.forEach((d) => ensureDir(path.join(out.pptxDir, d)));

  const overrideSlides = slides.map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join('');
  fs.writeFileSync(path.join(out.pptxDir, '[Content_Types].xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${overrideSlides}
</Types>`, 'utf8');

  fs.writeFileSync(path.join(out.pptxDir, '_rels/.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`, 'utf8');

  fs.writeFileSync(path.join(out.pptxDir, 'docProps/app.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex OpenXML Draft</Application><PresentationFormat>On-screen Show (16:9)</PresentationFormat><Slides>${slides.length}</Slides><Company></Company>
</Properties>`, 'utf8');
  fs.writeFileSync(path.join(out.pptxDir, 'docProps/core.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>서울과기대 스마트시티 10p PPT 초안</dc:title><dc:creator>Codex</dc:creator><cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-06-21T00:00:00Z</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">2026-06-21T00:00:00Z</dcterms:modified>
</cp:coreProperties>`, 'utf8');

  const slideIds = slides.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`).join('');
  fs.writeFileSync(path.join(out.pptxDir, 'ppt/presentation.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:sldIdLst>${slideIds}</p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000" type="wide"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>`, 'utf8');

  const presRels = [`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>`];
  slides.forEach((_, i) => presRels.push(`<Relationship Id="rId${i + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`));
  fs.writeFileSync(path.join(out.pptxDir, 'ppt/_rels/presentation.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${presRels.join('')}</Relationships>`, 'utf8');

  slides.forEach((slide, i) => {
    fs.writeFileSync(path.join(out.pptxDir, `ppt/slides/slide${i + 1}.xml`), makeSlideXml(slide, i), 'utf8');
    fs.writeFileSync(path.join(out.pptxDir, `ppt/slides/_rels/slide${i + 1}.xml.rels`), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>`, 'utf8');
  });

  fs.writeFileSync(path.join(out.pptxDir, 'ppt/slideLayouts/slideLayout1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>`, 'utf8');
  fs.writeFileSync(path.join(out.pptxDir, 'ppt/slideLayouts/_rels/slideLayout1.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>`, 'utf8');

  fs.writeFileSync(path.join(out.pptxDir, 'ppt/slideMasters/slideMaster1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
  <p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles>
</p:sldMaster>`, 'utf8');
  fs.writeFileSync(path.join(out.pptxDir, 'ppt/slideMasters/_rels/slideMaster1.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`, 'utf8');
  fs.writeFileSync(path.join(out.pptxDir, 'ppt/theme/theme1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="SmartCity">
  <a:themeElements>
    <a:clrScheme name="SmartCity"><a:dk1><a:srgbClr val="172033"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="123C69"/></a:dk2><a:lt2><a:srgbClr val="EDF5FB"/></a:lt2><a:accent1><a:srgbClr val="1D70B8"/></a:accent1><a:accent2><a:srgbClr val="0F426E"/></a:accent2><a:accent3><a:srgbClr val="5BA4D9"/></a:accent3><a:accent4><a:srgbClr val="7A90A8"/></a:accent4><a:accent5><a:srgbClr val="6CA97A"/></a:accent5><a:accent6><a:srgbClr val="D69A2D"/></a:accent6><a:hlink><a:srgbClr val="1D70B8"/></a:hlink><a:folHlink><a:srgbClr val="0F426E"/></a:folHlink></a:clrScheme>
    <a:fontScheme name="SmartCityFonts"><a:majorFont><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:majorFont><a:minorFont><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:minorFont></a:fontScheme>
    <a:fmtScheme name="SmartCityFmt"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme>
  </a:themeElements>
</a:theme>`, 'utf8');
}

function widthUnits(text) {
  let units = 0;
  for (const ch of String(text)) {
    const code = ch.codePointAt(0);
    if (code <= 0x007f) units += 0.55;
    else if (code >= 0xac00 && code <= 0xd7a3) units += 1.0;
    else units += 0.85;
  }
  return units;
}

function wrapText(text, maxUnits) {
  const input = String(text).replace(/•/g, '-').trim();
  const words = input.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (widthUnits(next) <= maxUnits) {
      line = next;
      continue;
    }
    if (line) lines.push(line);
    if (widthUnits(word) > maxUnits) {
      let chunk = '';
      for (const ch of word) {
        const nextChunk = chunk + ch;
        if (widthUnits(nextChunk) > maxUnits && chunk) {
          lines.push(chunk);
          chunk = ch;
        } else {
          chunk = nextChunk;
        }
      }
      line = chunk;
    } else {
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function toUtf16Hex(text) {
  const clean = String(text).replace(/•/g, '-');
  const parts = [];
  for (const ch of clean) {
    const code = ch.codePointAt(0);
    if (code > 0xffff) continue;
    parts.push(code.toString(16).padStart(4, '0'));
  }
  return parts.join('').toUpperCase();
}

function pdfText(text, x, y, size, color = '0 0 0') {
  return `${color} rg BT /F1 ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm <${toUtf16Hex(text)}> Tj ET\n`;
}

function makePdfPageContent(slide, index) {
  const margin = 42;
  const width = 595;
  let y = 800;
  let s = '';
  s += '0.07 0.24 0.41 rg 42 812 510 2 re f\n';
  s += pdfText(`추가 ${index + 1}`, margin, y + 18, 9, '0.38 0.45 0.54');
  s += pdfText(slide.title, margin, y, 18, '0.07 0.24 0.41');
  y -= 30;
  for (const line of wrapText(slide.core, 55)) {
    s += pdfText(line, margin, y, 11, '0.07 0.24 0.41');
    y -= 16;
  }
  y -= 8;
  for (const card of slide.cards) {
    s += '0.93 0.96 0.98 rg 42 ' + (y - 6).toFixed(2) + ' 510 18 re f\n';
    s += pdfText(card.title, margin + 6, y, 12, '0.06 0.26 0.43');
    y -= 18;
    for (const bullet of card.bullets) {
      for (const line of wrapText(`- ${bullet}`, 62)) {
        s += pdfText(line, margin + 12, y, 9.5, '0.09 0.13 0.20');
        y -= 13;
      }
    }
    y -= 8;
  }
  y -= 2;
  s += '0.96 0.98 0.99 rg 42 ' + (y - 6).toFixed(2) + ' 510 28 re f\n';
  for (const line of wrapText(slide.footer, 62)) {
    s += pdfText(line, margin + 6, y + 10, 10, '0.06 0.26 0.43');
    y -= 13;
  }
  y -= 18;
  s += pdfText('발표 멘트', margin, y, 10, '0.38 0.45 0.54');
  y -= 14;
  for (const line of wrapText(slide.note, 72)) {
    if (y < 46) break;
    s += pdfText(line, margin, y, 8.5, '0.22 0.29 0.37');
    y -= 12;
  }
  s += pdfText('서울과기대 스마트시티 건설관리 발표 초안', width - 230, 24, 8, '0.38 0.45 0.54');
  return s;
}

function makePdf() {
  const objects = new Map();
  const pageCount = slides.length;
  const kids = [];
  const fontObj = 3;
  objects.set(1, '<< /Type /Catalog /Pages 2 0 R >>');
  objects.set(3, `<< /Type /Font /Subtype /Type0 /BaseFont /HYGoThic-Medium /Encoding /UniKS-UCS2-H /DescendantFonts [ << /Type /Font /Subtype /CIDFontType0 /BaseFont /HYGoThic-Medium /CIDSystemInfo << /Registry (Adobe) /Ordering (Korea1) /Supplement 2 >> /FontDescriptor << /Type /FontDescriptor /FontName /HYGoThic-Medium /Flags 4 /FontBBox [0 -200 1000 900] /Ascent 800 /Descent -200 /CapHeight 700 /StemV 80 >> >> ] >>`);
  slides.forEach((slide, i) => {
    const pageObj = 4 + i * 2;
    const contentObj = 5 + i * 2;
    kids.push(`${pageObj} 0 R`);
    const content = makePdfPageContent(slide, i);
    objects.set(contentObj, `<< /Length ${Buffer.byteLength(content, 'ascii')} >>\nstream\n${content}endstream`);
    objects.set(pageObj, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontObj} 0 R >> >> /Contents ${contentObj} 0 R >>`);
  });
  objects.set(2, `<< /Type /Pages /Count ${pageCount} /Kids [ ${kids.join(' ')} ] >>`);

  const maxObj = 3 + pageCount * 2;
  let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets = [0];
  for (let i = 1; i <= maxObj; i++) {
    offsets[i] = Buffer.byteLength(pdf, 'binary');
    pdf += `${i} 0 obj\n${objects.get(i)}\nendobj\n`;
  }
  const xref = Buffer.byteLength(pdf, 'binary');
  pdf += `xref\n0 ${maxObj + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= maxObj; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${maxObj + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  fs.writeFileSync(out.pdf, Buffer.from(pdf, 'binary'));
}

const md = makeMarkdown();
fs.writeFileSync(out.md, md, 'utf8');
fs.writeFileSync(out.txt, makeText(md), 'utf8');
fs.writeFileSync(out.html, makeHtml(), 'utf8');
writePptxFolder();
makePdf();

console.log(`wrote ${out.md}`);
console.log(`wrote ${out.txt}`);
console.log(`wrote ${out.html}`);
console.log(`wrote ${out.pdf}`);
console.log(`wrote ${out.pptxDir}`);

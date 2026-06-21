import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, '.codex-tools', 'seoultech_smartcity_appendix_pptx');
const outMd = path.join(root, '서울과기대_스마트시티_추가섹션_14p_구성안.md');

const smartDir = path.join(root, '.codex-tools', 'smart_pdf_images');
const originalDir = path.join(root, '.codex-tools', 'seoultech_original_images');
const toolDir = path.join(root, '.codex-tools');

const theme = {
  navy: '122A4C',
  blue: '1D70B8',
  sky: 'EDF5FB',
  teal: '1F8B87',
  green: '4E9357',
  gray: '607289',
  lightLine: 'D5DDE7',
  text: '172033',
};

function src(kind, file) {
  const base = kind === 'smart' ? smartDir : kind === 'original' ? originalDir : toolDir;
  return path.join(base, file);
}

const slides = [
  {
    layout: 'cover',
    title: '스마트시티에서의 건설관리 역할 및 발전 방향',
    subtitle: 'Smart City Construction Management: Roles, Technologies, and Future Directions',
    meta: ['서울과학기술대학교 건축학부 공개발표 추가 섹션', '권나현 | 2026. 06. 21'],
    images: [{ src: src('original', 'img_0007_2199x891.jpg'), caption: '스마트시티와 디지털 인프라' }],
    note: '지금부터는 기존 연구 소개 뒤에 연결되는 스마트시티 건설관리 섹션입니다. 핵심은 스마트시티를 ICT 서비스만으로 보지 않고, 건축물과 인프라의 생애주기 데이터를 계획, 시공, 운영 단계에서 연결하는 건설관리 관점으로 해석하는 것입니다.',
  },
  {
    layout: 'agenda',
    title: '스마트시티 건설관리 발표 구성',
    core: '스마트시티의 개념에서 출발해 기술체계, 개별 기술, 한계와 발전방향, 본인 연구와의 연결 순서로 전개한다.',
    bullets: [
      '스마트시티와 건설관리의 관계',
      '도시 인프라 생애주기 관점의 건설관리 역할',
      '스마트시티 관련 건설관리 기술의 종류와 내용',
      '개별 기술: Digital Twin, 장비관제, 프리팹/BIM, 로보틱스, 안전관리',
      '기술 한계와 개선·발전방향 및 본인 연구 확장',
    ],
    images: [
      { src: src('smart', 'img_0006_2199x1648.jpg'), caption: 'Smart City' },
      { src: src('smart', 'img_0506_881x612.jpg'), caption: 'BIM Integration' },
      { src: src('smart', 'img_0307_795x768.jpg'), caption: 'Data Platform' },
    ],
    note: '전체 구성은 다섯 단계입니다. 먼저 스마트시티와 건설관리의 관계를 정리하고, 건설관리 역할이 프로젝트 단위에서 도시 인프라 생애주기로 확장된다는 점을 설명합니다. 그 다음 관련 기술의 종류를 종합적으로 제시한 뒤, 개별 기술과 한계 및 발전방향으로 이어가겠습니다.',
  },
  {
    layout: 'concept',
    title: '스마트시티와 건설관리의 관계',
    core: '스마트시티는 ICT 서비스의 집합이 아니라, 도시 인프라를 데이터 기반 운영체계로 전환하는 생애주기 관리 체계이다.',
    cards: [
      { title: 'Smart City', bullets: ['교통·에너지·안전·환경 서비스', '도시 운영을 위한 데이터/ICT', '서비스를 지탱하는 물리적 인프라'] },
      { title: 'Construction Management', bullets: ['기획·설계·조달·시공·유지관리', '공정·원가·품질·안전·협업관리', '건축물·인프라 데이터 생성과 검증'] },
      { title: 'Urban Operation', bullets: ['자산관리와 예측형 유지관리', '시민 안전과 생활환경 관리', '탄소·에너지·회복탄력성 관리'] },
    ],
    images: [
      { src: src('smart', 'img_0006_2199x1648.jpg'), caption: '도시 데이터 계층' },
      { src: src('smart', 'img_0506_881x612.jpg'), caption: 'BIM 중심 정보 연결' },
      { src: src('original', 'img_0232_614x481.jpg'), caption: '생애주기 운영 개념' },
    ],
    footer: '건설관리는 스마트시티의 물리적 인프라를 데이터 기반 도시 운영체계로 전환하는 연결 분야이다.',
    note: '스마트시티 서비스가 작동하려면 도로, 교량, 건축물, 공공시설과 같은 물리적 인프라가 필요합니다. 건설관리는 이 인프라를 만들고 유지관리하는 과정에서 데이터를 생성하고 검증합니다. 따라서 스마트시티에서 건설관리는 단순 시공관리가 아니라 도시 운영의 기반 데이터를 만드는 역할로 확장됩니다.',
  },
  {
    layout: 'concept',
    title: '스마트시티에서 건설관리의 역할 확장',
    core: '개별 프로젝트 관리에서 도시 인프라 생애주기 의사결정으로 관리 범위가 확장된다.',
    cards: [
      { title: 'Project-level CM', bullets: ['공정·원가·품질·안전관리', '계약 및 협업관리', '시공 단계 중심의 의사결정'] },
      { title: 'Facility-level CM', bullets: ['As-built BIM과 유지관리 이력', '성능·하자·점검 데이터 축적', '예측형 유지관리 기반'] },
      { title: 'City-level CM', bullets: ['도시 인프라 자산관리', '시민 안전·생활환경·탄소 관리', '도시 리스크 및 회복탄력성 관리'] },
    ],
    images: [
      { src: src('original', 'img_0936_731x415.jpg'), caption: '4D/BIM 기반 공정관리' },
      { src: src('smart', 'img_0307_795x768.jpg'), caption: '공통 서비스 플랫폼' },
      { src: src('smart', 'img_0229_866x540.jpg'), caption: '현장 데이터-분석-AI 엔진' },
    ],
    footer: 'Project Data → Facility Data → Urban Asset Data → City Operation Decision',
    note: '기존 건설관리는 프로젝트 단위의 공정, 원가, 품질, 안전관리가 중심이었습니다. 스마트시티에서는 이 정보가 시설물 유지관리 데이터로 축적되고, 다시 도시 인프라 자산관리와 시민 안전, 탄소 및 회복탄력성 관리로 확장됩니다.',
  },
  {
    layout: 'image-grid',
    title: '국내 스마트건설관리 현황과 필요성',
    core: '국내 건설산업은 생산성·디지털화·인프라 경쟁력 측면의 개선 필요성이 크며, 스마트시티 구현을 위해 데이터 기반 건설관리로 전환해야 한다.',
    cards: [
      { title: '주요 현황', bullets: ['국내 노동생산성: 선진국 대비 약 50% 수준', '시간당 부가가치: 글로벌 $35.6 vs 국내 $18.7'] },
      { title: '경쟁력 격차', bullets: ['국내 건설기업 글로벌 종합 경쟁력 7위', '건설 인프라 경쟁력은 11위로 상대적 저조'] },
      { title: '전환 필요성', bullets: ['고령화·숙련공 부족으로 자동화 수요 증가', '시공 데이터를 도시 운영 데이터로 연결 필요'] },
    ],
    images: [
      { src: src('smart', 'img_0130_939x470.jpg'), caption: '국가별 건설업 노동생산성 비교' },
      { src: src('smart', 'img_0120_902x637.jpg'), caption: '글로벌 선도 수준과 국내 수준 비교' },
      { src: src('smart', 'img_0140_1137x380.jpg'), caption: '건설기업·인프라 경쟁력 순위 비교' },
    ],
    footer: '스마트시티 건설관리는 선택적 기술 도입이 아니라, 생산성·안전성·운영 효율성을 높이기 위한 필수 전환 방향이다.',
    note: '스마트건설관리공학 자료에서는 국내 건설산업이 디지털화와 생산성 측면에서 개선 필요성이 크다고 설명합니다. 특히 국내 건설업 노동생산성은 선진국 대비 약 50% 수준으로 제시되고, 글로벌 선도 수준의 시간당 부가가치가 35.6달러인 반면 국내는 18.7달러 수준으로 제시됩니다. 또한 국내 건설기업의 종합 경쟁력은 7위이지만 건설 인프라 경쟁력은 11위로 상대적으로 낮습니다. 따라서 스마트시티 구현을 위해서는 건설단계부터 데이터를 생성하고 운영 데이터로 연결하는 관리체계가 필요합니다.',
  },
  {
    layout: 'tech-overview',
    title: '스마트시티 건설관리 기술의 종류와 내용',
    core: '스마트시티 건설관리 기술은 데이터 취득, 정보모델, 시공 자동화, 안전·유지관리, 통합 플랫폼으로 구성된다.',
    domains: [
      { title: '현장 데이터 취득', desc: '드론, LiDAR, MMS, 센서 네트워크, GPR/IRT/HRI', img: src('smart', 'img_0322_1052x573.jpg') },
      { title: 'BIM·Digital Twin', desc: '3D/4D/5D/6D BIM, As-built BIM, City Digital Twin', img: src('smart', 'img_0653_1339x495.jpg') },
      { title: '시공 자동화', desc: 'MG/MC, Fleet Management, 원격·자율 장비, 품질 자동평가', img: src('smart', 'img_0239_977x439.jpg') },
      { title: '로보틱스·프리팹', desc: 'DfMA, 모듈러/프리팹, 원격시공, TBM 자동화', img: src('smart', 'img_1003_1319x702.jpg') },
      { title: 'AI 안전·유지관리', desc: 'AI 영상분석, 웨어러블, AR 위험 시각화, 예측 유지관리', img: src('smart', 'img_0357_1183x757.jpg') },
    ],
    footer: '기술 자체보다 중요한 것은 데이터가 공정·원가·품질·안전 의사결정으로 연결되는 통합 구조이다.',
    note: '개별 기술 설명에 들어가기 전에 관련 기술을 종합하면 다섯 축으로 볼 수 있습니다. 첫째는 현장 데이터를 취득하는 기술, 둘째는 BIM과 Digital Twin 기반 정보모델, 셋째는 장비관제와 시공 자동화, 넷째는 프리팹과 로보틱스, 다섯째는 AI 기반 안전 및 유지관리입니다. 이 기술들은 따로 존재하는 것이 아니라 하나의 의사결정 체계로 연결되어야 합니다.',
  },
  {
    layout: 'image-grid',
    title: '현장 데이터와 Digital Twin',
    core: '현장 변화를 정밀하게 계측하고 Digital Map, As-built BIM, City Digital Twin으로 전환하는 것이 스마트시티 건설관리의 출발점이다.',
    cards: [
      { title: '기술', bullets: ['드론, LiDAR, MMS, 센서 네트워크', 'CPS, AR/VR/MR, 열화·진동·환경 모니터링'] },
      { title: '현재 한계', bullets: ['단순 측량 또는 시범 적용에 머무는 경우가 많음', '현장 의사결정 정보 생성과 공유가 부족'] },
      { title: '개선방향', bullets: ['AI 기반 자율계측과 초정밀 Digital Map', 'As-built BIM 및 City Digital Twin 연계'] },
    ],
    images: [
      { src: src('smart', 'img_0322_1052x573.jpg'), caption: '3D 스캔·현장 계측 데이터' },
      { src: src('smart', 'img_0653_1339x495.jpg'), caption: '디지털맵·BIM 모델 연계' },
      { src: src('smart', 'img_0658_1193x496.jpg'), caption: '인프라 Digital Twin 활용' },
    ],
    footer: 'Digital Map → As-built BIM → City Digital Twin',
    note: '현재 드론과 LiDAR 계측은 활용되고 있지만 단순 측량이나 시범 적용에 머무는 경우가 있습니다. 앞으로는 현장 데이터를 자동으로 취득하고, 이를 Digital Map과 As-built BIM으로 전환하여 City Digital Twin으로 연결해야 합니다.',
  },
  {
    layout: 'image-grid',
    title: '장비관제와 시공 자동화',
    core: '장비 의존도가 높은 공종은 관리자 경험 기반 운영에서 데이터 기반 통합관제와 자동화 의사결정으로 전환되어야 한다.',
    cards: [
      { title: '기술', bullets: ['클라우드 BIM, C-Map, Fleet Management', 'MG/MC, 원격·자율 장비, XR-HMI'] },
      { title: '현재 한계', bullets: ['장비 투입·토량배분이 관리자 경험에 의존', 'GPS·통신 음영지역에서 위치추적 단절'] },
      { title: '개선방향', bullets: ['Web 기반 통합 관제 플랫폼', 'Smart Local Network와 Wi-Fi Positioning'] },
    ],
    images: [
      { src: src('smart', 'img_0239_977x439.jpg'), caption: 'Fleet Management 및 장비관제' },
      { src: src('smart', 'img_0993_1024x676.jpg'), caption: '도로 포장 장비 자동화' },
      { src: src('smart', 'img_0690_844x526.jpg'), caption: '센서 기반 품질·위치 데이터' },
    ],
    footer: '장비 자동화의 핵심은 장비 자체가 아니라 데이터·통신·관제·의사결정의 통합이다.',
    note: '토공과 도로공사처럼 장비 의존도가 높은 분야에서는 장비 조합, 토량배분, 작업경로가 관리자 경험에 의존하는 경우가 많습니다. 클라우드 BIM, C-Map, IoT, 스마트 네트워크, XR 기반 원격조종을 통합한 관제 플랫폼이 필요합니다.',
  },
  {
    layout: 'image-grid',
    title: '디지털 기반 프리팹·인프라 BIM',
    core: '프리팹·모듈러 인프라는 설계-제작-운반-조립시공 정보를 BIM 기반으로 연결할 때 생산성과 품질을 높일 수 있다.',
    cards: [
      { title: '기술', bullets: ['BIM 기반 구조해석, 설계검토, 가상시공', 'DfMA 기반 프리팹 부재 설계·제작'] },
      { title: '현재 한계', bullets: ['2D 도면 기반 설계·제작 오류', '설계자-제작자-시공자 간 정보전달 한계'] },
      { title: '개선방향', bullets: ['BIM 기반 설계-제작-시공 협업', 'Infra IFC, 4D/5D 연계, 조립시공 사전검토'] },
    ],
    images: [
      { src: src('smart', 'img_0677_932x1028.jpg'), caption: '프리팹 교량 부재·조립 개념' },
      { src: src('smart', 'img_0589_906x542.jpg'), caption: 'BIM 기반 모델 검토' },
      { src: src('smart', 'img_0501_878x538.jpg'), caption: '설계-제작-시공 정보 연계' },
    ],
    footer: 'BIM은 프리팹 인프라의 생산성, 품질, 조립시공 안정성을 높이는 핵심 기반이다.',
    note: '프리팹과 모듈러 인프라는 스마트시티의 빠르고 효율적인 인프라 구축과 연결됩니다. 2D 도면 기반 설계와 제작은 오류와 재설계, 공기 지연으로 이어질 수 있기 때문에 BIM 기반 설계-제작-시공 협업이 필요합니다.',
  },
  {
    layout: 'image-grid',
    title: '로보틱스·원격시공·TBM 자동화',
    core: '고위험·고난도 공종은 로보틱스, VR 원격조종, 머신러닝 기반 자동화로 작업자 위험을 줄이고 시공품질을 높여야 한다.',
    cards: [
      { title: '로보틱스', bullets: ['고소·협소·반복 작업의 로봇화', '3D 스캔 기반 로보틱 크레인 및 시공'] },
      { title: '원격시공', bullets: ['몰입형 VR, 다중 카메라, 햅틱 피드백', '고위험 작업의 원격·무인화'] },
      { title: 'TBM 자동화', bullets: ['굴진데이터 기반 이상예측', '머신러닝 기반 운전제어와 리스크 관리'] },
    ],
    images: [
      { src: src('smart', 'img_1003_1319x702.jpg'), caption: '건설 로봇 및 지형 인식' },
      { src: src('smart', 'img_0749_895x629.jpg'), caption: '원격 건설로봇 조종 시스템' },
      { src: src('smart', 'img_0879_742x482.jpg'), caption: 'TBM 운전·제어 자동화' },
    ],
    footer: 'Remote and Robotic Construction → Safer and More Reliable Smart Infrastructure',
    note: '교량 고소작업과 터널공사처럼 위험하고 복잡한 공종에는 로보틱스와 원격시공이 중요합니다. 특히 TBM 공사는 데이터가 방대하지만 실시간 분석이 어렵기 때문에 머신러닝 기반 예측과 자동 운전제어가 필요합니다.',
  },
  {
    layout: 'image-grid',
    title: 'AI 기반 스마트 안전관리',
    core: '스마트시티의 건설관리는 작업자 안전뿐 아니라 시민 안전, 생활환경, 임시구조물 안전까지 통합적으로 관리해야 한다.',
    cards: [
      { title: '기술', bullets: ['AI 영상분석, IoT, 다중영상, CPS', '웨어러블, 스마트 PPE, AR 위험 시각화'] },
      { title: '현재 한계', bullets: ['사고 감지 후 대응 중심', '소규모 현장의 시스템·전문인력 부족'] },
      { title: '개선방향', bullets: ['예측지원 스마트 안전 통합관제', 'Safety Data → Risk Prediction → Real-time Response'] },
    ],
    images: [
      { src: src('smart', 'img_0357_1183x757.jpg'), caption: 'AI·IoT 기반 안전관리' },
      { src: src('smart', 'img_1077_1187x455.jpg'), caption: '근로자·위험상황 데이터 연결' },
      { src: src('smart', 'img_0347_838x498.jpg'), caption: '디지털트윈 기반 안전 관제' },
    ],
    footer: 'Safety Data → Risk Prediction → Real-time Response',
    note: '기존 안전관리는 위험요소를 감지하거나 사고 발생 후 대응하는 데 머무는 경우가 많습니다. 앞으로는 AI 영상분석, IoT 센서, 웨어러블, AR 위험 시각화, 디지털트윈 기반 안전관제를 결합해야 합니다.',
  },
  {
    layout: 'diagram',
    title: '스마트건설관리 기술의 한계와 개선·발전방향',
    core: '기술 도입의 다음 단계는 현장 적용성과 데이터 연계성을 갖춘 통합 스마트건설관리 체계 구축이다.',
    images: [
      { src: src('tool', 'smartcity_limit_development_diagram.jpg'), caption: '기술 한계-개선 전략-발전방향 종합 도식' },
    ],
    footer: 'From Technology Adoption to Integrated Smart Construction Management',
    note: '스마트건설 기술의 한계는 기술 자체가 없다는 것보다 기술들이 현장에서 서로 연결되지 못한다는 점입니다. 따라서 BIM, Digital Twin, AI, 센서, 장비 데이터를 하나의 통합 플랫폼으로 연결하고, 데이터 수집-분석-예측-대응 프로세스를 정립해야 합니다.',
  },
  {
    layout: 'model',
    title: '스마트시티 건설관리 운영 모델',
    core: '현장 데이터는 프로젝트 관리, 시설물 관리, 도시 운영 의사결정으로 이어지는 폐쇄루프형 관리체계로 연결되어야 한다.',
    model: [
      { title: 'Data Capture', desc: '드론·LiDAR·센서·장비 데이터' },
      { title: 'Information Model', desc: 'BIM·Digital Map·As-built BIM' },
      { title: 'AI Decision Support', desc: '예측·최적화·위험분석' },
      { title: 'Urban Operation', desc: '자산관리·안전·탄소·회복탄력성' },
    ],
    images: [
      { src: src('smart', 'img_0322_1052x573.jpg'), caption: 'Capture' },
      { src: src('smart', 'img_0506_881x612.jpg'), caption: 'BIM' },
      { src: src('smart', 'img_0307_795x768.jpg'), caption: 'Platform' },
      { src: src('smart', 'img_0357_1183x757.jpg'), caption: 'Safety' },
    ],
    footer: '수집 → 모델링 → 예측 → 대응 → 운영 데이터 환류',
    note: '스마트시티 건설관리는 단방향 정보관리보다 폐쇄루프형 운영 모델이 중요합니다. 현장 데이터가 BIM과 Digital Map으로 정리되고, AI 분석을 통해 예측과 최적화가 이루어지며, 그 결과가 도시 운영과 유지관리 의사결정으로 환류되어야 합니다.',
  },
  {
    layout: 'research',
    title: '본인 연구와의 연결 및 발전 방향',
    core: '기존 BIM·AI·안전관리 연구를 스마트시티 건설관리의 데이터 기반 의사결정 체계로 확장할 수 있다.',
    cards: [
      { title: 'BIM 기반 가상건설', bullets: ['4D/5D BIM, 공정·비용·시공성 검토', '스마트시티 인프라 Digital Twin 기반'] },
      { title: 'AI 안전관리', bullets: ['웨어러블·영상·센서 데이터 활용', '작업자 및 시민 안전관리로 확장'] },
      { title: 'NLP·유지관리 플랫폼', bullets: ['KoBERT·Transformer 기반 하자/유지관리', '도시 인프라 생애주기 자산관리로 확장'] },
    ],
    images: [
      { src: src('original', 'img_0281_457x329.jpg'), caption: 'BIM 기반 건설관리 연구' },
      { src: src('smart', 'img_0357_1183x757.jpg'), caption: '스마트 안전관리 확장' },
      { src: src('smart', 'img_0307_795x768.jpg'), caption: 'AI·데이터 플랫폼 연구' },
    ],
    footer: 'AI·BIM·Digital Twin 기반 스마트건설관리 연구를 통해 스마트시티의 안전성, 지속가능성, 운영 효율성을 높인다.',
    note: '제 연구는 BIM 기반 가상건설, 웨어러블 기반 안전관리, KoBERT와 Transformer 기반 하자 및 유지관리 플랫폼으로 확장되어 왔습니다. 이 연구들은 스마트시티 건설관리에서 요구하는 데이터 기반 의사결정, 안전관리, 유지관리 체계와 직접 연결될 수 있습니다.',
  },
];

function escapeXml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
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
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error('Could not read JPEG size');
}

function pptParagraph(text, opts = {}) {
  const size = opts.size ?? 1200;
  const color = opts.color ?? theme.text;
  const bold = opts.bold ? ' b="1"' : '';
  return `<a:p><a:pPr marL="0"><a:defRPr sz="${size}"/></a:pPr><a:r><a:rPr lang="ko-KR" sz="${size}"${bold}><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:rPr><a:t>${escapeXml(text)}</a:t></a:r><a:endParaRPr lang="ko-KR"/></a:p>`;
}

function pptShape(id, name, x, y, w, h, paragraphs, fill = 'FFFFFF', line = theme.lightLine, radius = 'rect') {
  return `<p:sp>
    <p:nvSpPr><p:cNvPr id="${id}" name="${escapeXml(name)}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
    <p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm><a:prstGeom prst="${radius}"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="${fill}"/></a:solidFill><a:ln w="9525"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln></p:spPr>
    <p:txBody><a:bodyPr wrap="square" lIns="73152" tIns="45720" rIns="73152" bIns="45720"><a:normAutofit fontScale="88000" lnSpcReduction="8000"/></a:bodyPr><a:lstStyle/>${paragraphs.join('')}</p:txBody>
  </p:sp>`;
}

function imageFit(meta, frameX, frameY, frameW, frameH) {
  const imageAspect = meta.width / meta.height;
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
  return { x: frameX + (frameW - w) / 2, y: frameY + (frameH - h) / 2, w, h };
}

function pptImage(id, relId, x, y, w, h, name) {
  return `<p:pic>
    <p:nvPicPr><p:cNvPr id="${id}" name="${escapeXml(name)}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
    <p:blipFill><a:blip r:embed="${relId}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
    <p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:ln w="9525"><a:solidFill><a:srgbClr val="B8C7D8"/></a:solidFill></a:ln></p:spPr>
  </p:pic>`;
}

function headerShapes(idStart, slide, index) {
  let id = idStart;
  const shapes = [];
  shapes.push(pptShape(id++, 'topline', 0.0, 0.0, 13.333, 0.12, [], theme.navy, theme.navy));
  shapes.push(pptShape(id++, 'section label', 0.55, 0.22, 3.5, 0.28, [pptParagraph('Smart City Construction Management', { size: 760, color: theme.gray, bold: true })], 'FFFFFF', 'FFFFFF'));
  shapes.push(pptShape(id++, 'right label', 9.0, 0.22, 3.8, 0.28, [pptParagraph('2026.1학기 서울과학기술대학교 발표자료', { size: 760, color: theme.gray })], 'FFFFFF', 'FFFFFF'));
  shapes.push(pptShape(id++, 'title', 0.55, 0.55, 12.1, 0.55, [pptParagraph(slide.title, { size: 2200, color: theme.navy, bold: true })], 'FFFFFF', 'FFFFFF'));
  shapes.push(pptShape(id++, 'page', 12.28, 6.98, 0.55, 0.22, [pptParagraph(String(index + 1), { size: 800, color: theme.gray })], 'FFFFFF', 'FFFFFF'));
  return { shapes, nextId: id };
}

function coreShape(id, text) {
  return pptShape(id, 'core message', 0.65, 1.22, 12.0, 0.56, [pptParagraph(text, { size: 1220, color: theme.navy, bold: true })], theme.sky, 'B8D7EE');
}

function addImagePanel(shapes, idRef, meta, frame, caption) {
  let id = idRef.value;
  shapes.push(pptShape(id++, 'image panel', frame.x, frame.y, frame.w, frame.h, [], 'F8FAFC', theme.lightLine));
  const fitted = imageFit(meta, frame.x + 0.06, frame.y + 0.06, frame.w - 0.12, frame.h - 0.34);
  shapes.push(pptImage(id++, meta.relId, fitted.x, fitted.y, fitted.w, fitted.h, meta.mediaName));
  shapes.push(pptShape(id++, 'caption', frame.x + 0.05, frame.y + frame.h - 0.27, frame.w - 0.1, 0.22, [pptParagraph(caption, { size: 660, color: theme.gray })], 'FFFFFF', 'FFFFFF'));
  idRef.value = id;
}

function cardShape(id, card, x, y, w, h, maxBullets = 3) {
  const paragraphs = [pptParagraph(card.title, { size: 1220, color: theme.blue, bold: true })];
  for (const bullet of card.bullets.slice(0, maxBullets)) paragraphs.push(pptParagraph(`• ${bullet}`, { size: 900, color: theme.text }));
  return pptShape(id, `card ${card.title}`, x, y, w, h, paragraphs, 'FFFFFF', theme.lightLine);
}

function makeCover(slide, index, metas) {
  let id = 2;
  const shapes = [];
  const bg = metas[0];
  shapes.push(pptImage(id++, bg.relId, 0, 0, 13.333, 7.5, bg.mediaName));
  shapes.push(pptShape(id++, 'overlay', 0, 0, 13.333, 7.5, [], '122A4C', '122A4C'));
  shapes.push(pptShape(id++, 'title', 0.75, 1.78, 11.7, 0.95, [pptParagraph(slide.title, { size: 3100, color: 'FFFFFF', bold: true })], '122A4C', '122A4C'));
  shapes.push(pptShape(id++, 'subtitle', 0.78, 2.78, 11.4, 0.45, [pptParagraph(slide.subtitle, { size: 1350, color: 'D8E8F5' })], '122A4C', '122A4C'));
  shapes.push(pptShape(id++, 'line', 0.78, 3.42, 3.9, 0.05, [], theme.blue, theme.blue));
  shapes.push(pptShape(id++, 'meta', 0.78, 5.52, 6.5, 0.78, slide.meta.map((m) => pptParagraph(m, { size: 1050, color: 'FFFFFF' })), '122A4C', '122A4C'));
  shapes.push(pptShape(id++, 'page', 12.28, 6.98, 0.55, 0.22, [pptParagraph(String(index + 1), { size: 800, color: 'FFFFFF' })], '122A4C', '122A4C'));
  return shapes;
}

function makeAgenda(slide, index, metas) {
  let { shapes, nextId } = headerShapes(2, slide, index);
  let id = nextId;
  shapes.push(coreShape(id++, slide.core));
  const left = 0.8;
  const y0 = 2.12;
  slide.bullets.forEach((b, i) => {
    shapes.push(pptShape(id++, `agenda ${i + 1}`, left, y0 + i * 0.72, 5.5, 0.5, [pptParagraph(`${String(i + 1).padStart(2, '0')}   ${b}`, { size: 1120, color: i === 2 ? theme.blue : theme.text, bold: i === 2 })], i === 2 ? 'EDF5FB' : 'FFFFFF', i === 2 ? 'B8D7EE' : theme.lightLine));
  });
  const frames = [
    { x: 6.9, y: 2.1, w: 2.0, h: 1.65 },
    { x: 9.05, y: 2.1, w: 2.0, h: 1.65 },
    { x: 8.0, y: 4.0, w: 2.9, h: 1.82 },
  ];
  const idRef = { value: id };
  metas.forEach((m, i) => addImagePanel(shapes, idRef, m, frames[i], slide.images[i].caption));
  id = idRef.value;
  shapes.push(pptShape(id++, 'footer', 0.65, 6.35, 11.95, 0.38, [pptParagraph('기존 발표자료 뒤에 붙이는 스마트시티 건설관리 추가 섹션', { size: 1020, color: theme.navy, bold: true })], 'F7FAFD', theme.lightLine));
  return shapes;
}

function makeConcept(slide, index, metas) {
  let { shapes, nextId } = headerShapes(2, slide, index);
  let id = nextId;
  shapes.push(coreShape(id++, slide.core));
  slide.cards.forEach((card, i) => {
    shapes.push(cardShape(id++, card, 0.65, 2.03 + i * 1.14, 5.7, 1.0, 3));
  });
  const frames = [
    { x: 6.75, y: 2.03, w: 2.7, h: 1.58 },
    { x: 9.7, y: 2.03, w: 2.7, h: 1.58 },
    { x: 7.6, y: 3.95, w: 3.95, h: 1.72 },
  ];
  const idRef = { value: id };
  metas.forEach((m, i) => addImagePanel(shapes, idRef, m, frames[i], slide.images[i].caption));
  id = idRef.value;
  shapes.push(pptShape(id++, 'footer', 0.65, 6.22, 12.0, 0.5, [pptParagraph(slide.footer, { size: 1120, color: theme.navy, bold: true })], 'F7FAFD', theme.lightLine));
  return shapes;
}

function makeTechOverview(slide, index, metas) {
  let { shapes, nextId } = headerShapes(2, slide, index);
  let id = nextId;
  shapes.push(coreShape(id++, slide.core));
  const cardW = 2.38;
  const gap = 0.12;
  slide.domains.forEach((domain, i) => {
    const x = 0.62 + i * (cardW + gap);
    const y = 2.02;
    shapes.push(pptShape(id++, `domain ${i + 1}`, x, y, cardW, 3.8, [], 'FFFFFF', theme.lightLine));
    const fitted = imageFit(metas[i], x + 0.08, y + 0.1, cardW - 0.16, 1.42);
    shapes.push(pptImage(id++, metas[i].relId, fitted.x, fitted.y, fitted.w, fitted.h, metas[i].mediaName));
    shapes.push(pptShape(id++, `domain text ${i + 1}`, x + 0.08, y + 1.65, cardW - 0.16, 1.8, [
      pptParagraph(domain.title, { size: 1030, color: theme.blue, bold: true }),
      pptParagraph(domain.desc, { size: 800, color: theme.text }),
    ], 'FFFFFF', 'FFFFFF'));
  });
  shapes.push(pptShape(id++, 'footer', 0.65, 6.22, 12.0, 0.5, [pptParagraph(slide.footer, { size: 1060, color: theme.navy, bold: true })], 'F7FAFD', theme.lightLine));
  return shapes;
}

function makeImageGrid(slide, index, metas) {
  let { shapes, nextId } = headerShapes(2, slide, index);
  let id = nextId;
  shapes.push(coreShape(id++, slide.core));
  slide.cards.forEach((card, i) => {
    shapes.push(cardShape(id++, card, 0.65, 2.0 + i * 1.18, 5.75, 1.04, 2));
  });
  const frames = [
    { x: 6.75, y: 2.02, w: 2.72, h: 1.75 },
    { x: 9.75, y: 2.02, w: 2.72, h: 1.75 },
    { x: 7.28, y: 4.06, w: 4.7, h: 1.72 },
  ];
  const idRef = { value: id };
  metas.forEach((m, i) => addImagePanel(shapes, idRef, m, frames[i], slide.images[i].caption));
  id = idRef.value;
  shapes.push(pptShape(id++, 'footer', 0.65, 6.22, 12.0, 0.5, [pptParagraph(slide.footer, { size: 1080, color: theme.navy, bold: true })], 'F7FAFD', theme.lightLine));
  return shapes;
}

function makeDiagram(slide, index, metas) {
  let { shapes, nextId } = headerShapes(2, slide, index);
  let id = nextId;
  shapes.push(coreShape(id++, slide.core));
  const m = metas[0];
  const frame = { x: 0.7, y: 2.0, w: 11.95, h: 4.45 };
  const fitted = imageFit(m, frame.x, frame.y, frame.w, frame.h);
  shapes.push(pptImage(id++, m.relId, fitted.x, fitted.y, fitted.w, fitted.h, m.mediaName));
  shapes.push(pptShape(id++, 'footer', 0.65, 6.55, 12.0, 0.38, [pptParagraph(slide.footer, { size: 1060, color: theme.navy, bold: true })], 'F7FAFD', theme.lightLine));
  return shapes;
}

function makeModel(slide, index, metas) {
  let { shapes, nextId } = headerShapes(2, slide, index);
  let id = nextId;
  shapes.push(coreShape(id++, slide.core));
  const xs = [0.82, 3.98, 7.14, 10.3];
  slide.model.forEach((m, i) => {
    shapes.push(pptShape(id++, `model ${i + 1}`, xs[i], 2.03, 2.18, 1.0, [
      pptParagraph(m.title, { size: 1040, color: 'FFFFFF', bold: true }),
      pptParagraph(m.desc, { size: 760, color: 'FFFFFF' }),
    ], [theme.blue, theme.teal, '4E9357', theme.navy][i], [theme.blue, theme.teal, '4E9357', theme.navy][i], 'roundRect'));
    if (i < 3) shapes.push(pptShape(id++, `arrow ${i}`, xs[i] + 2.25, 2.38, 0.58, 0.18, [pptParagraph('→', { size: 1350, color: theme.gray, bold: true })], 'FFFFFF', 'FFFFFF'));
  });
  const frames = [
    { x: 0.88, y: 3.55, w: 2.55, h: 1.55 },
    { x: 3.86, y: 3.55, w: 2.55, h: 1.55 },
    { x: 6.84, y: 3.55, w: 2.55, h: 1.55 },
    { x: 9.82, y: 3.55, w: 2.55, h: 1.55 },
  ];
  const idRef = { value: id };
  metas.forEach((m, i) => addImagePanel(shapes, idRef, m, frames[i], slide.images[i].caption));
  id = idRef.value;
  shapes.push(pptShape(id++, 'footer', 0.65, 6.22, 12.0, 0.5, [pptParagraph(slide.footer, { size: 1100, color: theme.navy, bold: true })], 'F7FAFD', theme.lightLine));
  return shapes;
}

function makeResearch(slide, index, metas) {
  let { shapes, nextId } = headerShapes(2, slide, index);
  let id = nextId;
  shapes.push(coreShape(id++, slide.core));
  slide.cards.forEach((card, i) => {
    shapes.push(cardShape(id++, card, 0.65 + i * 4.05, 2.0, 3.78, 1.42, 2));
  });
  const frames = [
    { x: 0.83, y: 3.78, w: 3.3, h: 1.82 },
    { x: 5.0, y: 3.78, w: 3.3, h: 1.82 },
    { x: 9.17, y: 3.78, w: 3.3, h: 1.82 },
  ];
  const idRef = { value: id };
  metas.forEach((m, i) => addImagePanel(shapes, idRef, m, frames[i], slide.images[i].caption));
  id = idRef.value;
  shapes.push(pptShape(id++, 'footer', 0.65, 6.22, 12.0, 0.5, [pptParagraph(slide.footer, { size: 1050, color: theme.navy, bold: true })], 'F7FAFD', theme.lightLine));
  return shapes;
}

function makeNotesXml(slide, index) {
  const paragraphs = [
    pptParagraph(`${index + 1}. ${slide.title}`, { size: 1500, color: theme.navy, bold: true }),
    pptParagraph(slide.note, { size: 1200, color: theme.text }),
  ];
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    <p:sp><p:nvSpPr><p:cNvPr id="2" name="Notes Placeholder"/><p:cNvSpPr txBox="1"/><p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="685800" y="548640"/><a:ext cx="5486400" cy="7315200"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr wrap="square"/><a:lstStyle/>${paragraphs.join('')}</p:txBody></p:sp>
  </p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:notes>`;
}

function makeNotesMasterXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notesMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:notesStyle><a:lvl1pPr algn="l"><a:defRPr sz="1200"><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:defRPr></a:lvl1pPr></p:notesStyle>
</p:notesMaster>`;
}

function makeSlideXml(slide, index, metas) {
  let shapes;
  if (slide.layout === 'cover') shapes = makeCover(slide, index, metas);
  else if (slide.layout === 'agenda') shapes = makeAgenda(slide, index, metas);
  else if (slide.layout === 'concept') shapes = makeConcept(slide, index, metas);
  else if (slide.layout === 'tech-overview') shapes = makeTechOverview(slide, index, metas);
  else if (slide.layout === 'image-grid') shapes = makeImageGrid(slide, index, metas);
  else if (slide.layout === 'diagram') shapes = makeDiagram(slide, index, metas);
  else if (slide.layout === 'model') shapes = makeModel(slide, index, metas);
  else if (slide.layout === 'research') shapes = makeResearch(slide, index, metas);
  else throw new Error(`Unknown layout ${slide.layout}`);
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>${shapes.join('\n')}</p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
}

function writeOutline() {
  const lines = ['# 서울과기대 스마트시티 추가 섹션 13p 구성안', ''];
  slides.forEach((slide, i) => {
    lines.push(`## ${i + 1}. ${slide.title}`);
    if (slide.core) lines.push('', `**핵심:** ${slide.core}`);
    if (slide.cards) {
      for (const card of slide.cards) {
        lines.push('', `**${card.title}**`);
        for (const b of card.bullets) lines.push(`- ${b}`);
      }
    }
    if (slide.domains) {
      for (const d of slide.domains) lines.push(`- ${d.title}: ${d.desc}`);
    }
    if (slide.footer) lines.push('', `**강조:** ${slide.footer}`);
    lines.push('', `**발표 노트:** ${slide.note}`, '');
  });
  fs.writeFileSync(outMd, `${lines.join('\n')}\n`, 'utf8');
}

function writePptxFolder() {
  fs.rmSync(outDir, { recursive: true, force: true });
  const dirs = ['', '_rels', 'docProps', 'ppt', 'ppt/_rels', 'ppt/media', 'ppt/slides', 'ppt/slides/_rels', 'ppt/slideLayouts', 'ppt/slideLayouts/_rels', 'ppt/slideMasters', 'ppt/slideMasters/_rels', 'ppt/notesSlides', 'ppt/notesSlides/_rels', 'ppt/notesMasters', 'ppt/notesMasters/_rels', 'ppt/theme'];
  dirs.forEach((d) => fs.mkdirSync(path.join(outDir, d), { recursive: true }));

  const slideMetas = [];
  let mediaIndex = 1;
  slides.forEach((slide) => {
    const metas = [];
    const imageList = slide.layout === 'tech-overview'
      ? slide.domains.map((d) => ({ src: d.img, caption: d.title }))
      : slide.images ?? [];
    imageList.forEach((img) => {
      const buffer = fs.readFileSync(img.src);
      const size = getJpegSize(buffer);
      const mediaName = `image${mediaIndex}.jpg`;
      fs.copyFileSync(img.src, path.join(outDir, 'ppt', 'media', mediaName));
      metas.push({ ...img, ...size, mediaName, relId: `rId${metas.length + 2}` });
      mediaIndex += 1;
    });
    slideMetas.push(metas);
  });

  const overrideSlides = slides.map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join('');
  const overrideNotes = slides.map((_, i) => `<Override PartName="/ppt/notesSlides/notesSlide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/>`).join('');
  fs.writeFileSync(path.join(outDir, '[Content_Types].xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpg" ContentType="image/jpeg"/><Default Extension="jpeg" ContentType="image/jpeg"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/><Override PartName="/ppt/notesMasters/notesMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${overrideSlides}${overrideNotes}
</Types>`, 'utf8');

  fs.writeFileSync(path.join(outDir, '_rels/.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'docProps/app.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Codex OpenXML Draft</Application><PresentationFormat>On-screen Show (16:9)</PresentationFormat><Slides>${slides.length}</Slides><Company></Company></Properties>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'docProps/core.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>서울과기대 스마트시티 추가 섹션</dc:title><dc:creator>Codex</dc:creator><cp:lastModifiedBy>Codex</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">2026-06-21T00:00:00Z</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">2026-06-21T00:00:00Z</dcterms:modified></cp:coreProperties>`, 'utf8');

  const slideIds = slides.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`).join('');
  fs.writeFileSync(path.join(outDir, 'ppt/presentation.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:notesMasterIdLst><p:notesMasterId r:id="rId${slides.length + 2}"/></p:notesMasterIdLst><p:sldIdLst>${slideIds}</p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="wide"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`, 'utf8');

  const presRels = [`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>`];
  slides.forEach((_, i) => presRels.push(`<Relationship Id="rId${i + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`));
  presRels.push(`<Relationship Id="rId${slides.length + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="notesMasters/notesMaster1.xml"/>`);
  fs.writeFileSync(path.join(outDir, 'ppt/_rels/presentation.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${presRels.join('')}</Relationships>`, 'utf8');

  slides.forEach((slide, i) => {
    fs.writeFileSync(path.join(outDir, `ppt/slides/slide${i + 1}.xml`), makeSlideXml(slide, i, slideMetas[i]), 'utf8');
    const rels = [`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>`];
    slideMetas[i].forEach((m) => rels.push(`<Relationship Id="${m.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${m.mediaName}"/>`));
    rels.push(`<Relationship Id="rId${slideMetas[i].length + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide" Target="../notesSlides/notesSlide${i + 1}.xml"/>`);
    fs.writeFileSync(path.join(outDir, `ppt/slides/_rels/slide${i + 1}.xml.rels`), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${rels.join('')}</Relationships>`, 'utf8');
    fs.writeFileSync(path.join(outDir, `ppt/notesSlides/notesSlide${i + 1}.xml`), makeNotesXml(slide, i), 'utf8');
    fs.writeFileSync(path.join(outDir, `ppt/notesSlides/_rels/notesSlide${i + 1}.xml.rels`), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="../slides/slide${i + 1}.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="../notesMasters/notesMaster1.xml"/></Relationships>`, 'utf8');
  });

  fs.writeFileSync(path.join(outDir, 'ppt/slideLayouts/slideLayout1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/slideLayouts/_rels/slideLayout1.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/slideMasters/slideMaster1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/slideMasters/_rels/slideMaster1.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/notesMasters/notesMaster1.xml'), makeNotesMasterXml(), 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/notesMasters/_rels/notesMaster1.xml.rels'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`, 'utf8');
  fs.writeFileSync(path.join(outDir, 'ppt/theme/theme1.xml'), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="SeoulTechSmartCity"><a:themeElements><a:clrScheme name="SeoulTechSmartCity"><a:dk1><a:srgbClr val="${theme.text}"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="${theme.navy}"/></a:dk2><a:lt2><a:srgbClr val="${theme.sky}"/></a:lt2><a:accent1><a:srgbClr val="${theme.blue}"/></a:accent1><a:accent2><a:srgbClr val="${theme.teal}"/></a:accent2><a:accent3><a:srgbClr val="${theme.green}"/></a:accent3><a:accent4><a:srgbClr val="${theme.gray}"/></a:accent4><a:accent5><a:srgbClr val="D69A2D"/></a:accent5><a:accent6><a:srgbClr val="8B5CF6"/></a:accent6><a:hlink><a:srgbClr val="${theme.blue}"/></a:hlink><a:folHlink><a:srgbClr val="${theme.teal}"/></a:folHlink></a:clrScheme><a:fontScheme name="Malgun"><a:majorFont><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:majorFont><a:minorFont><a:latin typeface="Malgun Gothic"/><a:ea typeface="Malgun Gothic"/></a:minorFont></a:fontScheme><a:fmtScheme name="Fmt"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>`, 'utf8');
}

writeOutline();
writePptxFolder();
console.log(`wrote ${outMd}`);
console.log(`wrote ${outDir}`);

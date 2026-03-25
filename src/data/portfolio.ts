export const projects = [
  { id:1, title:'두산에너빌리티 게스트하우스', category:'Full Stack', desc:'두산에너빌리티 게스트하우스 예약 및 관리 시스템 풀스택 개발. UIUX 디자인, 퍼블리싱, Report Design 포함.', tags:['Figma','JSP','Java','HTML/CSS','JavaScript'], year:'2025', color:'from-blue-500/20 to-indigo-500/20', accent:'#5B8EFF', client:'㈜두산에너빌리티', period:'2025.06~2025.12', featured:true, link:'https://guesthouse.doosanenerbility.com/' },
  { id:2, title:'두산에너빌리티 CMMS', category:'Publishing', desc:'설비 유지보수 관리 시스템(CMMS) UIUX 디자인 및 퍼블리싱. Figma 기반 설계 후 웹 구현.', tags:['Figma','HTML/CSS','JavaScript'], year:'2025', color:'from-orange-500/20 to-rose-500/20', accent:'#FF6B6B', client:'㈜두산에너빌리티', period:'2025.06~2025.07', featured:true, link:'https://cmms.doosanenerbility.com/' },
  { id:3, title:'사내 웹 표준 템플릿', category:'Design System', desc:'한국오픈솔루션 사내 프로젝트 공용 웹 표준 템플릿 설계 및 구축.', tags:['HTML/CSS','JavaScript','JSP','Design System'], year:'2025', color:'from-cyan-500/20 to-teal-500/20', accent:'#06B6D4', client:'㈜한국오픈솔루션', period:'2025.02~2025.05', featured:true, link:'https://standards.hancom.com/' },
  { id:4, title:'플랜트펄스 엣지 게이트웨이', category:'Web Design', desc:'IoT 엣지 게이트웨이 제품 소개 및 마케팅 웹사이트 기획·디자인·개발.', tags:['HTML/CSS','JavaScript','JSP'], year:'2024', color:'from-violet-500/20 to-purple-500/20', accent:'#8B5CF6', client:'㈜한국오픈솔루션', period:'2024.12~2025.03', featured:false, link:'https://kopens.com/plantpulse-edge-gateway/' },
  { id:5, title:'우리동네재생정보 시스템', category:'GIS / Public', desc:'도시재생 정보를 지도 기반으로 시각화하는 공공 웹 서비스 UI/UX 개선.', tags:['JavaScript','CSS','ArcGIS','PostgreSQL'], year:'2024', color:'from-emerald-500/20 to-green-500/20', accent:'#10B981', client:'도시주택보증공사', period:'2024.03~2024.07', featured:false, link:'https://www.city.go.kr/map/index.do' },
  { id:6, title:'도시종합정보체계', category:'GIS / Public', desc:'도시 공간정보 통합 관리 시스템 웹 개발 및 유지보수.', tags:['JSP','Java','OpenLayers','PostgreSQL'], year:'2024', color:'from-amber-500/20 to-yellow-500/20', accent:'#F59E0B', client:'도시주택보증공사', period:'2024.03~2024.07', featured:false, link:'https://www.city.go.kr/portal/policyInfo/urban/bizContents/link.do' },
]

export const skillGroups = [
  { category:'Design Tools', icon:'✦', skills:[{ name:'Figma', pct:95 },{ name:'Adobe XD', pct:85 },{ name:'Illustrator', pct:80 },{ name:'Photoshop', pct:70 },{ name:'Premiere Pro', pct:40 }] },
  { category:'Frontend',     icon:'◈', skills:[{ name:'HTML / CSS', pct:97 },{ name:'JavaScript', pct:88 },{ name:'JSP', pct:72 },{ name:'Java', pct:30 }] },
  { category:'Tools & Infra',icon:'◉', skills:[{ name:'VS Code', pct:95 },{ name:'Eclipse', pct:85 },{ name:'Apache Tomcat', pct:50 },{ name:'PostgreSQL', pct:30 },{ name:'ArcGIS / OpenLayers', pct:20 }] },
]

export const experiences = [
  { company:'㈜한국오픈솔루션', role:'사원', period:'24.12 — 25.12', desc:'제품 사이트, 사내 표준 템플릿, 두산에너빌리티 게스트하우스·CMMS 등 다수 프로젝트 UIUX 설계 및 개발 담당.' },
  { company:'아이티에스노아',   role:'주임', period:'24.03 — 24.07', desc:'도시주택보증공사 공공 GIS 시스템 UI/UX 개선 및 웹사이트 유지보수·개발.' },
  { company:'㈜태양',          role:'대리', period:'22.06 — 23.01', desc:'사내 사이트 유지보수 및 온/오프라인 광고 디자인.' },
  { company:'㈜부곤에프앤비',  role:'대리', period:'21.02 — 21.11', desc:'사내 사이트 제작 및 온/오프라인 광고 디자인.' },
  { company:'㈜동우메디칼',    role:'사원', period:'19.07 — 20.02', desc:'자사 웹사이트 디자인 및 프론트엔드 개발.' },
]

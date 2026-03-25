export type DesignCategory = 'All' | 'Detail Page' | 'Edit Design' | 'Video' | 'UI/UX'

export interface DesignWork {
  id: number
  title: string
  category: Exclude<DesignCategory, 'All'>
  desc: string
  tags: string[]
  year: string
  client: string
  period: string
  color: string         // tailwind gradient classes (card header bg)
  /** 'image' | 'video' */
  mediaType: 'image' | 'video'
  /**
   * 실제 이미지/영상 URL을 넣어주세요.
   * 현재는 placeholder 값으로 채워져 있습니다.
   * 이미지: '/assets/design/파일명.png' 또는 외부 URL
   * 영상:   YouTube embed URL (https://www.youtube.com/embed/VIDEO_ID)
   *         또는 직접 mp4 경로 '/assets/design/파일명.mp4'
   */
  mediaUrl: string
  /** 갤러리 이미지가 여러 장일 경우 추가 (선택) */
  images?: string[]
  featured?: boolean
}

export const designWorks: DesignWork[] = [
  {
    id: 1,
    title: '두산에너빌리티 게스트하우스 상세페이지',
    category: 'Detail Page',
    desc: '두산에너빌리티 게스트하우스 예약 시스템의 객실 상세 페이지 UI 디자인. 정보 위계와 예약 플로우를 중심으로 설계.',
    tags: ['Figma', 'UI Design', 'B2B'],
    year: '2025',
    client: '㈜두산에너빌리티',
    period: '2025.06 ~ 2025.08',
    color: 'from-blue-500/20 to-indigo-500/20',
    mediaType: 'image',
    mediaUrl: '/assets/design/guesthouse-detail.png',
    images: [
      '/assets/design/guesthouse-detail.png',
      '/assets/design/guesthouse-detail-2.png',
    ],
    featured: true,
  },
  {
    id: 2,
    title: 'CMMS 설비관리 상세페이지',
    category: 'Detail Page',
    desc: '설비 유지보수 관리 시스템(CMMS)의 설비 상세 정보 및 이력 조회 화면 디자인.',
    tags: ['Figma', 'UI Design', 'Dashboard'],
    year: '2025',
    client: '㈜두산에너빌리티',
    period: '2025.06 ~ 2025.07',
    color: 'from-orange-500/20 to-rose-500/20',
    mediaType: 'image',
    mediaUrl: '/assets/design/cmms-detail.png',
    featured: true,
  },
  {
    id: 3,
    title: '제품 카탈로그 편집 디자인',
    category: 'Edit Design',
    desc: '플랜트펄스 엣지 게이트웨이 제품 카탈로그 인쇄물 편집 디자인. A4 4페이지 구성.',
    tags: ['Illustrator', 'Print', 'Catalog'],
    year: '2024',
    client: '㈜한국오픈솔루션',
    period: '2024.12 ~ 2025.01',
    color: 'from-violet-500/20 to-purple-500/20',
    mediaType: 'image',
    mediaUrl: '/assets/design/catalog.png',
    images: [
      '/assets/design/catalog-p1.png',
      '/assets/design/catalog-p2.png',
      '/assets/design/catalog-p3.png',
      '/assets/design/catalog-p4.png',
    ],
    featured: true,
  },
  {
    id: 4,
    title: '사내 뉴스레터 편집 디자인',
    category: 'Edit Design',
    desc: '분기별 사내 뉴스레터 레이아웃 및 편집 디자인. 일러스트레이터 기반 제작.',
    tags: ['Illustrator', 'Editorial', 'Newsletter'],
    year: '2023',
    client: '㈜태양',
    period: '2022.08 ~ 2023.01',
    color: 'from-amber-500/20 to-yellow-500/20',
    mediaType: 'image',
    mediaUrl: '/assets/design/newsletter.png',
  },
  {
    id: 5,
    title: '제품 홍보 영상',
    category: 'Video',
    desc: '플랜트펄스 엣지 게이트웨이 제품 소개 홍보 영상. Premiere Pro 편집 및 모션그래픽.',
    tags: ['Premiere Pro', 'Motion', 'Product'],
    year: '2025',
    client: '㈜한국오픈솔루션',
    period: '2025.01 ~ 2025.02',
    color: 'from-cyan-500/20 to-teal-500/20',
    mediaType: 'video',
    // YouTube embed URL 또는 mp4 경로로 교체하세요
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true,
  },
  {
    id: 6,
    title: '사내 행사 홍보 영상',
    category: 'Video',
    desc: '사내 워크샵 및 행사 홍보용 숏폼 영상 제작. 촬영 편집 및 자막 작업.',
    tags: ['Premiere Pro', 'Short-form', 'Event'],
    year: '2022',
    client: '㈜태양',
    period: '2022.09 ~ 2022.10',
    color: 'from-pink-500/20 to-rose-500/20',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 7,
    title: '도시재생 GIS 시스템 UI/UX',
    category: 'UI/UX',
    desc: '우리동네재생정보 시스템 지도 기반 인터페이스 리디자인. 공공 서비스 접근성 중심 설계.',
    tags: ['Figma', 'UX Research', 'GIS', 'Public'],
    year: '2024',
    client: '도시주택보증공사',
    period: '2024.03 ~ 2024.07',
    color: 'from-emerald-500/20 to-green-500/20',
    mediaType: 'image',
    mediaUrl: '/assets/design/gis-ux.png',
    images: [
      '/assets/design/gis-ux.png',
      '/assets/design/gis-ux-2.png',
    ],
    featured: true,
  },
  {
    id: 8,
    title: '의료기기 브랜드 웹사이트 UI',
    category: 'UI/UX',
    desc: '동우메디칼 자사 브랜드 웹사이트 UI/UX 리뉴얼. 제품 카탈로그 및 회사 소개 중심.',
    tags: ['Figma', 'Web Design', 'Healthcare'],
    year: '2019',
    client: '㈜동우메디칼',
    period: '2019.08 ~ 2020.01',
    color: 'from-sky-500/20 to-blue-500/20',
    mediaType: 'image',
    mediaUrl: '/assets/design/medical-web.png',
  },
]

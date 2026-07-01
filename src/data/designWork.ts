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
    title: '태양안전제화 상세페이지 제작',
    category: 'Detail Page',
    desc: '태양안전제화 핏스텝인솔 상세페이지 제작',
    tags: ['photo', 'illustrator', 'web Design', 'B2B'],
    year: '2022',
    client: '㈜태양안전제화',
    period: '2022.07 ~ 2022.08',
    color: 'from-orange-500/20 to-rose-500/20',
    mediaType: 'image',
    mediaUrl: 'img/fitstep.jpg',
    images: [
      'img/fitstep.jpg',
      'img/fitstep2.jpg',
      'img/fitstep3.jpg',
    ],
    featured: true,
  },
  {
    id: 2,
    title: '태양안전제화 707D 상세페이지 제작',
    category: 'Detail Page',
    desc: '태양안전제화 707D 상세페이지 제작',
    tags: ['photo', 'illustrator', 'web Design', 'B2B'],
    year: '2022',
    client: '㈜태양안전제화',
    period: '2022.06 ~ 2022.07',
    color: 'from-orange-500/20 to-rose-500/20',
    mediaType: 'image',
    mediaUrl: 'img/safefy1.png',
    images: [
      'img/safefy2.jpg',
    ],

    featured: true,
  },
  {
    id: 3,
    title: '대구 영림 라이온스 클럽 카탈로그 편집 디자인',
    category: 'Edit Design',
    desc: '대구 영림 라이온스 클럽, .',
    tags: ['Illustrator', 'Indesign', 'Catalog'],
    year: '2020',
    client: '대구 영림 라이온스 클럽',
    period: '2020.03 ~ 2020.03',
    color: 'from-violet-500/20 to-purple-500/20',
    mediaType: 'image',
    mediaUrl: 'img/deagu_lions.png',
    images: [
      'img/deagu_lions.png',
      '',
    ],
    featured: true,
  },
  {
    id: 4,
    title: '대구노동청 카탈로그 디자인',
    category: 'Edit Design',
    desc: '대구노동청 카탈로그 디자인',
    tags: ['Illustrator', 'Editorial', 'Newsletter'],
    year: '2020',
    client: '㈜대구노동청',
    period: '2020.04 ~ 2020.04',
    color: 'from-amber-500/20 to-yellow-500/20',
    mediaType: 'image',
    mediaUrl: 'img/deagu_nochong.png',
  },
 
  {
    id: 6,
    title: '몽크로스 안전화 MC-50D 제품 광고 영상',
    category: 'Video',
    desc: '몽크로스 안전화 MC-50D 제품 광고 영상 촬영 편집 및 자막 작업.',
    tags: ['Premiere Pro', 'After Effects'],
    year: '2022',
    client: '㈜태양',
    period: '2022.09 ~ 2022.10',
    color: 'from-pink-500/20 to-rose-500/20',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/embed/-SWDriQ4If8'
  },

   {
    id: 7,
    title: 'Doosan CMMS System UI/UX Design',
    category: 'UI/UX',
    desc: 'Doosan CMMS System의 UI/UX 디자인 작업.',
    tags: ['Figma', 'Sketch', 'User Research'],
    year: '2025',
    client: 'Doosan Corporation',
    period: '2025.05 ~ 2025.05  ',
    color: 'from-pink-500/20 to-rose-500/20',
    mediaType: 'image',
    mediaUrl: 'img/CMMS.png',
    images: [
      'img/cmms_white1.png',
      'img/cmms_white2.png',
      'img/cmms_white3.png',
      'img/cmms_white4.png',
      'img/cmms_white5.png',
      'img/cmms_white6.png',
      'img/cmms_black1.png',
      'img/cmms_black2.png',
      'img/cmms_black3.png',
      'img/cmms_black4.png',
      'img/cmms_black5.png',
      'img/cmms_black6.png',
    ],
  },
  {
    id: 8,
    title: 'Lotte KPI System UI/UX Design',
    category: 'UI/UX',
    desc: 'Lotte KPI System의 UI/UX 디자인 작업.',
    tags: ['Figma', 'Sketch', 'User Research'],
    year: '2025',
    client: 'Lotte',
    period: '2025.01 ~ 2025.01',
    color: 'from-pink-500/20 to-rose-500/20',
    mediaType: 'image',
    mediaUrl: 'img/lotte.png',
    images: [
      'img/lotte.png',
      'img/lotte2.png',
    ],
  },
  {
    id: 9,
    title: 'Doosan guest System UI/UX Design',
    category: 'UI/UX',
    desc: 'Doosan guest System의 UI/UX 디자인 작업.',
    tags: ['Figma', 'Sketch', 'User Research'],
    year: '2025',
    client: 'Doosan Corporation',
    period: '2025.05 ~ 2025.12',
    color: 'from-pink-500/20 to-rose-500/20',
    mediaType: 'image',
    mediaUrl: 'img/guest.png',
    images: [
      'img/guest01.png',
      'img/guest02.png',
      'img/guest03.png',
      'img/guest04.png',
      'img/guest05.png',
      'img/guest06.png',
      'img/guest07.png',
      'img/guest08.png',
      'img/guest09.png',
    ],
  },
  {
    id: 10,
    title: 'Doosan Mobile System UI/UX Design',
    category: 'UI/UX',
    desc: 'Doosan Mobile System의 UI/UX 디자인 작업.',
    tags: ['Figma', 'Sketch', 'User Research'],
    year: '2025',
    client: 'Doosan Corporation',
    period: '2025.05 ~ 2025.07',
    color: 'from-pink-500/20 to-rose-500/20',
    mediaType: 'image',
    mediaUrl: 'img/doosan_mobile.png',
    images: [
      'img/doosan_mobile.png',
      'img/doosan_mobile.png',
      '',
    ],
  },
]

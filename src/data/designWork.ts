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
    mediaUrl: '/public/img/fitstep.jpg',
    images: [
      '/public/img/fitstep.jpg',
      '/public/img/fitstep+2.jpg',
      '/public/img/fitstep+3.jpg',
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
    mediaUrl: '/public/img/safefy+1.png',
    images: [
      '/public/img/safefy+2.jpg',
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
    mediaUrl: '/public/img/deagu_lions.png',
    images: [
      '/public/img/deagu_lions.png',
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
    mediaUrl: '/public/img/deagu_nochong.png',
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

]

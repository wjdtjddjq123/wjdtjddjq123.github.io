import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, X, ChevronLeft, ChevronRight, ExternalLink, Play, Image as ImageIcon } from 'lucide-react'
import { Button, Badge, Divider } from '@/components/atoms'
import { cn } from '@/utils/cn'
import { designWorks, type DesignWork, type DesignCategory } from '@/data/designWork'

/* ─────────────────────────────────────────────
   CATEGORY CONFIG
───────────────────────────────────────────── */
const CATEGORIES: DesignCategory[] = ['All', 'Detail Page', 'Edit Design', 'Video', 'UI/UX']

const CAT_COLOR: Record<string, string> = {
  'Detail Page': 'accent',
  'Edit Design': 'warning',
  'Video':       'info',
  'UI/UX':       'success',
}

/* ─────────────────────────────────────────────
   MEDIA PLACEHOLDER (실제 이미지 없을 때)
───────────────────────────────────────────── */


function getYoutubeThumbnail(url: string) {
  const match = url.match(/(?:embed\/|v=|youtu\.be\/)([^&]+)/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : ''
}

/* ───────────────────────────── */
function MediaPlaceholder({ work }: { work: DesignWork }) {
  return (
    <div className={cn(
      'w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br',
      work.color,
    )}>
      {work.mediaType === 'video'
        ? <Play size={32} className="text-white/60" />
        : <ImageIcon size={32} className="text-white/60" />
      }
    </div>
  )
}



/* ─────────────────────────────────────────────
   CARD THUMBNAIL HEADER
───────────────────────────────────────────── 
function CardThumb({ work }: { work: DesignWork }) {
  return (
    <div className={cn('relative h-44 bg-gradient-to-br overflow-hidden', work.color)}>
      {/* 실제 이미지가 있으면 보여주고, 없으면 placeholder 
      <img
        src={work.mediaUrl}
        alt={work.title}
        className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
        onLoad={e => { (e.target as HTMLImageElement).style.opacity = '1' }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      {/* 비디오 플레이 오버레이 
      {work.mediaType === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
      )}
      {/* 이미지 수 뱃지 
      {work.images && work.images.length > 1 && (
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-mono">
          1 / {work.images.length}
        </div>
      )}
    </div>
  )
}*/
/* ─────────────────────────────
   🔥 썸네일 처리 개선
───────────────────────────── */
function CardThumb({ work }: { work: DesignWork }) {
  const isVideo = work.mediaType === 'video'

  const thumbSrc = isVideo
    ? getYoutubeThumbnail(work.mediaUrl)
    : work.mediaUrl

  return (
    <div className={cn('relative h-44 bg-gradient-to-br overflow-hidden', work.color)}>
      {thumbSrc ? (
        <img
          src={thumbSrc}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <MediaPlaceholder work={work} />
      )}

      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
      )}
    </div>
  )
}
/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function Modal({ work, onClose }: { work: DesignWork; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const images = work.images ?? [work.mediaUrl]

  // ESC 닫기
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setImgIdx(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setImgIdx(i => Math.min(images.length - 1, i + 1))
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, images.length])

  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
      style={{ animation: 'fadeIn .18s ease' }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-border bg-bg overflow-hidden shadow-2xl"
        style={{ animation: 'slideUp .22s ease' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface shrink-0">
          <Badge variant={CAT_COLOR[work.category] as any}>{work.category}</Badge>
          <span className="font-body font-bold text-tx flex-1 truncate">{work.title}</span>
          <span className="t-label text-tx-3 hidden sm:block">{work.client}</span>
          <span className="t-label text-tx-3 hidden sm:block">{work.period}</span>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 p-1.5 rounded-lg text-tx-3 hover:text-tx hover:bg-surface-2 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Media area */}
        <div className="flex-1 overflow-y-auto">
          <div className="relative bg-surface-2 min-h-64" style={{ aspectRatio: '16/9' }}>
            {work.mediaType === 'video' ? (
              /* ── VIDEO ── */
              work.mediaUrl.includes('youtube') || work.mediaUrl.includes('youtu.be') ? (
                <iframe
                  src={work.mediaUrl}
                  title={work.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video src={work.mediaUrl} controls className="w-full h-full object-contain" />
              )
            ) : (
              /* ── IMAGE ── */
              <>
                <img
                  key={images[imgIdx]}
                  src={images[imgIdx]}
                  alt={`${work.title} ${imgIdx + 1}`}
                  className="w-full h-full object-contain"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                {/* nav arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                      disabled={imgIdx === 0}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-black/70 disabled:opacity-30 transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setImgIdx(i => Math.min(images.length - 1, i + 1))}
                      disabled={imgIdx === images.length - 1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-black/70 disabled:opacity-30 transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                    {/* dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImgIdx(i)}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-all',
                            i === imgIdx ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/70'
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Info */}
          <div className="p-6">
            <p className="t-body text-tx-2 mb-5 leading-relaxed">{work.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {work.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-mono rounded-full border border-border text-tx-3 bg-surface-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
function WorkCard({ work, onClick }: { work: DesignWork; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <CardThumb work={work} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-body font-bold text-sm text-tx leading-snug group-hover:text-accent transition-colors">
            {work.title}
          </h3>
          <span className="t-label text-tx-3 shrink-0">{work.year}</span>
        </div>
        <p className="text-sm text-tx-2 leading-relaxed mb-4 line-clamp-2">{work.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {work.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-mono rounded-full border border-border text-tx-3 bg-surface-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Badge variant={CAT_COLOR[work.category] as any}>{work.category}</Badge>
          <span className="text-xs text-tx-3 flex-1 truncate">{work.client}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            {work.mediaType === 'video' ? <Play size={12} /> : <ExternalLink size={12} />}
            {work.mediaType === 'video' ? '영상 보기' : '상세 보기'}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function DesignWorkPage() {
  const [filter, setFilter] = useState<DesignCategory>('All')
  const [selected, setSelected] = useState<DesignWork | null>(null)

  const list = filter === 'All'
    ? designWorks
    : designWorks.filter(w => w.category === filter)

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All'
      ? designWorks.length
      : designWorks.filter(w => w.category === cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <>
      {/* ── Modal ── */}
      {selected && <Modal work={selected} onClose={() => setSelected(null)} />}

      <div className="min-h-screen bg-bg">
        {/* ── Header ── */}
        <header className="sticky top-0 z-40 glass border-b h-16 flex items-center">
          <div className="wrap w-full flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-tx-2 hover:text-tx transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </Link>
            <Divider orientation="vertical" className="h-5" />
            <span className="font-body font-bold text-tx">Design Work</span>
            <Badge variant="accent" className="ml-1">{designWorks.length} works</Badge>
          </div>
        </header>

        <div className="wrap py-16">
          {/* ── Hero ── */}
          <div className="mb-14">
            <span className="sec-label">Design Portfolio</span>
            <h1 className="t-h1 mt-3 mb-4">Design Work</h1>
            <p className="t-body-lg text-tx-2 max-w-xl">
              상세 페이지, 편집 디자인, 영상, UI/UX 등 디자인 작업물을 모아둔 페이지입니다.
            </p>
          </div>

          {/* ── Filter tabs ── */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all',
                  filter === cat
                    ? 'bg-accent text-white border-accent shadow-glow-sm'
                    : 'border-border text-tx-2 hover:border-accent/50 hover:text-tx'
                )}
              >
                {cat}
                <span className={cn(
                  'text-xs font-mono px-1.5 py-0.5 rounded-full',
                  filter === cat ? 'bg-white/20 text-white' : 'bg-surface-2 text-tx-3'
                )}>
                  {counts[cat]}
                </span>
              </button>
            ))}
          </div>

          {/* ── Grid ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map(work => (
              <WorkCard key={work.id} work={work} onClick={() => setSelected(work)} />
            ))}
          </div>

          {list.length === 0 && (
            <div className="py-24 text-center text-tx-3">
              <p className="t-body">해당 카테고리에 작업물이 없습니다.</p>
            </div>
          )}

          {/* ── Footer ── */}
          <div className="mt-20 pt-10 border-t border-border flex items-center justify-between">
            <p className="t-caption text-tx-3">Design Work — {new Date().getFullYear()}</p>
            <Link to="/">
              <Button variant="ghost" size="sm" icon={<ArrowLeft size={14} />}>
                Back to portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Modal keyframe styles ── */}
      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </>
  )
}

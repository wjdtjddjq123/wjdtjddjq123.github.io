import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, ExternalLink, Github, Lock, Mail, MapPin, Send } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import PortfolioLayout from '@/components/templates/PortfolioLayout'
import { Button, Badge, Tag } from '@/components/atoms'
import { Input, Textarea } from '@/components/atoms'
import { projects, skillGroups, experiences } from '@/data/portfolio'
import { heroAnimation, revealOnScroll, revealCards, animateSkillBar, countUp } from '@/animations/gsap'
import { cn } from '@/utils/cn'

gsap.registerPlugin(ScrollTrigger)

const projectImages: Record<number, string> = {
  1: 'img/guest08.png',
  2: 'img/CMMS.png',
  3: 'img/project-design-system.svg',
  4: 'img/project-plantpulse.svg',
  5: 'img/our-neighborhood-regeneration.png',
  6: 'img/urban-regeneration-main.png',
}

const internalProjectIds = new Set([1, 2])
const internalCaseIds: Record<number, number> = { 1:9, 2:7 }

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
function Hero() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)

  useEffect(()=>{
    const ctx = gsap.context(()=>{ heroAnimation(ref.current!) }, ref)
    return ()=>ctx.revert()
  },[])

  const handleAnchorClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid bg */}
      <div className="hero-grid absolute inset-0 opacity-[.04]"/>
      {/* Orbs */}
      <div className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full opacity-[.12] blur-[140px] bg-accent pointer-events-none"/>
      <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] rounded-full opacity-[.07] blur-[120px] bg-accent pointer-events-none"/>

      <div className="wrap relative z-10 w-full pt-32 pb-24">
        {/* Badge */}
        <div data-h-badge className="mb-8">
          <Badge variant="accent" dot>{t('hero.available')}</Badge>
        </div>

        {/* Headline */}
        <div data-h-title>
          <h1 className="t-h1 leading-[.9]">
            <span className="block text-tx">{t('hero.role1')}</span>
            <span className="block text-grad">{t('hero.role2')}</span>
          </h1>
        </div>

        {/* Label */}
        <div data-h-sub className="mt-6 flex items-center gap-3">
          <span className="w-10 h-px bg-accent"/>
          <span className="sec-label">{t('hero.greeting')} {t('hero.name')}</span>
        </div>

        {/* Subtitle */}
        <p className="mt-6 t-body-lg text-tx-2 max-w-lg" data-h-sub>
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div data-h-cta className="mt-10 flex flex-wrap gap-4">
          <Button as="a" href="#projects" onClick={(e) => { e.preventDefault(); handleAnchorClick('#projects') }} size="lg" iconRight={<ArrowRight size={18}/>}>{t('hero.cta')}</Button>
          <Button as="a" href="/resume-jeong-seongyeop.pdf" download="resume-jeong-seongyeop.pdf" variant="outline" size="lg">{t('hero.cv')}</Button>
        </div>

        {/* Scroll hint */}
        <div data-h-scroll className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="t-label text-tx-3">scroll</span>
          <div className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-accent rounded-full animate-float"/>
          </div>
        </div>
      </div>
    </section>
  )
}

const mobileImprovements = [
  { title: '홈', problem: '보호자 정보와 주요 기능이 여러 영역에 분산되어 있어 원하는 메뉴를 찾기 어렵고, 첫 화면에서 현재 상태를 파악하기 어려웠습니다.', improvement: '보호자 정보와 핵심 현황을 상단에 배치하고 자주 사용하는 기능을 카드형 메뉴로 통합해, 필요한 정보와 기능에 한 번의 탭으로 접근할 수 있도록 개선했습니다.' },
  { title: '병원비', problem: '병원비 확인 과정이 단계별 안내 중심으로 구성되어 실제 청구 금액과 결제할 항목을 확인하려면 여러 화면을 거쳐야 했습니다.', improvement: '총 병원비와 최근 청구 금액, 결제할 항목을 한 화면에 우선 배치해 사용자가 현재 비용 현황을 빠르게 파악하고 결제로 이어갈 수 있도록 개선했습니다.' },
  { title: '청구내역', problem: '큰 카드가 반복되는 구조로 한 화면에 표시되는 정보량이 적고, 청구 건별 금액과 상태를 비교하기 어려웠습니다.', improvement: '날짜·금액·처리 상태를 동일한 위치에 배치한 리스트 구조로 변경해 정보 탐색 시간을 줄이고 여러 청구 건을 빠르게 비교할 수 있도록 개선했습니다.' },
  { title: '결제내역', problem: '결제 항목별 세부 정보가 모두 펼쳐져 있어 화면이 길어지고, 사용자가 결제 결과를 찾기까지 불필요한 스크롤이 발생했습니다.', improvement: '결제 일자와 금액 중심으로 정보 위계를 재정리하고 내역을 간결한 목록으로 구성해 필요한 결제 정보를 빠르게 확인할 수 있도록 개선했습니다.' },
  { title: '제증명', problem: '발급 절차 안내가 중심이어서 현재 발급 가능한 증명서와 신청 상태를 한눈에 구분하기 어려웠습니다.', improvement: '증명서 종류와 발급 상태를 목록으로 구분하고 주요 신청 버튼을 가까이 배치해 사용자가 필요한 서류를 확인한 뒤 바로 신청할 수 있도록 개선했습니다.' },
  { title: '제증명신청', problem: '신청 항목과 입력 정보가 한 화면에 복잡하게 노출되어 사용자가 작성 순서와 필수 정보를 파악하기 어려웠습니다.', improvement: '증명서 선택부터 신청 정보 입력까지 순서대로 진행하도록 화면 구조를 단순화해 신청 과정의 이해도와 완료 가능성을 높였습니다.' },
  { title: '면회', problem: '면회 대상 정보와 날짜 선택 영역이 분리되어 있어 사용자가 이전 선택 내용을 기억하며 여러 단계를 이동해야 했습니다.', improvement: '면회 대상 정보와 달력, 시간 선택을 하나의 흐름으로 통합해 날짜 선택부터 면회 신청까지 맥락이 끊기지 않도록 개선했습니다.' },
  { title: '면회신청내역', problem: '넓은 여백과 불명확한 상태 표현으로 면회 날짜와 승인 여부를 한눈에 파악하기 어려웠습니다.', improvement: '신청 날짜·시간·승인 상태를 한 줄 구조로 정리하고 상태 배지를 적용해 면회 신청 정보를 빠르고 정확하게 확인할 수 있도록 개선했습니다.' },
  { title: '결제카드등록', problem: '카드 등록 안내와 행동 버튼의 우선순위가 모호해 사용자가 어디서 등록을 시작해야 하는지 즉시 판단하기 어려웠습니다.', improvement: '등록 안내를 간결하게 정리하고 결제카드 등록 버튼을 핵심 행동으로 강조해 사용자가 망설임 없이 카드 등록을 시작할 수 있도록 개선했습니다.' },
]

function BeforeAfter() {
  const [active, setActive] = useState(0)
  const item = mobileImprovements[active]
  const imageNumber = String(active + 1).padStart(2, '0')

  return (
    <section className="relative py-24 bg-surface-2/40 border-y border-border" aria-labelledby="mobile-improvement-title">
      <div className="wrap">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="sec-label mb-4">MOBILE UX IMPROVEMENT</p>
            <h2 id="mobile-improvement-title" className="t-h2 mb-4">더 빠르게 찾고, 더 쉽게 이해하도록</h2>
            <p className="t-body-lg text-tx-2 max-w-2xl">기존 화면의 복잡한 정보 구조를 사용 목적 중심으로 재설계했습니다. 화면별 Before &amp; After를 직접 비교해 보세요.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex">
            {['탐색 단계 축소', '상태 가시성 강화', '일관된 사용 흐름'].map(label => (
              <span key={label} className="px-3 py-2 rounded-full border border-accent/20 bg-accent/5 text-xs font-medium text-accent text-center">{label}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-7" role="tablist" aria-label="개선 화면 선택">
          {mobileImprovements.map((improvement, index) => (
            <button
              key={improvement.title}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={cn(
                'shrink-0 px-4 py-2.5 rounded-full border text-sm font-medium transition-all',
                active === index ? 'bg-accent border-accent text-white shadow-glow-sm' : 'bg-surface border-border text-tx-2 hover:border-accent/40 hover:text-tx'
              )}
            >
              {String(index + 1).padStart(2, '0')}. {improvement.title}
            </button>
          ))}
        </div>

        <div className="grid xl:grid-cols-[minmax(0,1fr)_340px] gap-7 items-stretch">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'BEFORE', src: `/img/bf${imageNumber}.png`, tone: 'text-tx-3 bg-surface-2' },
              { label: 'AFTER', src: `/img/af${imageNumber}.png`, tone: 'text-accent bg-accent/10' },
            ].map(image => (
              <figure key={image.label} className="rounded-2xl border border-border bg-surface overflow-hidden">
                <figcaption className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold tracking-wider', image.tone)}>{image.label}</span>
                  <span className="text-xs text-tx-3">{item.title}</span>
                </figcaption>
                <div className="h-[540px] p-5 bg-surface-2/40 flex items-start justify-center overflow-hidden">
                  <div className="h-full aspect-[375/760] max-w-full overflow-hidden rounded-xl border border-border bg-white drop-shadow-xl">
                    <img src={image.src} alt={`${item.title} ${image.label.toLowerCase()} 화면`} className="w-full h-full object-cover object-top" />
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <aside className="rounded-2xl border border-border bg-surface p-7 flex flex-col justify-between">
            <div>
              <span className="font-mono text-sm text-accent">{String(active + 1).padStart(2, '0')} / {String(mobileImprovements.length).padStart(2, '0')}</span>
              <h3 className="font-display text-3xl font-bold text-tx mt-4 mb-3">{item.title}</h3>
              <div className="mb-7">
                <p className="t-label text-tx-3 mb-2">기존 화면의 문제점</p>
                <p className="t-body text-tx-2 leading-relaxed">{item.problem}</p>
              </div>
              <div className="p-5 rounded-xl border border-accent/20 bg-accent/5">
                <p className="t-label text-accent mb-2">UX 사용성 개선</p>
                <p className="t-body text-tx leading-relaxed">{item.improvement}</p>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-border space-y-3">
              {['정보 우선순위 재정의', '핵심 행동 접근성 향상', '모바일 탐색 패턴 통일'].map(point => (
                <div key={point} className="flex items-center gap-3 text-sm text-tx-2">
                  <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0"><Check size={14} /></span>
                  {point}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}


function About() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)

  useEffect(()=>{
    if (!ref.current) return
    const ctx = gsap.context(()=>{
      const els = ref.current!.querySelectorAll('.rv')
      revealOnScroll(Array.from(els))
      ref.current!.querySelectorAll('[data-count]').forEach(el=>{
        countUp(el, +el.getAttribute('data-count')!, el.getAttribute('data-suf')||'')
      })
    }, ref)
    return ()=>ctx.revert()
  },[])

  const stats = [
    { v:4, suf:'+', label:t('about.exp') },
    { v:9,  suf:'',  label:t('about.proj') },
    { v:6,  suf:'',  label:t('about.clients') },
  ]

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="wrap">
        <p className="rv sec-label mb-4">{t('about.label')}</p>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="rv t-h2 mb-8 whitespace-pre-line text-balance">{t('about.title')}</h2>
            <p className="rv t-body-lg text-tx-2 mb-4">{t('about.bio1')}</p>
            <p className="rv t-body text-tx-2 mb-8">{t('about.bio2')}</p>
            <div className="rv flex items-center gap-2 text-tx-2 text-sm">
              <MapPin size={15} className="text-accent shrink-0"/>
              <span>{t('about.loc')}</span>
            </div>
          </div>
          <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((s,i)=>(
                <div key={i} className="rv text-center p-6 rounded-2xl border border-border bg-surface">
                  <div className="font-display text-4xl font-bold text-tx mb-1">
                    <span data-count={s.v} data-suf={s.suf}>0{s.suf}</span>
                  </div>
                  <div className="t-label text-tx-3">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Experience timeline */}
            <div className="rv space-y-4">
              {experiences.slice(0,3).map((e,i)=>(
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-surface hover:border-accent/30 transition-colors">
                  <div className="w-1 rounded-full bg-gradient-to-b from-accent to-transparent shrink-0 mt-1"/>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-tx text-sm">{e.company}</span>
                      <Badge variant="accent">{e.role}</Badge>
                      <span className="t-label text-tx-3 ml-auto">{e.period}</span>
                    </div>
                    <p className="text-sm text-tx-2 mt-1">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════════════ */
function Skills() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)

  useEffect(()=>{
    if (!ref.current) return
    const ctx = gsap.context(()=>{
      revealOnScroll(Array.from(ref.current!.querySelectorAll('.rv')))
      ref.current!.querySelectorAll('[data-pct]').forEach(el=>{
        animateSkillBar(el, +el.getAttribute('data-pct')!)
      })
    }, ref)
    return ()=>ctx.revert()
  },[])

  return (
    <section id="skills" ref={ref} className="py-32 bg-surface-2/40">
      <div className="wrap">
        <p className="rv sec-label mb-4">{t('skills.label')}</p>
        <h2 className="rv t-h2 mb-4">{t('skills.title')}</h2>
        <p className="rv t-body-lg text-tx-2 mb-14 max-w-lg">{t('skills.sub')}</p>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillGroups.map(g=>(
            <div key={g.category} className="rv p-6 rounded-2xl border border-border bg-surface hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">{g.icon}</span>
                <span className="sec-label">{g.category}</span>
              </div>
              <div className="space-y-4">
                {g.skills.map(s=>(
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-tx font-medium">{s.name}</span>
                      <span className="text-tx-3 font-mono">{s.pct}%</span>
                    </div>
                    <div className="h-1 bg-border rounded-full overflow-hidden">
                      <div className="skill-bar-fill rounded-full" data-pct={s.pct}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════ */
function Projects() {
  const { t } = useTranslation()
  const ref   = useRef<HTMLElement>(null)
  const cards = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('All')

  const cats = ['All', ...new Set(projects.map(p=>p.category))]
  const list = filter==='All' ? projects : projects.filter(p=>p.category===filter)

  useEffect(()=>{
    if (!ref.current) return
    const ctx = gsap.context(()=>{ revealOnScroll(Array.from(ref.current!.querySelectorAll('.rv'))) }, ref)
    return ()=>ctx.revert()
  },[])

  useEffect(()=>{
    if (!cards.current) return
    revealCards(Array.from(cards.current.querySelectorAll('[data-card]')))
  },[filter])

  return (
    <section id="projects" ref={ref} className="py-32">
      <div className="wrap">
        <p className="rv sec-label mb-4">{t('projects.label')}</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="rv t-h2 mb-2">{t('projects.title')}</h2>
            <p className="rv t-body-lg text-tx-2 max-w-md">{t('projects.sub')}</p>
          </div>
          <div className="rv flex flex-wrap gap-2">
            {cats.map(c=>(
              <button key={c} type="button" onClick={()=>setFilter(c)}
                className={cn('px-4 py-2 rounded-full text-sm font-medium border transition-all',
                  filter===c ? 'bg-accent text-white border-accent shadow-glow-sm' : 'border-border text-tx-2 hover:border-accent/50 hover:text-tx')}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div ref={cards} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map(p=>(
            <div key={p.id} data-card
              className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              {/* Card header */}
              <div className={cn('relative h-44 bg-gradient-to-br overflow-hidden', p.color)}>
                <img src={projectImages[p.id]} alt={`${p.title} preview`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge variant="accent" className="absolute bottom-4 left-4 bg-bg/80 backdrop-blur-sm">{p.category}</Badge>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-body font-bold text-sm text-tx leading-snug">{p.title}</h3>
                  <span className="t-label text-tx-3 shrink-0">{p.year}</span>
                </div>
                <p className="text-sm text-tx-2 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(tg=>(
                    <span key={tg} className="px-2.5 py-0.5 text-xs font-mono rounded-full border border-border text-tx-3 bg-surface-2">{tg}</span>
                  ))}
                </div>
                {internalProjectIds.has(p.id) ? (
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="default" className="gap-1"><Lock size={10}/>Internal System</Badge>
                    <Link to={`/design-work?work=${internalCaseIds[p.id]}`}>
                      <Button variant="ghost" size="xs" iconRight={<ArrowRight size={13}/>}>View Case</Button>
                    </Link>
                  </div>
                ) : (
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="xs" iconRight={<ArrowUpRight size={13}/>}> 
                      {t('projects.case')}
                    </Button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<'idle'|'loading'|'ok'>('idle')
  const [form, setForm] = useState({ name:'', email:'', msg:'' })

  useEffect(()=>{
    if (!ref.current) return
    const ctx = gsap.context(()=>{ revealOnScroll(Array.from(ref.current!.querySelectorAll('.rv'))) }, ref)
    return ()=>ctx.revert()
  },[])

  const submit=(e: React.FormEvent)=>{ e.preventDefault(); setStatus('loading'); setTimeout(()=>{ setStatus('ok'); setForm({name:'',email:'',msg:''}) },1400) }

  return (
    <section id="contact" ref={ref} className="py-32 bg-surface-2/40">
      <div className="wrap">
        <p className="rv sec-label mb-4">{t('contact.label')}</p>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="rv t-h2 mb-6">{t('contact.title')}</h2>
            <p className="rv t-body-lg text-tx-2 mb-10">{t('contact.sub')}</p>
            <div className="rv space-y-3">
              {[
                { icon:Mail,  label:'Email',    val:'wjdtjddjq123@naver.com',     href:'mailto:wjdtjddjq123@naver.com' },
                { icon:MapPin,label:'Location', val:'Busan, Korea',         href:'#' },
                { icon:Github,label:'GitHub',   val:'github.com/wjdtjddjq123  ',href:'https://github.com' },
              ].map(item=>(
                <a key={item.label} href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-accent/40 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    <item.icon size={17}/>
                  </div>
                  <div>
                    <div className="t-label text-tx-3 mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium text-tx">{item.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rv">
            <form onSubmit={submit} className="p-6 rounded-2xl border border-border bg-surface space-y-4">
              {status==='ok'
                ? <div className="py-14 text-center">
                    <div className="w-12 h-12 rounded-full bg-success-50 text-success-700 text-xl flex items-center justify-center mx-auto mb-3">✓</div>
                    <p className="font-medium text-tx">{t('contact.ok')}</p>
                  </div>
                : <>
                    <Input label={t('contact.name')} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} required/>
                    <Input label={t('contact.email')} type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} required/>
                    <Textarea label={t('contact.msg')} value={form.msg} onChange={e=>setForm(p=>({...p,msg:e.target.value}))} required rows={5}/>
                    <Button type="submit" fullWidth size="lg" loading={status==='loading'} iconRight={<Send size={16}/>}>
                      {status==='loading' ? t('contact.sending') : t('contact.send')}
                    </Button>
                  </>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="wrap flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold text-xl text-tx">
          <span className="text-accent">{'<'}</span>JSE<span className="text-accent">{'/>'}</span>
        </span>
        <p className="t-caption text-tx-3">© {new Date().getFullYear()} — Built with React + Vite + Tailwind + GSAP</p>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-tx-3 hover:text-accent transition-colors"><Github size={18}/></a>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <PortfolioLayout>
      <Hero/>
      <BeforeAfter/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
    </PortfolioLayout>
  )
}

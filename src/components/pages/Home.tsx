import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowUpRight, ExternalLink, Github, Mail, MapPin, Send } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import PortfolioLayout from '@/components/templates/PortfolioLayout'
import { Button, Badge, Tag } from '@/components/atoms'
import { Input, Textarea } from '@/components/atoms'
import { projects, skillGroups, experiences } from '@/data/portfolio'
import { heroAnimation, revealOnScroll, revealCards, animateSkillBar, countUp } from '@/animations/gsap'
import { cn } from '@/utils/cn'

gsap.registerPlugin(ScrollTrigger)

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

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[.04]" style={{ backgroundImage:'linear-gradient(rgba(91,142,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(91,142,255,.6) 1px,transparent 1px)', backgroundSize:'72px 72px' }}/>
      {/* Orbs */}
      <div className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full opacity-[.12] blur-[140px] bg-accent pointer-events-none"/>
      <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] rounded-full opacity-[.07] blur-[120px] bg-primary-400 pointer-events-none"/>

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
          <Button as="a" href="#projects" size="lg" iconRight={<ArrowRight size={18}/>}>{t('hero.cta')}</Button>
          <Button as="a" href="#contact" variant="outline" size="lg">{t('hero.cv')}</Button>
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
    { v:6, suf:'+', label:t('about.exp') },
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
        <div className="grid md:grid-cols-3 gap-6">
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
              <div className={cn('h-40 bg-gradient-to-br flex items-end p-5', p.color)}>
                <Badge variant="accent">{p.category}</Badge>
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
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <span className="text-xs text-tx-3 flex-1">{p.client}</span>
                  <Button variant="ghost" size="xs" iconRight={<ArrowUpRight size={13}/>}>{t('projects.case')}</Button>
                </div>
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
                { icon:MapPin,label:'Location', val:'changwon, Korea',       href:'#' },
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
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
    </PortfolioLayout>
  )
}

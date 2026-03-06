import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

/* ── Hero entrance timeline ─────────────────────────── */
export function heroAnimation(container: HTMLElement) {
  // gsap.fromTo 사용 — 시작/끝 상태를 GSAP이 완전히 제어
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  const badge  = container.querySelector('[data-h-badge]')
  const title  = container.querySelector('[data-h-title]')
  const subs   = container.querySelectorAll('[data-h-sub]')
  const cta    = container.querySelector('[data-h-cta]')
  const scroll = container.querySelector('[data-h-scroll]')

  if (badge)  tl.fromTo(badge,  { opacity:0, y:16 }, { opacity:1, y:0, duration:.5 })
  if (title)  tl.fromTo(title,  { opacity:0, y:60 }, { opacity:1, y:0, duration:.8 }, '-=.2')
  subs.forEach(el => tl.fromTo(el, { opacity:0, y:24 }, { opacity:1, y:0, duration:.6 }, '-=.4'))
  if (cta)    tl.fromTo(cta,    { opacity:0, y:16 }, { opacity:1, y:0, duration:.5 }, '-=.3')
  if (scroll) tl.fromTo(scroll, { opacity:0 },        { opacity:1, duration:.5 },        '-=.2')

  return tl
}

/* ── Generic scroll reveal ──────────────────────────── */
export function revealOnScroll(els: Element[], stagger = .08) {
  els.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: .75, ease: 'power3.out', delay: i * stagger,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  })
}

/* ── Project cards stagger ──────────────────────────── */
export function revealCards(cards: Element[]) {
  if (!cards.length) return
  gsap.fromTo(
    cards,
    { opacity: 0, y: 50, scale: .97 },
    {
      opacity: 1, y: 0, scale: 1, duration: .65, ease: 'power3.out', stagger: .1,
      scrollTrigger: { trigger: cards[0]?.parentElement ?? cards[0], start: 'top 80%', once: true },
    }
  )
}

/* ── Skill bar fill ─────────────────────────────────── */
export function animateSkillBar(bar: Element, pct: number) {
  gsap.fromTo(
    bar,
    { width: '0%' },
    {
      width: `${pct}%`, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
    }
  )
}

/* ── Counter ────────────────────────────────────────── */
export function countUp(el: Element, end: number, suffix = '') {
  const obj = { v: 0 }
  gsap.to(obj, {
    v: end, duration: 1.6, ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(obj.v) + suffix },
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  })
}

/* ── Parallax ───────────────────────────────────────── */
export function parallax(el: Element, strength = .25) {
  gsap.to(el, {
    yPercent: -30 * strength, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
  })
}

/* ── Magnetic hover ─────────────────────────────────── */
export function magnetic(el: HTMLElement) {
  el.addEventListener('mousemove', (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .3, duration: .4, ease: 'power3.out' })
  })
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' })
  })
}

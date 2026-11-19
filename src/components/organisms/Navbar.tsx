import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Moon, Sun, Globe, Menu, X, LayoutDashboard, Palette, Brush } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils/cn'

const accentOptions = [
  { name:'Blue',    accent:'222 100% 68%', accent2:'222 78% 58%', accent3:'215 100% 74%' },
  { name:'Violet',  accent:'263 83% 65%',  accent2:'263 70% 54%', accent3:'263 92% 76%' },
  { name:'Emerald', accent:'160 84% 39%',  accent2:'160 84% 32%', accent3:'158 64% 52%' },
  { name:'Rose',    accent:'347 77% 60%',  accent2:'347 70% 50%', accent3:'350 89% 72%' },
  { name:'Orange',  accent:'25 95% 53%',   accent2:'21 90% 48%',  accent3:'31 97% 65%' },
] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { toggle, isDark } = useTheme()
  const loc = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [accentName, setAccentName] = useState(() => localStorage.getItem('pf-accent') ?? 'Blue')
  const isHome = loc.pathname === '/' || loc.pathname === ''

  useEffect(()=>{
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const selected = accentOptions.find(option => option.name === accentName) ?? accentOptions[0]
    const root = document.documentElement
    root.style.setProperty('--accent', selected.accent)
    root.style.setProperty('--accent-2', selected.accent2)
    root.style.setProperty('--accent-3', selected.accent3)
    localStorage.setItem('pf-accent', selected.name)
  }, [accentName])

  const anchorLinks = isHome
    ? [
        { href:'#about',    label: t('nav.about') },
        { href:'#skills',   label: t('nav.skills') },
        { href:'#projects', label: t('nav.projects') },
        { href:'#contact',  label: t('nav.contact') },
      ]
    : []

  const handleAnchorClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled || !isHome ? 'glass border-b py-3 shadow-sm' : 'bg-transparent py-5'
      )}>
        <nav className="wrap flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="font-display font-bold text-xl text-tx tracking-tight shrink-0">
            <span className="text-accent">{'<'}</span>JSE<span className="text-accent">{'/>'}</span>
          </Link>

          {/* Desktop — anchor links (home only) */}
          {anchorLinks.length > 0 && (
            <ul className="hidden md:flex items-center gap-1">
              {anchorLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href}
                    onClick={(e) => { e.preventDefault(); handleAnchorClick(l.href) }}
                    className="px-4 py-2 text-sm font-medium text-tx-2 hover:text-tx transition-colors rounded-xl hover:bg-surface-2">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Desktop — right controls */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Lang toggle */}
            <button type="button"
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ko' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-tx-2 hover:text-tx rounded-xl hover:bg-surface-2 transition-all">
              <Globe size={13} />
              {i18n.language === 'en' ? 'KO' : 'EN'}
            </button>

            {/* Accent color palette */}
            <div className="relative">
              <button type="button"
                onClick={() => setPaletteOpen(value => !value)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-tx-2 transition-all hover:bg-surface-2 hover:text-tx"
                aria-label="Choose main color"
                aria-expanded={paletteOpen}>
                <span className="h-3.5 w-3.5 rounded-full bg-accent shadow-glow-sm" />
              </button>
              {paletteOpen && (
                <div className="absolute right-0 top-full mt-2 flex items-center gap-2 rounded-2xl border border-border bg-surface p-3 shadow-xl">
                  {accentOptions.map(option => (
                    <button key={option.name} type="button"
                      onClick={() => { setAccentName(option.name); setPaletteOpen(false) }}
                      className={cn(
                        'h-6 w-6 rounded-full border-2 transition-transform hover:scale-110',
                        accentName === option.name ? 'border-tx scale-110' : 'border-transparent',
                      )}
                      style={{ backgroundColor:`hsl(${option.accent})` }}
                      aria-label={`Use ${option.name} main color`}
                      title={option.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button type="button" onClick={toggle}
              className={cn(
                'relative w-14 h-7 rounded-full border transition-all duration-300 px-1 flex items-center',
                isDark ? 'bg-accent/20 border-accent/40' : 'bg-neutral-100 border-neutral-200'
              )}
              aria-label="Toggle theme">
              <span className={cn(
                'absolute w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm',
                isDark
                  ? 'translate-x-7 bg-accent text-white'
                  : 'translate-x-0 bg-white text-neutral-500 border border-neutral-200'
              )}>
                {isDark ? <Moon size={10} /> : <Sun size={10} />}
              </span>
            </button>

            {/* Design Work */}
            <Link to="/design-work"
              className={cn(
                'hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl border transition-all',
                loc.pathname === '/design-work'
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-border text-tx-2 hover:border-accent hover:text-tx'
              )}>
              <Brush size={14} />
              Design Work
            </Link>

            {/* Design System */}
            <Link to="/design-system"
              className={cn(
                'hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl border transition-all',
                loc.pathname === '/design-system'
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-border text-tx-2 hover:border-accent hover:text-tx'
              )}>
              <Palette size={14} />
              Design System
            </Link>

            {/* Dashboard */}
            <Link to="/dashboard"
              className={cn(
                'hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl border transition-all',
                loc.pathname === '/dashboard'
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-border text-tx-2 hover:border-accent hover:text-tx'
              )}>
              <LayoutDashboard size={14} />
              Dashboard
            </Link>

            {/* Mobile hamburger */}
            <button type="button" className="md:hidden p-2 text-tx-2 hover:text-tx"
              onClick={() => setOpen(o => !o)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 z-40 md:hidden flex flex-col justify-center items-center gap-6',
        'bg-bg/95 backdrop-blur-xl transition-all duration-300',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        {anchorLinks.map(l => (
          <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleAnchorClick(l.href); setOpen(false) }}
            className="font-display text-5xl font-bold text-tx hover:text-accent transition-colors">
            {l.label}
          </a>
        ))}
        <div className="flex gap-3 mt-6">
          <Link to="/design-work" onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-border text-tx-2 font-medium hover:border-accent hover:text-accent transition-all">
            <Brush size={16} /> Design Work
          </Link>
          <Link to="/design-system" onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-border text-tx-2 font-medium hover:border-accent hover:text-accent transition-all">
            <Palette size={16} /> Design System
          </Link>
          <Link to="/dashboard" onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-accent text-white font-medium">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
        </div>
      </div>
    </>
  )
}

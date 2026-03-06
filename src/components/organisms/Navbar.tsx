import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Moon, Sun, Globe, Menu, X, LayoutDashboard, Palette } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils/cn'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { toggle, isDark } = useTheme()
  const loc = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isHome = loc.pathname === '/' || loc.pathname === ''

  useEffect(()=>{
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

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

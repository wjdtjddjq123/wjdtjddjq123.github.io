import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Theme = 'dark'|'light'
interface Ctx { theme:Theme; toggle:()=>void; isDark:boolean }
const ThemeCtx = createContext<Ctx>({ theme:'dark', toggle:()=>{}, isDark:true })

export function ThemeProvider({ children }:{ children:ReactNode }) {
  const [theme, setTheme] = useState<Theme>(()=>{
    const s = localStorage.getItem('pf-theme') as Theme|null
    if (s) return s
    return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'
  })

  useEffect(()=>{
    const h = document.documentElement
    h.classList.toggle('dark',  theme==='dark')
    h.classList.toggle('light', theme==='light')
    localStorage.setItem('pf-theme', theme)
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, toggle:()=>setTheme(t=>t==='dark'?'light':'dark'), isDark:theme==='dark' }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)

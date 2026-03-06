import { useEffect, type ReactNode } from 'react'
import Navbar from '@/components/organisms/Navbar'
import CustomCursor from '@/components/organisms/CustomCursor'

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  useEffect(()=>{
    // Lenis smooth scroll — dynamic import fallback
    let lenis: any
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({ duration:1.2, easing:(t:number)=>Math.min(1,1.001-Math.pow(2,-10*t)) })
        const raf=(t:number)=>{ lenis.raf(t); requestAnimationFrame(raf) }
        requestAnimationFrame(raf)
      } catch {}
    }
    initLenis()
    return ()=> lenis?.destroy()
  },[])

  return (
    <div className="min-h-screen bg-bg text-tx overflow-x-hidden">
      <CustomCursor/>
      <Navbar/>
      <main>{children}</main>
    </div>
  )
}

import { useEffect, type ReactNode } from 'react'
import type Lenis from 'lenis'
import Navbar from '@/components/organisms/Navbar'
import CustomCursor from '@/components/organisms/CustomCursor'

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lenis: Lenis | undefined
    let frameId: number | undefined
    let disposed = false

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        if (disposed) return

        lenis = new Lenis({
          duration: 1.2,
          easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        })

        const renderFrame = (time: number) => {
          lenis?.raf(time)
          frameId = requestAnimationFrame(renderFrame)
        }
        frameId = requestAnimationFrame(renderFrame)
      } catch {
        // Native scrolling remains available when smooth scrolling cannot load.
      }
    }

    void initLenis()

    return () => {
      disposed = true
      if (frameId !== undefined) cancelAnimationFrame(frameId)
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg text-tx overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const d = dot.current, r = ring.current
    if (!d||!r) return
    let mx=0,my=0,rx=0,ry=0

    const move=(e:MouseEvent)=>{
      mx=e.clientX; my=e.clientY
      gsap.to(d,{ x:mx, y:my, duration:.05, ease:'none' })
    }
    const tick=()=>{
      rx+=(mx-rx)*.11; ry+=(my-ry)*.11
      gsap.set(r,{ x:rx, y:ry })
      raf=requestAnimationFrame(tick)
    }
    let raf = requestAnimationFrame(tick)

    const addH=(e:Event)=>{ if((e.target as HTMLElement).closest('a,button,[data-hover]')) document.body.classList.add('cursor-hover') }
    const remH=()=>document.body.classList.remove('cursor-hover')

    window.addEventListener('mousemove',move)
    document.addEventListener('mouseover',addH)
    document.addEventListener('mouseout',remH)
    return()=>{
      window.removeEventListener('mousemove',move)
      document.removeEventListener('mouseover',addH)
      document.removeEventListener('mouseout',remH)
      cancelAnimationFrame(raf)
    }
  },[])

  return (
    <>
      <div ref={dot}  className="cursor-dot"/>
      <div ref={ring} className="cursor-ring"/>
    </>
  )
}

import { useState, useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

/* ── SearchBar ──────────────────────────────────────── */
export function SearchBar({ value, onChange, placeholder='Search…', className, onClear }:
  { value:string; onChange:(v:string)=>void; placeholder?:string; className?:string; onClear?:()=>void }) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <svg className="absolute left-3 w-4 h-4 text-tx-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" strokeWidth="2"/><path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-9 pl-9 pr-8 text-sm rounded-xl bg-surface border border-border text-tx placeholder:text-tx-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"/>
      {value && onClear && (
        <button type="button" onClick={onClear} className="absolute right-3 text-tx-3 hover:text-tx transition-colors leading-none">×</button>
      )}
    </div>
  )
}

/* ── Tabs ───────────────────────────────────────────── */
type TabItem = { label:string; value:string; icon?:ReactNode }
type TabsVariant = 'default'|'pills'|'underline'
const TV = {
  default: { wrap:'flex border-b border-border gap-0', tab:'px-4 py-2.5 text-sm font-medium -mb-px border-b-2 transition-all', active:'text-accent border-accent', inactive:'text-tx-2 border-transparent hover:text-tx' },
  pills:   { wrap:'flex gap-1 p-1 bg-surface-2 rounded-xl', tab:'px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5', active:'bg-surface text-tx shadow-sm', inactive:'text-tx-2 hover:text-tx' },
  underline:{ wrap:'flex gap-6', tab:'relative py-2 text-sm font-medium transition-all', active:'text-tx after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:rounded-full', inactive:'text-tx-2 hover:text-tx' },
}
export function Tabs({ tabs, active, onChange, variant='default', className }:
  { tabs:TabItem[]; active:string; onChange:(v:string)=>void; variant?:TabsVariant; className?:string }) {
  const v = TV[variant]
  return (
    <div className={cn(v.wrap, className)}>
      {tabs.map(t => (
        <button key={t.value} type="button" onClick={()=>onChange(t.value)}
          className={cn(v.tab, active===t.value ? v.active : v.inactive)}>
          {t.icon}{t.label}
        </button>
      ))}
    </div>
  )
}

/* ── Dropdown ───────────────────────────────────────── */
export function Dropdown({ items, value, onChange, placeholder='Select…', className }:
  { items:{label:string;value:string;icon?:ReactNode}[]; value?:string; onChange:(v:string)=>void; placeholder?:string; className?:string }) {
  const [open,setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const sel = items.find(i=>i.value===value)
  useEffect(()=>{
    const h=(e:MouseEvent)=>{ if(ref.current&&!ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown',h); return()=>document.removeEventListener('mousedown',h)
  },[])
  return (
    <div ref={ref} className={cn('relative w-full',className)}>
      <button type="button" onClick={()=>setOpen(o=>!o)}
        className={cn('w-full h-10 px-4 text-sm rounded-xl bg-surface border flex items-center justify-between gap-2 transition-all',
          open?'ring-2 ring-accent/30 border-accent':'border-border hover:border-border-2',
          !sel&&'text-tx-3'
        )}>
        <span>{sel?.label??placeholder}</span>
        <svg className={cn('w-4 h-4 shrink-0 transition-transform',open&&'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface border border-border rounded-xl shadow-lg overflow-hidden py-1">
          {items.map(item=>(
            <li key={item.value}>
              <button type="button" onClick={()=>{onChange(item.value);setOpen(false)}}
                className={cn('w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 transition-colors',
                  item.value===value?'bg-accent/10 text-accent':'text-tx hover:bg-surface-2')}>
                {item.icon}{item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ── Tooltip ─────────────────────────────────────────── */
const TP = { top:'bottom-full left-1/2 -translate-x-1/2 mb-2', bottom:'top-full left-1/2 -translate-x-1/2 mt-2', left:'right-full top-1/2 -translate-y-1/2 mr-2', right:'left-full top-1/2 -translate-y-1/2 ml-2' }
export function Tooltip({ content, children, placement='top', className }:
  { content:string; children:ReactNode; placement?:'top'|'bottom'|'left'|'right'; className?:string }) {
  const [v,setV] = useState(false)
  return (
    <div className="relative inline-flex" onMouseEnter={()=>setV(true)} onMouseLeave={()=>setV(false)}>
      {children}
      {v && <div className={cn('absolute z-50 px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none bg-neutral-900 text-neutral-0 dark:bg-neutral-100 dark:text-neutral-900 shadow-lg', TP[placement], className)}>{content}</div>}
    </div>
  )
}

/* ── CardHeader ──────────────────────────────────────── */
export function CardHeader({ title, subtitle, action, icon, className }:
  { title:string; subtitle?:string; action?:ReactNode; icon?:ReactNode; className?:string }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-5', className)}>
      <div className="flex items-center gap-3">
        {icon && <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">{icon}</div>}
        <div>
          <h3 className="font-body font-semibold text-base text-tx">{title}</h3>
          {subtitle && <p className="text-sm text-tx-3 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

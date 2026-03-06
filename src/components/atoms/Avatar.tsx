import { cn } from '@/utils/cn'

/* ── Avatar ─────────────────────────────────────────── */
type AS = 'xs'|'sm'|'md'|'lg'|'xl'
const ASize: Record<AS,string> = { xs:'w-6 h-6 text-2xs', sm:'w-8 h-8 text-xs', md:'w-10 h-10 text-sm', lg:'w-12 h-12 text-base', xl:'w-16 h-16 text-xl' }
const StatusC = { online:'bg-success-500', offline:'bg-tx-3', away:'bg-warning-500' }
const getInit = (n:string) => n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase()
const getColor = (n:string) => {
  const h = [220,260,190,300,35,340,170][n.charCodeAt(0)%7]
  return `hsl(${h},65%,55%)`
}
export function Avatar({ src, name='?', size='md', status, className }:
  { src?:string; name?:string; size?:AS; status?:'online'|'offline'|'away'; className?:string }) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      <div className={cn('rounded-full overflow-hidden flex items-center justify-center font-mono font-medium text-white', ASize[size])}>
        {src ? <img src={src} alt={name} className="w-full h-full object-cover"/>
             : <span style={{background:getColor(name)}} className="w-full h-full flex items-center justify-center">{getInit(name)}</span>}
      </div>
      {status && <span className={cn('absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg', StatusC[status])}/>}
    </div>
  )
}

/* ── Divider ─────────────────────────────────────────── */
export function Divider({ label, orientation='horizontal', className }:
  { label?:string; orientation?:'horizontal'|'vertical'; className?:string }) {
  if (orientation==='vertical') return <div className={cn('w-px self-stretch bg-border', className)}/>
  if (label) return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex-1 h-px bg-border"/>
      <span className="t-label text-tx-3 shrink-0">{label}</span>
      <div className="flex-1 h-px bg-border"/>
    </div>
  )
  return <div className={cn('w-full h-px bg-border', className)}/>
}

/* ── Loader ──────────────────────────────────────────── */
export function Loader({ size='md', variant='spinner', className }:
  { size?:'sm'|'md'|'lg'; variant?:'spinner'|'dots'|'pulse'; className?:string }) {
  const sp = { sm:'w-4 h-4', md:'w-6 h-6', lg:'w-8 h-8' }
  const dp = { sm:'w-1.5 h-1.5', md:'w-2 h-2', lg:'w-3 h-3' }
  if (variant==='dots') return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {[0,150,300].map(d => <span key={d} className={cn('rounded-full bg-accent animate-pulse', dp[size])} style={{animationDelay:`${d}ms`}}/>)}
    </div>
  )
  if (variant==='pulse') return <div className={cn('rounded-full bg-accent/30 animate-pulse', sp[size], className)}/>
  return (
    <svg className={cn('animate-spin text-accent', sp[size], className)} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  )
}

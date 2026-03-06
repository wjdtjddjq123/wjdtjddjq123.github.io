import { cn } from '@/utils/cn'

/* ── Badge ────────────────────────────────────────────── */
type BV = 'default'|'accent'|'success'|'warning'|'error'|'info'
const BVC: Record<BV,string> = {
  default: 'bg-surface-2 text-tx-2 border-border',
  accent:  'bg-accent/10 text-accent border-accent/30',
  success: 'bg-success-50 text-success-700 border-success-500/30',
  warning: 'bg-warning-50 text-warning-700 border-warning-500/30',
  error:   'bg-error-50   text-error-700   border-error-500/30',
  info:    'bg-info-50    text-info-700    border-info-500/30',
}
export function Badge({ variant='default', dot=false, className, children, ...p }:
  React.HTMLAttributes<HTMLSpanElement>&{variant?:BV;dot?:boolean}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border', BVC[variant], className)} {...p}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0',
        variant==='success'&&'bg-success-500', variant==='warning'&&'bg-warning-500',
        variant==='error'&&'bg-error-500',     variant==='info'&&'bg-info-500',
        variant==='accent'&&'bg-accent',        variant==='default'&&'bg-tx-3'
      )}/>}
      {children}
    </span>
  )
}

/* ── Tag ─────────────────────────────────────────────── */
export function Tag({ className, children, onRemove, ...p }:
  React.HTMLAttributes<HTMLSpanElement>&{onRemove?:()=>void}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20', className)} {...p}>
      {children}
      {onRemove && <button type="button" onClick={onRemove} className="ml-0.5 hover:text-accent-2 transition-colors leading-none">×</button>}
    </span>
  )
}

/* ── Chip ────────────────────────────────────────────── */
export function Chip({ active=false, icon, className, children, ...p }:
  React.ButtonHTMLAttributes<HTMLButtonElement>&{active?:boolean;icon?:React.ReactNode}) {
  return (
    <button type="button" className={cn(
      'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
      active
        ? 'bg-accent text-white border-accent shadow-glow-sm'
        : 'border-border text-tx-2 bg-surface hover:border-accent/50 hover:text-tx',
      className
    )} {...p}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

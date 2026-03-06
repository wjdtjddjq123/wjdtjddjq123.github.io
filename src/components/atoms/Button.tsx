import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary'|'secondary'|'outline'|'ghost'|'danger'
type Size    = 'xs'|'sm'|'md'|'lg'|'xl'

const V: Record<Variant,string> = {
  primary:  'bg-accent text-white hover:bg-accent-2 shadow-glow-sm hover:shadow-glow',
  secondary:'bg-surface-2 text-tx border border-border hover:border-border-2 hover:bg-surface',
  outline:  'border border-border text-tx-2 hover:border-accent hover:text-tx bg-transparent',
  ghost:    'text-tx-2 hover:text-tx hover:bg-surface-2 bg-transparent',
  danger:   'bg-error-500 text-white hover:bg-error-700',
}
const S: Record<Size,string> = {
  xs:'h-7  px-3   text-xs  gap-1.5 rounded',
  sm:'h-9  px-4   text-sm  gap-2   rounded-lg',
  md:'h-10 px-5   text-sm  gap-2   rounded-xl',
  lg:'h-12 px-6   text-base gap-2.5 rounded-xl',
  xl:'h-14 px-8   text-lg  gap-3   rounded-2xl',
}

type BaseProps = { variant?:Variant; size?:Size; loading?:boolean; icon?:React.ReactNode; iconRight?:React.ReactNode; fullWidth?:boolean }
type BtnProps  = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }
type Props = BtnProps | AnchorProps

const base = (variant: Variant, size: Size, fullWidth?: boolean, loading?: boolean, className?: string) =>
  cn('inline-flex items-center justify-center font-body font-medium transition-all duration-200 select-none',
     'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
     'disabled:opacity-50 disabled:pointer-events-none',
     V[variant], S[size], fullWidth&&'w-full', loading&&'pointer-events-none', className)

const Spinner = () => (
  <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
)

const Button = forwardRef<any, Props>(
  ({ variant='primary', size='md', loading, icon, iconRight, fullWidth, className, children, ...rest }, ref) => {
    const cls = base(variant, size, fullWidth, loading, className)
    const content = (
      <>
        {loading ? <Spinner/> : icon && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </>
    )
    if ((rest as AnchorProps).as === 'a') {
      const { as: _, ...aRest } = rest as AnchorProps
      return <a ref={ref} className={cls} {...aRest}>{content}</a>
    }
    const { ...bRest } = rest as BtnProps
    return <button ref={ref} className={cls} disabled={(bRest as any).disabled || loading} {...bRest}>{content}</button>
  }
)
Button.displayName = 'Button'
export default Button

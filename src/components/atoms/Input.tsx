import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; helper?: string; error?: string
  leftIcon?: React.ReactNode; rightIcon?: React.ReactNode
  inputSize?: 'sm'|'md'|'lg'
}
const IS = { sm:'h-8 px-3 text-sm', md:'h-10 px-4 text-sm', lg:'h-12 px-5 text-base' }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper, error, leftIcon, rightIcon, inputSize='md', className, id, ...p }, ref) => {
    const uid = id ?? label?.toLowerCase().replace(/\s+/g,'-')
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label htmlFor={uid} className="t-label text-tx-2">{label}</label>}
        <div className="relative flex items-center">
          {leftIcon && <span className="absolute left-3 text-tx-3 pointer-events-none">{leftIcon}</span>}
          <input ref={ref} id={uid}
            className={cn(
              'w-full rounded-xl bg-surface border font-body transition-all duration-150',
              'text-tx placeholder:text-tx-3',
              'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
              'disabled:opacity-50',
              error ? 'border-error-500' : 'border-border hover:border-border-2',
              IS[inputSize], leftIcon&&'pl-10', rightIcon&&'pr-10', className
            )} {...p}/>
          {rightIcon && <span className="absolute right-3 text-tx-3">{rightIcon}</span>}
        </div>
        {(helper||error) && <p className={cn('text-xs', error?'text-error-500':'text-tx-3')}>{error??helper}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TAProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; helper?: string; error?: string
}
export const Textarea = forwardRef<HTMLTextAreaElement, TAProps>(
  ({ label, helper, error, className, id, ...p }, ref) => {
    const uid = id ?? label?.toLowerCase().replace(/\s+/g,'-')
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label htmlFor={uid} className="t-label text-tx-2">{label}</label>}
        <textarea ref={ref} id={uid} rows={4}
          className={cn(
            'w-full rounded-xl bg-surface border font-body px-4 py-3 text-sm',
            'text-tx placeholder:text-tx-3 resize-y',
            'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
            'transition-all duration-150',
            error ? 'border-error-500' : 'border-border hover:border-border-2',
            className
          )} {...p}/>
        {(helper||error) && <p className={cn('text-xs', error?'text-error-500':'text-tx-3')}>{error??helper}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

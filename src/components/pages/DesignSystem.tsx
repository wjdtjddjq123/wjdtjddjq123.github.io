import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { Button, Badge, Tag, Chip, Input, Textarea, Avatar, Divider, Loader } from '@/components/atoms'
import { Tabs, Tooltip, Dropdown } from '@/components/molecules'
import { cn } from '@/utils/cn'

function Section({ id, title, children }: { id:string; title:string; children:React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 mb-20">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-body font-bold text-2xl text-tx">{title}</h2>
        <div className="flex-1 h-px bg-border"/>
      </div>
      {children}
    </section>
  )
}

function Preview({ title, children, dir='row' }: { title?:string; children:React.ReactNode; dir?:'row'|'col' }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-surface mb-4">
      {title && (
        <div className="px-4 py-2.5 border-b border-border bg-surface-2 flex items-center justify-between">
          <span className="t-label text-tx-3">{title}</span>
          <button type="button" onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)}}
            className="p-1.5 rounded-lg text-tx-3 hover:text-tx hover:bg-surface transition-colors">
            {copied?<Check size={13}/>:<Copy size={13}/>}
          </button>
        </div>
      )}
      <div className={cn('p-8 flex flex-wrap gap-4 bg-surface', dir==='col'&&'flex-col items-start')}>
        {children}
      </div>
    </div>
  )
}

function Swatch({ name, value }: { name:string; value:string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-16 h-16 rounded-xl border border-border shadow-sm" style={{background:value}}/>
      <p className="text-xs font-mono font-medium text-tx">{name}</p>
      <p className="text-xs font-mono text-tx-3">{value}</p>
    </div>
  )
}

export default function DesignSystemPage() {
  const [tab1, setTab1] = useState('a')
  const [tab2, setTab2] = useState('a')
  const [tab3, setTab3] = useState('a')
  const [drop, setDrop] = useState('')

  const colors = [
    { group:'Primary', items:[{ n:'50',  v:'#eef3ff'},{ n:'100',v:'#dce7ff'},{ n:'300',v:'#90adff'},{ n:'500',v:'#5B8EFF'},{ n:'700',v:'#2c42d8'},{ n:'900',v:'#273489'}] },
    { group:'Neutral', items:[{ n:'50',  v:'#f8f9fc'},{ n:'200',v:'#e2e5f0'},{ n:'400',v:'#8e93a8'},{ n:'600',v:'#4a4f63'},{ n:'800',v:'#1e2030'},{ n:'950',v:'#080910'}] },
    { group:'Status',  items:[{ n:'Success',v:'#22c880'},{ n:'Warning',v:'#f59e0b'},{ n:'Error',v:'#ef4444'},{ n:'Info',v:'#3b82f6'}] },
  ]
  const typeScale = [
    { name:'Display',  cls:'t-display', sample:'Display', note:'Bebas Neue, clamp(5rem,14vw,10rem)' },
    { name:'H1',       cls:'t-h1',      sample:'Heading 1', note:'700, clamp(2.8rem,7vw,5.5rem)' },
    { name:'H2',       cls:'t-h2',      sample:'Heading 2', note:'700, clamp(2rem,5vw,3.5rem)' },
    { name:'H3',       cls:'t-h3',      sample:'Heading 3', note:'700, clamp(1.4rem,3vw,2rem)' },
    { name:'H4',       cls:'t-h4',      sample:'Heading 4', note:'600, 1.25rem' },
    { name:'Body LG',  cls:'t-body-lg', sample:'The quick brown fox jumps over the lazy dog', note:'400, 1.125rem' },
    { name:'Body',     cls:'t-body',    sample:'The quick brown fox jumps over the lazy dog', note:'400, 1rem' },
    { name:'Body SM',  cls:'t-body-sm', sample:'The quick brown fox jumps over the lazy dog', note:'400, 0.875rem' },
    { name:'Label',    cls:'t-label',   sample:'SECTION LABEL', note:'Mono, 0.75rem, tracking' },
    { name:'Caption',  cls:'t-caption', sample:'Fine print caption text', note:'0.625rem' },
    { name:'Code',     cls:'t-code',    sample:'const hello = "world"', note:'JetBrains Mono, 0.875rem' },
  ]
  const spacing = [
    { tok:'xs',  px:'4px'  }, { tok:'sm',  px:'8px'  }, { tok:'md',  px:'16px' },
    { tok:'lg',  px:'24px' }, { tok:'xl',  px:'32px' }, { tok:'2xl', px:'48px' },
    { tok:'3xl', px:'64px' }, { tok:'4xl', px:'96px' },
  ]

  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <header className="sticky top-0 z-40 glass border-b h-16 flex items-center">
        <div className="wrap w-full flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-tx-2 hover:text-tx transition-colors">
            <ArrowLeft size={16}/> Back
          </Link>
          <Divider orientation="vertical" className="h-5"/>
          <span className="font-body font-bold text-tx">Design System</span>
          <Badge variant="accent" className="ml-1">v2.0</Badge>
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {['colors','typography','spacing','buttons','badges','inputs','avatars','tabs','cards','loaders'].map(s=>(
              <a key={s} href={`#${s}`} className="px-3 py-1.5 text-xs font-medium text-tx-2 hover:text-accent hover:bg-accent/5 rounded-lg transition-all capitalize">{s}</a>
            ))}
          </div>
        </div>
      </header>

      <div className="wrap py-16">
        {/* Hero */}
        <div className="mb-20">
          <span className="sec-label">Component Library</span>
          <h1 className="t-h1 mt-3 mb-4">Design System</h1>
          <p className="t-body-lg text-tx-2 max-w-xl">Tokens, components, and patterns that power this portfolio.</p>
        </div>

        {/* COLORS */}
        <Section id="colors" title="Color System">
          <p className="t-body text-tx-2 mb-8 max-w-2xl">CSS HSL variables — same base hue, only lightness/saturation shifts between light and dark themes. Accent stays vivid in both modes.</p>
          {/* Semantic tokens */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden mb-10">
            {[
              { n:'--bg',      v:'Dark: hsl(222 47% 6%) | Light: hsl(220 20% 98%)',  p:'#09101F' },
              { n:'--surface', v:'Dark: hsl(222 44% 9%) | Light: hsl(0 0% 100%)',    p:'#0E1628' },
              { n:'--border',  v:'Dark: hsl(222 30% 18%) | Light: hsl(220 16% 90%)', p:'#1E2A44' },
              { n:'--tx',      v:'Dark: hsl(214 30% 95%) | Light: hsl(222 47% 11%)', p:'#EDF1FC' },
              { n:'Accent',    v:'Fixed: #5B8EFF (vivid blue-indigo)',                p:'#5B8EFF' },
            ].map(t=>(
              <div key={t.n} className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0">
                <div className="w-10 h-10 rounded-lg border border-border shrink-0" style={{background:t.p}}/>
                <code className="text-sm font-mono text-accent w-32 shrink-0">{t.n}</code>
                <code className="text-xs font-mono text-tx-2">{t.v}</code>
              </div>
            ))}
          </div>
          {/* Palettes */}
          {colors.map(g=>(
            <div key={g.group} className="mb-8">
              <h3 className="t-h4 mb-4">{g.group}</h3>
              <div className="flex flex-wrap gap-6">
                {g.items.map(i=><Swatch key={i.n} name={i.n} value={i.v}/>)}
              </div>
            </div>
          ))}
        </Section>

        {/* TYPOGRAPHY */}
        <Section id="typography" title="Typography Scale">
          <p className="t-body text-tx-2 mb-8 max-w-2xl">Bebas Neue (display) · Outfit (body) · JetBrains Mono (code)</p>
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            {typeScale.map((t,i)=>(
              <div key={t.name} className={cn('flex items-baseline gap-6 px-6 py-5', i<typeScale.length-1&&'border-b border-border')}>
                <div className="w-24 shrink-0">
                  <p className="t-label text-tx-3">{t.name}</p>
                  <p className="text-xs font-mono text-tx-3 mt-0.5">.{t.cls}</p>
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <span className={cn(t.cls,'truncate block text-tx')}>{t.sample}</span>
                </div>
                <span className="text-xs font-mono text-tx-3 shrink-0 hidden md:block">{t.note}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* SPACING */}
        <Section id="spacing" title="Spacing System (4px grid)">
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-2 border-b border-border">
                <tr>{['Token','Value','Tailwind','Visual'].map(c=><th key={c} className="px-5 py-3 text-left t-label text-tx-3">{c}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {spacing.map(s=>(
                  <tr key={s.tok} className="hover:bg-surface-2/50 transition-colors">
                    <td className="px-5 py-3 font-mono text-sm text-accent">{s.tok}</td>
                    <td className="px-5 py-3 font-mono text-sm text-tx-2">{s.px}</td>
                    <td className="px-5 py-3 font-mono text-xs text-tx-3">p-{s.tok}</td>
                    <td className="px-5 py-3"><div className="h-4 bg-accent/50 rounded" style={{width:s.px}}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* BUTTONS */}
        <Section id="buttons" title="Buttons">
          <Preview title="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Preview>
          <Preview title="Sizes">
            <Button size="xs">XSmall</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">XLarge</Button>
          </Preview>
          <Preview title="States">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button iconRight={<ArrowLeft size={16} className="rotate-180"/>}>With Icon</Button>
          </Preview>
        </Section>

        {/* BADGES */}
        <Section id="badges" title="Badges & Tags">
          <Preview title="Badge variants">
            <Badge>Default</Badge>
            <Badge variant="accent" dot>Accent</Badge>
            <Badge variant="success" dot>Success</Badge>
            <Badge variant="warning" dot>Warning</Badge>
            <Badge variant="error" dot>Error</Badge>
            <Badge variant="info" dot>Info</Badge>
          </Preview>
          <Preview title="Tags & Chips">
            <Tag>Design Systems</Tag>
            <Tag>React</Tag>
            <Chip active>Active</Chip>
            <Chip>Inactive</Chip>
          </Preview>
        </Section>

        {/* INPUTS */}
        <Section id="inputs" title="Form Inputs">
          <div className="grid md:grid-cols-2 gap-4">
            <Preview title="Input" dir="col">
              <Input label="Name" placeholder="Jane Doe"/>
              <Input label="Email" type="email" placeholder="hello@example.com" error="Invalid email"/>
              <Input label="With helper" placeholder="Username" helper="3–20 characters"/>
            </Preview>
            <Preview title="Textarea" dir="col">
              <Textarea label="Message" placeholder="Tell me about your project…"/>
            </Preview>
          </div>
          <Preview title="Dropdown">
            <Dropdown value={drop} onChange={setDrop} placeholder="Select an option…" items={[{label:'React',value:'react'},{label:'TypeScript',value:'ts'},{label:'Tailwind CSS',value:'tw'}]} className="max-w-xs"/>
          </Preview>
        </Section>

        {/* AVATARS */}
        <Section id="avatars" title="Avatars">
          <Preview title="Sizes">
            {(['xs','sm','md','lg','xl'] as const).map(s=>(
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar name="Jane Doe" size={s}/>
                <span className="t-label text-tx-3">{s}</span>
              </div>
            ))}
          </Preview>
          <Preview title="Status">
            <Avatar name="Alice" size="md" status="online"/>
            <Avatar name="Bob" size="md" status="away"/>
            <Avatar name="Carol" size="md" status="offline"/>
          </Preview>
        </Section>

        {/* TABS */}
        <Section id="tabs" title="Tabs">
          {(['default','pills','underline'] as const).map((v,i)=>{
            const state = [tab1,tab2,tab3][i]
            const set   = [setTab1,setTab2,setTab3][i]
            return (
              <div key={v} className="mb-6">
                <p className="t-label text-tx-3 mb-3">{v}</p>
                <Tabs variant={v} active={state} onChange={set}
                  tabs={[{label:'Overview',value:'a'},{label:'Analytics',value:'b'},{label:'Settings',value:'c'}]}/>
              </div>
            )
          })}
        </Section>

        {/* CARDS */}
        <Section id="cards" title="Cards">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-surface">
              <h3 className="font-body font-semibold text-sm text-tx mb-2">Basic Card</h3>
              <p className="t-body-sm text-tx-2">Simple bordered card with surface background.</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface shadow-xl border border-border/50">
              <h3 className="font-body font-semibold text-sm text-tx mb-2">Elevated Card</h3>
              <p className="t-body-sm text-tx-2">Elevated with shadow for visual hierarchy.</p>
            </div>
            <div className="p-5 rounded-2xl grad-border bg-surface shadow-glow-sm">
              <div className="pt-px">
                <h3 className="font-body font-semibold text-sm text-tx mb-2">Gradient Border</h3>
                <p className="t-body-sm text-tx-2">CSS mask gradient border technique.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* LOADERS */}
        <Section id="loaders" title="Loaders">
          <Preview title="Variants">
            {(['spinner','dots','pulse'] as const).map(v=>(
              <div key={v} className="flex flex-col items-center gap-3">
                <Loader variant={v} size="md"/>
                <span className="t-label text-tx-3">{v}</span>
              </div>
            ))}
          </Preview>
        </Section>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-border flex items-center justify-between">
          <p className="t-caption text-tx-3">Portfolio Design System v2.0 — React + Vite + Tailwind CSS</p>
          <Link to="/"><Button variant="ghost" size="sm" icon={<ArrowLeft size={14}/>}>Back to portfolio</Button></Link>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, BarChart2, FolderOpen, MessageSquare,
  Settings, Home, Bell, TrendingUp, TrendingDown,
  Rocket, GitMerge, GitCommit, Eye, MessageCircle,
  ChevronLeft, ChevronRight, MoreHorizontal,
} from 'lucide-react'
import { Avatar, Badge, Button, Chip, Loader } from '@/components/atoms'
import { SearchBar } from '@/components/molecules'
import { cn } from '@/utils/cn'

/* ── Data ───────────────────────────────────────────── */
const stats = [
  { label:'Total Revenue',  val:'₩142.8M', chg:+12.4, icon:'💰', c:'text-success-700 bg-success-50' },
  { label:'Active Users',   val:'8,429',   chg:+5.2,  icon:'👥', c:'text-info-700 bg-info-50'       },
  { label:'Live Projects',  val:'24',      chg:+3,    icon:'🚀', c:'text-accent bg-accent/10'        },
  { label:'Perf Score',     val:'97/100',  chg:+2.1,  icon:'⚡', c:'text-warning-700 bg-warning-50'  },
]
const activities = [
  { user:'Alice',  action:'Deployed v2.4.0 to production', time:'2m',  type:'deploy'  },
  { user:'Bob',    action:'Merged PR #482 — dark mode',     time:'14m', type:'merge'   },
  { user:'You',    action:'Pushed 3 commits to feature/auth', time:'1h', type:'commit' },
  { user:'Carol',  action:'Reviewed design system docs',    time:'2h',  type:'review'  },
  { user:'David',  action:'Commented on issue #201',        time:'3h',  type:'comment' },
]
const table = [
  { project:'두산에너빌리티 게스트하우스', status:'active',    tech:['JSP','Java'],     pct:78, due:'Jun 12' },
  { project:'사내 웹 표준 템플릿',         status:'completed', tech:['HTML','CSS'],     pct:100,due:'May 5'  },
  { project:'플랜트펄스 제품사이트',       status:'review',    tech:['JavaScript'],     pct:90, due:'Mar 30' },
  { project:'우리동네재생정보',            status:'paused',    tech:['ArcGIS','JS'],    pct:45, due:'Apr 20' },
  { project:'도시종합정보체계',            status:'completed', tech:['JSP','Java'],     pct:100,due:'Jul 10' },
]
const navItems = [
  { id:'overview',  label:'Overview',  Icon:LayoutDashboard, href:'/dashboard' },
  { id:'analytics', label:'Analytics', Icon:BarChart2,        href:'#' },
  { id:'projects',  label:'Projects',  Icon:FolderOpen,       href:'#', badge:3 },
  { id:'messages',  label:'Messages',  Icon:MessageSquare,    href:'#', badge:4 },
  { id:'settings',  label:'Settings',  Icon:Settings,         href:'#' },
]
const ActivityIcon: Record<string,{I:any;c:string}> = {
  deploy:  { I:Rocket,        c:'text-success-700 bg-success-50' },
  merge:   { I:GitMerge,      c:'text-accent bg-accent/10'       },
  commit:  { I:GitCommit,     c:'text-info-700 bg-info-50'       },
  review:  { I:Eye,           c:'text-warning-700 bg-warning-50' },
  comment: { I:MessageCircle, c:'text-tx-2 bg-surface-2'         },
}
const StatusV: Record<string, 'accent'|'success'|'warning'|'info'|'default'> = {
  active:'accent', completed:'success', paused:'warning', review:'info',
}

/* ── Sidebar ────────────────────────────────────────── */
function Sidebar({ col, onCol }: { col:boolean; onCol:(v:boolean)=>void }) {
  return (
    <aside className={cn('fixed left-0 top-0 h-full z-40 flex flex-col bg-surface border-r border-border transition-all duration-300', col?'w-[68px]':'w-[248px]')}>
      {/* Logo */}
      <div className={cn('h-16 flex items-center border-b border-border px-4 shrink-0', col?'justify-center':'justify-between')}>
        {!col && <Link to="/" className="font-display font-bold text-lg text-tx"><span className="text-accent">{'<'}</span>YN<span className="text-accent">{'/>'}</span></Link>}
        <button type="button" onClick={()=>onCol(!col)}
          className="w-7 h-7 rounded-lg border border-border bg-surface-2 flex items-center justify-center text-tx-3 hover:text-tx hover:bg-surface hover:border-border-2 transition-all">
          {col ? <ChevronRight size={13}/> : <ChevronLeft size={13}/>}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-none">
        {navItems.map(item=>(
          <Link key={item.id} to={item.href}
            className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all group relative',
              col?'justify-center':'',
              item.id==='overview'?'bg-accent/10 text-accent':'text-tx-2 hover:bg-surface-2 hover:text-tx')}>
            <item.Icon size={18} className="shrink-0"/>
            {!col && <span className="text-sm font-medium">{item.label}</span>}
            {!col && item.badge && <span className="ml-auto text-xs bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">{item.badge}</span>}
            {col && <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-neutral-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">{item.label}</div>}
          </Link>
        ))}
        <div className="h-px bg-border my-2"/>
        <Link to="/" className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-tx-2 hover:bg-surface-2 hover:text-tx', col?'justify-center':'')}>
          <Home size={18} className="shrink-0"/>
          {!col && <span className="text-sm font-medium">Portfolio</span>}
        </Link>
      </nav>

      {/* User */}
      <div className={cn('p-3 border-t border-border', col?'flex justify-center':'')}>
        <div className={cn('flex items-center gap-3 p-2 rounded-xl hover:bg-surface-2 cursor-pointer transition-colors', col&&'justify-center')}>
          <Avatar name="Your Name" size="sm" status="online"/>
          {!col && <div className="flex-1 min-w-0"><div className="text-sm font-medium text-tx truncate">Your Name</div><div className="text-xs text-tx-3 truncate">Admin</div></div>}
        </div>
      </div>
    </aside>
  )
}

/* ── Chart widget ───────────────────────────────────── */
function ChartWidget({ title, sub }: { title:string; sub?:string }) {
  const bars = [38,62,48,75,55,88,68,82,58,95,72,85]
  return (
    <div className="p-5 rounded-2xl border border-border bg-surface h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-body font-semibold text-sm text-tx">{title}</h3>
          {sub && <p className="text-xs text-tx-3 mt-0.5">{sub}</p>}
        </div>
        <button type="button" className="p-1.5 rounded-lg text-tx-3 hover:text-tx hover:bg-surface-2 transition-colors"><MoreHorizontal size={15}/></button>
      </div>
      <div className="flex items-end gap-1.5 h-32">
        {bars.map((h,i)=>(
          <div key={i} className="flex-1 rounded-t-sm transition-all hover:opacity-100" style={{ height:`${h}%`, background:'linear-gradient(to top, #5B8EFF, rgba(91,142,255,.3))', opacity:.5+i/bars.length*.5 }}/>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'].map(m=>(
          <span key={m} className="text-[9px] font-mono text-tx-3">{m.replace('월','')}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Dashboard Page ─────────────────────────────────── */
export default function DashboardPage() {
  const [col, setCol] = useState(false)
  const [q, setQ] = useState('')

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar col={col} onCol={setCol}/>

      <div className="transition-all duration-300" style={{ marginLeft: col?68:248 }}>
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-30 flex items-center px-6 gap-4">
          <div className="flex-1">
            <SearchBar value={q} onChange={setQ} onClear={()=>setQ('')} placeholder="Search…" className="max-w-sm"/>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button type="button" className="relative p-2 rounded-xl text-tx-2 hover:text-tx hover:bg-surface-2 transition-colors">
              <Bell size={18}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent"/>
            </button>
            <Avatar name="Your Name" size="sm" status="online"/>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="sec-label mb-1 text-accent">Welcome back 👋</p>
              <h1 className="font-body font-bold text-3xl text-tx">Dashboard</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Export</Button>
              <Button size="sm">+ New Project</Button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s,i)=>(
              <div key={i} className="p-5 rounded-2xl border border-border bg-surface hover:border-accent/20 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="t-label text-tx-3 mb-1">{s.label}</p>
                    <p className="font-body font-bold text-2xl text-tx">{s.val}</p>
                  </div>
                  <span className={cn('text-xl w-10 h-10 rounded-xl flex items-center justify-center', s.c)}>{s.icon}</span>
                </div>
                <div className={cn('flex items-center gap-1.5 text-xs font-mono font-medium', s.chg>0?'text-success-700':'text-error-500')}>
                  {s.chg>0 ? <TrendingUp size={13}/> : <TrendingDown size={13}/>}
                  {s.chg>0?'+':''}{s.chg}% vs last month
                </div>
              </div>
            ))}
          </div>

          {/* Chart + Activity */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ChartWidget title="Revenue Overview" sub="Monthly performance 2024"/>
            </div>
            {/* Activity feed */}
            <div className="p-5 rounded-2xl border border-border bg-surface">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-body font-semibold text-sm text-tx">Recent Activity</h3>
                <Button variant="ghost" size="xs">All</Button>
              </div>
              <div className="space-y-4">
                {activities.map((a,i)=>{
                  const { I, c } = ActivityIcon[a.type]
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', c)}>
                        <I size={14}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-tx"><span className="font-medium">{a.user}</span> <span className="text-tx-2">{a.action}</span></p>
                        <p className="text-xs text-tx-3 mt-0.5">{a.time} ago</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-body font-semibold text-sm text-tx">Project Overview</h3>
              <Button variant="outline" size="xs">Export</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-surface-2/50">
                    {['Project','Status','Tech','Progress','Due'].map(c=>(
                      <th key={c} className="px-5 py-3 text-left t-label text-tx-3">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {table.map((r,i)=>(
                    <tr key={i} className="hover:bg-surface-2/50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-medium text-tx">{r.project}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant={StatusV[r.status]} dot className="capitalize">{r.status}</Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {r.tech.map(t=>(
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-border text-tx-3 font-mono bg-surface-2">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width:`${r.pct}%`, background: r.pct===100 ? '#5B8EFF' : 'linear-gradient(90deg,#5B8EFF,rgba(91,142,255,.5))'}}/>
                          </div>
                          <span className="text-xs font-mono text-tx-3">{r.pct}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-mono text-tx-2">{r.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Component showcase strip */}
          <div className="p-5 rounded-2xl border border-dashed border-border-2 bg-surface-2/20">
            <p className="t-label text-tx-3 mb-4">UI COMPONENTS SHOWCASE</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">Secondary</Button>
              <Button size="sm" variant="outline">Outline</Button>
              <Button size="sm" variant="ghost">Ghost</Button>
              <Badge variant="accent" dot>Active</Badge>
              <Badge variant="success" dot>Success</Badge>
              <Badge variant="warning" dot>Warning</Badge>
              <Badge variant="error" dot>Error</Badge>
              <Chip active>React</Chip>
              <Chip>TypeScript</Chip>
              <Avatar name="Alice" size="sm"/>
              <Avatar name="Bob" size="sm" status="online"/>
              <Loader size="sm"/>
              <Loader size="sm" variant="dots"/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

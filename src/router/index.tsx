import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage      from '@/components/pages/Home'
import DashboardPage from '@/components/pages/Dashboard'
import DesignSystem  from '@/components/pages/DesignSystem'

// HashRouter 사용 — GitHub Pages SPA 라우팅 호환
// URL: yourname.github.io/portfolio/#/dashboard
export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"              element={<HomePage/>} />
        <Route path="/dashboard"     element={<DashboardPage/>} />
        <Route path="/design-system" element={<DesignSystem/>} />
      </Routes>
    </HashRouter>
  )
}

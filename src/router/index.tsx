import { HashRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage      from '@/components/pages/Home'
import DashboardPage from '@/components/pages/Dashboard'
import DesignSystem  from '@/components/pages/DesignSystem'
import DesignWork    from '@/components/pages/DesignWork'

// HashRouter 사용 — GitHub Pages SPA 라우팅 호환
export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"              element={<HomePage/>} />
        <Route path="/dashboard"     element={<DashboardPage/>} />
        <Route path="/dashboard/:section" element={<DashboardPage/>} />
        <Route path="/design-system" element={<DesignSystem/>} />
        <Route path="/design-system/:section" element={<DesignSystem/>} />
        <Route path="/design-work"   element={<DesignWork/>} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

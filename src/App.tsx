import '@/i18n'
import { ThemeProvider } from '@/contexts/ThemeContext'
import AppRouter from '@/router'

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter/>
    </ThemeProvider>
  )
}

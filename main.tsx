import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' // 확장자는 쓰지 않습니다.

const rootElement = document.getElementById('root');

// TypeScript null 체크
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
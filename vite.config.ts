import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 레포 이름으로 변경
  // 예: base: '/portfolio/'
  // 로컬 개발 시: base: '/'
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})

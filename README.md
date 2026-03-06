# Portfolio — React + Vite + TypeScript + Tailwind CSS

## 🚀 로컬 실행

```bash
npm install
npm run dev   # http://localhost:5173/#/
```

## 📄 페이지

| 경로 | 설명 |
|---|---|
| `/#/` | 포트폴리오 메인 (Hero · About · Skills · Projects · Contact) |
| `/#/dashboard` | 관리자 대시보드 UI |
| `/#/design-system` | 컴포넌트 & 디자인 토큰 문서 |

## 🌐 GitHub Pages 배포 방법

### 1단계 — 레포 이름 확인 후 vite.config.ts 수정

```ts
// vite.config.ts
base: '/레포이름/',   // 예: '/portfolio/'
```

### 2단계 — GitHub 레포 생성 후 푸시

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/유저명/레포이름.git
git push -u origin main
```

### 3단계 — GitHub Pages 설정

1. 레포 → **Settings** → **Pages**
2. Source: **GitHub Actions** 선택
3. 자동으로 `.github/workflows/deploy.yml` 실행됨
4. 배포 완료 후 `https://유저명.github.io/레포이름/` 접속

> HashRouter를 사용하므로 URL은 `https://유저명.github.io/portfolio/#/dashboard` 형태입니다.

## 🎨 디자인 토큰

```css
/* Dark (기본) */        /* Light */
--bg:      222 47% 6%   220 20% 98%
--surface: 222 44% 9%   0   0%  100%
--tx:      214 30% 95%  222 47% 11%
Accent: #5B8EFF (고정)
```

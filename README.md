# Portfolio

React, Vite, TypeScript, Tailwind CSS로 만든 UI/UX 디자이너 포트폴리오입니다.

## 실행

```bash
npm ci
npm run dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 명령어

- `npm run dev`: 개발 서버 실행
- `npm run typecheck`: TypeScript 정적 검사
- `npm run build`: 타입 검사 후 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기

## 페이지

- `/#/`: 메인 포트폴리오
- `/#/dashboard`: 대시보드 UI
- `/#/design-system`: 디자인 시스템
- `/#/design-work`: 디자인 작업물

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 GitHub Pages 배포를 실행합니다. 사용자 사이트 저장소(`wjdtjddjq123.github.io`)이므로 Vite의 `base`는 `/`를 사용합니다.

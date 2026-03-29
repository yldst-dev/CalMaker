# CalMaker

CalMaker는 웹에서 바로 달력 레이아웃을 만들고, 이미지를 넣고, 기념일을 표시한 뒤 PNG 저장이나 A4 인쇄까지 할 수 있는 달력 제작 도구입니다. 별도 디자인 툴 없이 브라우저에서 빠르게 결과물을 만들 수 있도록 구성했습니다.

## 주요 기능

- 세로 사진형, 세로 전체형, 가로 사진형, 가로 전체형의 4가지 템플릿 지원
- 월 이동과 연도 변경을 통한 빠른 달력 탐색
- 상단 또는 좌측 이미지 영역에 사용자 이미지 업로드
- 음력 표시 토글 지원
- 날짜 클릭 후 기념일, 휴일명, 빨간날 표시 설정 가능
- PNG 이미지 저장 지원
- A4 인쇄용 출력 지원

## 기술 스택

- React 19
- TypeScript
- Vite
- date-fns
- korean-lunar-calendar
- html2canvas
- lucide-react

## 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 개발 서버 주소를 열면 바로 사용할 수 있습니다.

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉터리에 생성됩니다.

## 미리보기

```bash
npm run preview
```

## Docker 실행

```bash
docker build -t calmaker .
docker run --rm -p 8080:80 calmaker
```

브라우저에서 `http://localhost:8080`으로 접속하면 됩니다.

## Dokploy 배포

Dokploy에서 `Application`을 생성한 뒤 `Build Type`을 `Dockerfile`로 선택하면 됩니다.

- Repository: `https://github.com/yldst-dev/CalMaker`
- Branch: `main`
- Dockerfile Path: `Dockerfile`
- Docker Context Path: `.`
- Port: `80`

이 프로젝트는 멀티 스테이지 Dockerfile로 빌드되며, 최종 산출물 `dist`는 NGINX를 통해 정적 서빙됩니다. SPA 라우팅을 위해 `index.html` fallback도 포함되어 있습니다.

## 사용 방법

1. 상단 네비게이션에서 연도와 월을 이동합니다.
2. 템플릿 버튼으로 원하는 레이아웃을 선택합니다.
3. 사진형 템플릿에서는 이미지 영역을 클릭해 이미지를 업로드합니다.
4. 필요하면 `음력` 체크박스를 켜서 음력 날짜를 함께 표시합니다.
5. 날짜 칸을 클릭해 기념일이나 휴일명을 입력합니다.
6. 완성 후 `Save Image`로 PNG를 저장하거나 `Print A4`로 인쇄합니다.

## 템플릿 설명

- 세로 + 이미지 아이콘: 상단 이미지가 포함된 세로형 달력
- 세로 + 세로 페이지 아이콘: 이미지 없는 세로형 달력
- 가로 + 이미지 아이콘: 좌측 이미지가 포함된 가로형 달력
- 가로 + 가로 페이지 아이콘: 이미지 없는 가로형 달력

## 프로젝트 구조

```text
src/
  components/
    CalendarGrid.tsx
    CalendarLayout.tsx
    Toolbar.tsx
  pages/
    Home.tsx
    ComponentsPage.tsx
  styles/
    calendar.css
  utils/
    date.ts
```

## 참고 사항

- 출력 레이아웃은 A4 비율 기준으로 맞춰져 있습니다.
- PNG 저장은 현재 화면 미리보기를 기준으로 생성됩니다.
- 이미지 없는 템플릿은 달력 본문에 더 많은 공간을 사용합니다.

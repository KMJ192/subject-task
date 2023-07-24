# 과제 제출용 저장소

### 개발 기술 스택

- React
- Typescript
- sass
- recoil

### mocking api 구성

- MSW를 이용한 모의 서버 구성
- src/response_mock/handler.ts 설정
- msw의 rest 이용
- 가상 지연시간을 두어 실제 요청하는 것처럼 보이도록 설정
- src/main.tsx에 mocking api를 사용하도록 설정
- mocking 데이터 추가
  - src/response_mock 폴더 아래 장르 별 json 파일 추가
  - src/response_mock/handler.ts에 추가 된 json 파일 import
  - page(request params)에 맞게 코드 추가
- 스크립트 "yarn start"를 실행하면 기본적으로 MSW로 설정한 mocking api를 요청합니다.
- 서버 API를 설정할 경우 다음과 같은 절차를 따릅니다.
  1. configs/vite-env/env.apiset 파일의 "REPLACE_ADDRESS"를 API 주소로 변경합니다.
  2. "yarn start:api-set"으로 react를 실행합니다.

### 개발 환경에 적용한 라이브러리 선정

- React
  - 입문 당시 타 프레임워크(VueJS)보다 코드 스타일이 Vanilla JS에 가장 비슷하다고 생각하여 React를 선택하여 경력을 쌓았습니다.
  - React를 사용할 경우 지원되는 라이브러리가 많았습니다.
    - React로 경력을 쌓다 보니 사용할 수 있는 관련라이브러리가 많았고 레퍼런스를 쉽게 구할 수 있었습니다.
- Recoil
  - 전역 상태관리를 할 필요가 있었습니다. (hooks 간, 컴포넌트 간 상태 공유)
  - Context API를 이용하여 구현할 수 있겠지만, 보다 더 간단하게 구성할 수 있고 사용법이 간편한 Recoil을 사용하였습니다.

### 실행

- 종속성 설치

```
yarn install
```

- msw 설정
  - public폴더 아래 mockServiceWorker.js 파일을 생성

```
npx msw init public/ --save
```

### 폴더 구조

```
root /
├ configs/vite-env
|  ├ .env.apiset
|  ├ .env.develop
├ public
|  ├ mockServiceWorker.js
|  ├ vite.svg
├ src
|  ├ components
|  |  ├ Arrow
|  |  |  ├ Arrow.tsx
|  |  |  ├ style.module.scss
|  |  ├ Button
|  |  |  ├ Button.tsx
|  |  |  ├ style.module.scss
|  |  ├ ErrorBoundary
|  |  |  ├ ErrorBoundary.tsx
|  |  ├ InfiniteScroll
|  |  |  ├ InfiniteScroll.tsx
|  |  |  ├ style.module.scss
|  |  ├ PageTemplate
|  |  |  ├ PageTemplate.tsx
|  |  |  ├ style.module.scss
|  |  ├ Spinner
|  |  |  ├ Spinner.tsx
|  |  |  ├ style.module.scss
|  |  ├ hooks
|  |  |  ├ useTimeout.ts
|  |  |  ├ useUrlSearchParams.ts
|  |  ├ network
|  |  |  ├ fetcher.ts
|  |  ├ pageContents
|  |  |  ├ RankingContents
|  |  |  |  ├ ListItem
|  |  |  |  |  ├ ListItem.tsx
|  |  |  |  |  ├ style.module.scss
|  |  |  |  ├ RankingContents.tsx
|  |  |  |  ├ style.module.scss
|  |  ├ pages
|  |  |  ├ Error
|  |  |  |  ├ Error.tsx
|  |  |  |  ├ NotFound.tsx
|  |  |  |  ├ style.module.scss
|  |  |  ├ Index
|  |  |  |  ├ Index.tsx
|  |  |  ├ Ranking
|  |  |  |  ├ hooks
|  |  |  |  |  ├ useFilter.ts
|  |  |  |  |  ├ useGetRanking.ts
|  |  |  |  ├ Ranking.tsx
|  |  |  ├ index.ts
|  |  ├ response_mock
|  |  |  |  ├ drama
|  |  |  |  ├ romance
|  |  |  |  ├ browser.ts
|  |  |  |  ├ handlers.ts
|  |  ├ RootRouter
|  |  |  ├ RootRouter.tsx
|  |  |  ├ RouterMap.tsx
|  |  |  ├ url.ts
|  |  ├ store/pages/Ranking
|  |  |  ├ atom.ts
|  |  ├ types
|  |  |  ├ types.ts
|  |  ├ App.tsx
|  |  ├ index.css
|  |  ├ main.tsx
├ .eslintrc.json
├ .gitignore
├ .prettierrc
├ index.html
├ package.json
├ README.md
├ tsconfig.json
├ tsconfig.node.json
├ vite.config.ts
⎿ yarn.lock
```

### git commit message

- 액션: 커밋 내용

- 액션

```
feat: 기능 추가, 삭제, 변경 (코드 수정)
fix: 버그 수정
type: 코드 형식 변경
refactor: 코드 리팩토링
docs: 코드 외 문서의 추가, 삭제, 변경
test: 테스트 코드 추가, 삭제, 변경
build: 빌드 옵션 변경
etc: 위 해당 사항이 없는 모든 변경 사항
```

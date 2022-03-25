# 📑 프로젝트 소개

WANTED & CODESTATES 프리온보딩 코스

2번 개인과제 **넥슨**입니다.

**프로젝트 수행 기간**: 2022.03.21 ~ 2022.03.25

# 🚀 배포링크

https://wanted-codestates-nexon-hatoba29.netlify.app/

<br>

# ✨ 주요 기능

- 홈페이지: 닉네임을 입력하여 개인 전적을 검색할 수 있습니다.
- 개인 전적 조회 페이지: 검색한 닉네임을 가진 유저의 개인 전적을 볼 수 있습니다.
- 랭킹 페이지: 월간 랭킹을 확인할 수 있습니다.

# ⚠️ 필수 조건

## 📈 그래프

chart.js를 이용하여 구현하였습니다.

### 1. 종합 전적
![image](https://user-images.githubusercontent.com/48685836/160138969-0ee3d554-b106-4ae5-b4a4-ffb875b24c08.png)

### 2. 순위변동 추이
![image](https://user-images.githubusercontent.com/48685836/160139136-7495955e-1550-43fc-9b8b-23d2c6960533.png)

## 🏃 애니메이션

모두 CSS만으로 구현하였습니다. `transition`, `animation` 등을 활용하였습니다.

### 1. 네비게이션 바

hover 되었을 때 fade-in, fade-out 됩니다.

![ani1](https://user-images.githubusercontent.com/48685836/160142409-180c2f11-8d0c-486f-af4f-6d692bd8096c.gif)

### 2. 홈 페이지

처음 로딩되었을 때 검색바가 펼쳐지고 텍스트가 fade-in 됩니다.

![ani2](https://user-images.githubusercontent.com/48685836/160142958-8f4f4bbf-75bf-478a-9ba2-88ba93c6d575.gif)

### 3. 로딩 페이지

개인 전적 조회 페이지, 랭킹 페이지에서 데이터가 로딩 중일 때 표시되는 스피너가 포함된 페이지입니다.

![ani3](https://user-images.githubusercontent.com/48685836/160143908-126a3a3c-2cdd-4c37-befd-4dae99789d99.gif)

### 4. 모달 확인 버튼

개인 전적 조회 페이지에서 찾는 유저가 없을 경우 나타나는 모달 창의 확인 버튼에 fade-in, fade-out을 구현하였습니다.

![ani4](https://user-images.githubusercontent.com/48685836/160144528-baec040d-f2ce-452e-941c-bb8b5d6dffcb.gif)

### 5. 모드 선택 탭

개인 전적 조회 페이지의 모드 선택 탭에 마우스가 hover 되거나 활성화된 탭이 바뀔 때 color, border 등이 전환되는 효과를 구현하였습니다.

![ani5](https://user-images.githubusercontent.com/48685836/160144716-a7cd90d3-34e4-47d4-b8d8-f532f6be24c3.gif)



## 🧱 Vanilla Module

TypeScript만을 이용하여 만들었으며 타입정의와 json 데이터만을 import하여 구현하였습니다.

모두 utils 폴더 안에 저장되어 있습니다.

1. calcMatch.ts
  - 개인전/팀전에 맞게 주어진 매치 데이터를 파싱하여 개인 전적 조회 페이지의 하단의 매치 리스트에 필요한 데이터를 돌려줍니다.
  - 해시로 작성되어 있는 카트와 트랙은 API의 메타데이터를 참고하여 실제 이름으로 변환하여 돌려줍니다.
2. calcRank.ts
  - 개인 전적 조회 페이지의 순위변동 추이에 필요한 지난 200경기의 순위 평균과 최근 50경기의 순위 평균, 순위 데이터를 돌려줍니다.
  - 순위 평균은 소숫점 셋째 자리에서 반올림하여 둘째 자리까지 표시했습니다.
3. calcRanking.ts
  - 랭킹 페이지에 필요한 순위 데이털를 계산하여 돌려줍니다.
  - API의 한계 및 브라우저 성능을 고려하여 200개의 매치 아이디를 가져온 후, 이 매치 아이디를 기준으로 다시 매치 데이터를 가져옵니다.
  - 가져온 매치 데이터의 각 플레이어의 정보를 개인전/팀전에 맞는 기준으로 누적 포인트와 주행횟수를 계산하여 돌려줍니다.
4. calcRecords.ts
  - 개인 전적 조회 페이지의 종합 전적에 필요한 승률, 완주율, 리타이어율을 계산하여 돌려줍니다.
  - 리타이어율은 100%에서 완주율을 빼서 계산하였습니다.

# 🛠 사용 기술

## 📐 Front-End

![TypeScript](https://img.shields.io/badge/typescript-%23377ac4.svg?style=for-the-badge&logo=typescript&logoColor=%23ffffff)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

## ✈️ Deploy

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

# portfolios-with-Vanilla-JS

## 1. Infinite Carousel

1. 순환식으로 무한하게 슬라이드 할 수 있는 기능
2. start/stop 버튼을 이용한 자동 슬라이드 on/off 기능
3. 자동 슬라이드가 on되어 있을 경우에 prev, next 버튼 클릭시에도 동일한 시간 이후에 자동 슬라이드 되도록하는 타이머 지연 기능

---

## 2. Infinite Scroll

1. 무한 스크롤 데이터 로드
2. loader icon 렌더링으로 로딩중이라는 것을 사용자에게 전달

- 사용 라이브러리 :
  lodash(throttle 메서드)

---

## 3. Shopping Cart

1. 장바구니 담기 기능 (장바구니 담기 버튼 클릭시 표시되는 기능 추가)
2. 장바구니 확인 및 내역 수정
3. lazy loading 기능 구현 (image가 100% 뷰포트에 노출될 경우 이미지 로딩)

- 추가 구현 예정 기능 -> header에 캐러셀 추가, 코드 리팩토링

* 사용 라이브러리 :
  "cors": "^2.8.5",
  "dotenv": "^8.2.0",
  "express": "^4.17.1",
  "mongodb": "^3.6.5",
  "mongoose": "^5.12.2"

---

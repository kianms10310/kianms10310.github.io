// 공개 GitHub Pages에 올라가는 파일입니다. 예약번호와 개인 연락처는 넣지 마세요.
window.TRIP = {
  id: "jeju-2026",
  title: "제주도 여행",
  subtitle: "바람 따라, 제주에서 보내는 나흘",
  location: "JEJU · 2026",
  timeZone: "Asia/Seoul",
  dates: ["2026-11-12", "2026-11-13", "2026-11-14", "2026-11-15"],
  days: {
    "2026-11-12": {
      title: "제주에 도착하는 날",
      summary: "제주 도착, 오후 선택 일정, 리조트 체크인과 흑돼지 저녁",
      items: [
        { id: "leave-home", time: "07:25", type: "이동", title: "집 → 김포공항", detail: "출발 전 신분증과 탑승 정보를 확인하세요." },
        { id: "flight", time: "11:20", type: "항공", title: "김포공항 → 제주공항", detail: "이스타항공 ZE273", address: "서울 강서구 하늘길 112 김포국제공항" },
        { id: "arrival", time: "12:35", type: "도착", title: "제주공항 도착", address: "제주 제주시 공항로 2 제주국제공항", coords: [33.5070711, 126.4916441] },
        { id: "shuttle", time: "도착 후", type: "셔틀", title: "렌터카 셔틀버스 탑승", detail: "제주공항 1층 5번 게이트 · 렌터카 하우스 8구역 5번", address: "제주 제주시 공항로 2 제주국제공항" },
        { id: "rental", time: "13:30", type: "렌터카", title: "평화렌터카에서 차량 대여", detail: "차종: 캐스터 F/L · 셔틀 이동 후 대여", address: "제주 제주시 용해로 119 제주 평화렌터카", coords: [33.5072118, 126.5051394] },
        { id: "lunch", time: "13:30", type: "점심", title: "점심 식사", detail: "렌터카 대여 시간과 겹치므로 식사 시작 시간은 조정이 필요할 수 있습니다.", candidates: [
          { name: "수우동", category: "음식점", menu: "우동", address: "제주 제주시 한림읍 협재1길 11", mapUrl: "https://naver.me/FDnC5nUI", hours: "10:20–16:00", coords: [33.3965876, 126.2423058] },
          { name: "채훈이네 해장국 제주협재점", category: "음식점", menu: "고사리육개장", address: "제주 제주시 한림읍 한림상로 29 채훈이네해장국", mapUrl: "https://naver.me/FW6hJ5Uv", hours: "06:00–15:00", lastOrder: "14:30", coords: [33.4113465, 126.2672898] }
        ] },
        { id: "afternoon", time: "15:00", type: "액티비티", title: "9.81 파크 제주", address: "제주 제주시 애월읍 천덕로 880-24", coords: [33.3900177, 126.3643525] },
        { id: "resort", time: "17:00", type: "숙소", title: "더 시에나 리조트 체크인", detail: "숙박: 11/12–11/15 · 체크인 15:00부터 · 체크아웃 11:00까지", address: "제주 서귀포시 용흥로66번길 158-8 더 시에나 리조트", mapUrl: "https://naver.me/xKERqjq1", coords: [33.2648, 126.4849] },
        { id: "dinner", time: "18:00", type: "저녁", transport: "택시 이동", title: "제주곰집", menu: "흑돼지", address: "제주 서귀포시 이어도로 733", mapUrl: "https://naver.me/xoH8ImKx", coords: [33.2358711, 126.4936772] }
      ]
    },
    "2026-11-13": {
      title: "성산 → 서귀포",
      summary: "성산일출봉, 비밀의숲, 서귀포올레시장",
      items: [
        { id: "d2-departure", time: "08:00", type: "이동", title: "숙소 → 성산일출봉", detail: "차량 이동 약 1시간 20분 예상" },
        { id: "d2-seongsan", time: "09:30", type: "관광", title: "성산일출봉 도착", address: "제주 서귀포시 성산읍 성산리 1", mapUrl: "https://naver.me/xa5Rn5U3", hours: "06:00–18:00", coords: [33.4588891, 126.9408178] },
        { id: "d2-forest", time: "14:00", type: "산책", title: "비밀의숲", address: "제주 제주시 구좌읍 송당리 2173", mapUrl: "https://naver.me/513NStWW", hours: "09:00–17:00", coords: [33.4539784, 126.7551098] },
        { id: "d2-market", time: "17:00", type: "시장", title: "서귀포올레시장", address: "제주 서귀포시 서귀동 340", mapQuery: "서귀포매일올레시장", hours: "07:00–20:00", coords: [33.25014646, 126.5632316] }
      ]
    },
    "2026-11-15": {
      title: "제주를 떠나는 날",
      summary: "체크아웃, 고기국수 아침, 렌터카 반납 후 귀가",
      items: [
        { id: "d4-checkout", time: "08:00", type: "숙소", title: "더 시에나 리조트 체크아웃", address: "제주 서귀포시 용흥로66번길 158-8 더 시에나 리조트", mapUrl: "https://naver.me/xKERqjq1", coords: [33.2648, 126.4849] },
        { id: "d4-breakfast", time: "08:00", type: "아침", title: "국수바다 서귀포본점", menu: "고기국수", address: "제주 서귀포시 일주서로 580", mapUrl: "https://naver.me/IDFUgaSy", hours: "08:00–21:00", coords: [33.253023, 126.447197] },
        { id: "d4-return", time: "10:00", type: "렌터카", title: "차량 반납 및 셔틀 탑승", address: "제주 제주시 용해로 119 제주 평화렌터카", coords: [33.5072118, 126.5051394] },
        { id: "d4-flight", time: "11:45–13:00", type: "항공", title: "제주공항 → 김포공항", detail: "에어서울 RS6408 · 김포공항 13:00 도착 예정", address: "제주 제주시 공항로 2 제주국제공항", coords: [33.5070711, 126.4916441] }
      ]
    }
  }
};

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
      summary: "공항에서 서쪽 바다를 지나, 액티비티와 리조트까지",
      items: [
        { id: "leave-home", time: "07:25", type: "이동", title: "집에서 김포공항으로", detail: "출발 전 신분증과 탑승 정보를 확인하세요." },
        { id: "flight", time: "11:20", type: "항공", title: "김포공항 → 제주공항", detail: "이스타항공 ZE273", address: "서울 강서구 하늘길 112 김포국제공항" },
        { id: "arrival", time: "12:35", type: "도착", title: "제주공항 도착", address: "제주 제주시 공항로 2 제주국제공항" },
        { id: "shuttle", time: "도착 후", type: "셔틀", title: "렌터카 셔틀버스 탑승", detail: "제주공항 1층 5번 게이트 · 렌터카 하우스 8구역 5번", address: "제주 제주시 공항로 2 제주국제공항" },
        { id: "rental", time: "13:30", type: "렌터카", title: "평화렌터카에서 차량 대여", detail: "차종: 캐스터 F/L · 셔틀 이동 후 대여", address: "제주 제주시 용해로 119 제주 평화렌터카" },
        { id: "lunch", time: "13:30", type: "점심", title: "점심 식사", detail: "후보 1: 수우동 · 후보 2: 미정. 렌터카 대여 시간과 겹치므로 식사 시작 시간은 조정이 필요할 수 있습니다.", address: "제주 제주시 한림읍 협재1길 11" },
        { id: "park", time: "15:00", type: "액티비티", title: "9.81 파크 제주", address: "제주 제주시 애월읍 천덕로 880-24" },
        { id: "resort", time: "17:00", type: "숙소", title: "더 시에나 리조트 체크인", detail: "숙박: 11/12–11/15 · 체크인 15:00부터 · 체크아웃 11:00까지", address: "제주 서귀포시 용흥로66번길 158-8 더 시에나 리조트" }
      ]
    }
  }
};

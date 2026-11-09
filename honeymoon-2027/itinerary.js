// 공개 GitHub Pages에 올라가는 파일입니다. 시간은 현지 시각입니다.
window.TRIP = {
  id: "honeymoon-2027",
  title: "신혼여행",
  subtitle: "바르셀로나 · 마요르카 · 마드리드",
  location: "SPAIN · 2027",
  timeZone: "Europe/Madrid",
  mapProvider: "google",
  dates: ["2027-06-06", "2027-06-07", "2027-06-08", "2027-06-09", "2027-06-10", "2027-06-11", "2027-06-12", "2027-06-13", "2027-06-14", "2027-06-15", "2027-06-16"],
  days: {
    "2027-06-06": {
      title: "바르셀로나 도착",
      summary: "인천 출발 · 바르셀로나 공항 호텔 체크인",
      items: [
        { id: "d1-bus", time: "07:01", type: "이동", title: "집 → 인천공항 T2", detail: "공항버스 탑승", mapQuery: "인천국제공항 제2여객터미널" },
        { id: "d1-flight", time: "11:50–19:10", type: "항공", title: "인천 → 바르셀로나", detail: "아시아나 OZ511 · 출발은 한국 시각, 도착은 스페인 현지 시각", mapQuery: "Barcelona El Prat Airport" },
        { id: "d1-arrival", time: "19:10", type: "도착", title: "바르셀로나 공항 도착", detail: "호텔 셔틀버스: T2 기준 C구역 · 배차 간격 약 20분", mapQuery: "Barcelona El Prat Airport Terminal 2", coords: [41.2969440, 2.0790474] },
        { id: "d1-hotel", time: "도착 후", type: "숙소", title: "BAH 바르셀로나 에어포트 호텔 체크인", detail: "체크인 15:00 / 체크아웃 12:00 · 조식 포함 · 무료 취소 2027.06.06 15:00까지 · 예약자 봉한슬", address: "Plaça de la Volateria, 3, 08820 El Prat de Llobregat, Barcelona, Spain", stay: true, phone: "+34 933 78 32 00", coords: [41.3178386, 2.0741826] }
      ]
    },
    "2027-06-07": {
      title: "마요르카로 이동",
      summary: "조식 · 팔마행 항공편 · 렌터카 · 숙소 체크인",
      items: [
        { id: "d2-breakfast", time: "07:30", type: "조식", title: "호텔 조식", detail: "운영 06:00–10:30" },
        { id: "d2-checkout", time: "10:20", type: "숙소", title: "BAH 호텔 체크아웃" },
        { id: "d2-airport", time: "10:40–10:50", type: "이동", title: "호텔 셔틀 → 바르셀로나 공항", detail: "10:40 셔틀 탑승 · 10:50 공항 도착 예정", mapQuery: "Barcelona El Prat Airport" },
        { id: "d2-flight", time: "13:40–14:40", type: "항공", title: "바르셀로나 → 팔마", detail: "Ryanair FR1342 · 20kg 수하물 / 작은 가방 1개", mapQuery: "Palma de Mallorca Airport" },
        { id: "d2-arrival", time: "14:40", type: "도착", title: "팔마 공항 도착", detail: "Record Go 렌터카 업체로 이동", mapQuery: "Palma de Mallorca Airport", coords: [39.5532245, 2.7290310] },
        { id: "d2-rental", time: "15:00", type: "렌터카", title: "Record Go 렌터카 대여", detail: "차량: CDAH · 대여기간: 2027.06.07 15:00–2027.06.10 14:00 · 인수 장소: Record Go", mapQuery: "Record Go Palma de Mallorca Airport", coords: [39.5468711, 2.7311444] },
        { id: "d2-hotel", time: "16:00", type: "숙소", title: "Hotel Rural Es Riquers 체크인", detail: "6/7–6/9, 2박 · 체크인 15:00 / 체크아웃 11:00 · 조식 포함(08:00–10:30) · 무료 취소 2027.05.31 23:59까지 · 레스토랑 스낵 12:00–15:00, 디너 19:00–21:30 · 예약자 봉한슬", address: "Ctra. Llucmajor–Porreres, km 9,3, 07260 Porreres, Illes Balears, Spain", mapQuery: "Hotel Rural Es Riquers Mallorca", stay: true, phone: "+34 971 166 689", coords: [39.5127089, 2.9958995] }
      ]
    },
    "2027-06-08": {
      title: "칼로 데스 모로",
      summary: "조식 후 해변 방문",
      items: [
        { id: "d3-breakfast", time: "08:00", type: "조식", title: "조식" },
        { id: "d3-calo", time: "10:00", type: "관광", title: "Calo Des Moro", address: "Carrer des Calo des Moro, 07650 Santanyi, Majorca, Spain", mapQuery: "Calo Des Moro Mallorca", coords: [39.3136990, 3.1216020] }
      ]
    },
    "2027-06-09": {
      title: "발데모사와 데이아",
      summary: "숙소 이동 · 발데모사 · 데이아",
      items: [
        { id: "d4-breakfast", time: "08:00", type: "조식", title: "조식" },
        { id: "d4-checkout", time: "09:30", type: "숙소", title: "Hotel Rural Es Riquers 체크아웃" },
        { id: "d4-hotel", time: "10:30", type: "이동", title: "Alcázar Hotel Sóller 방향으로 이동", detail: "체크인 14:00 / 체크아웃 11:00 · 조식 포함(07:30–10:30) · 무료 취소 2027.06.01 23:59까지 · 주차 약 18유로/박 · 수영장 09:00–20:00 · 사우나 사전 예약 필요(종료 시간 확인 필요) · 예약자 봉한슬", address: "Carrer de sa Romaguera, 25, 07100 Sóller, Illes Balears, Spain", stay: true, phone: "+34 971 18 86 86", coords: [39.7679401, 2.7139660] },
        { id: "d4-valldemossa", time: "11:30", type: "주차", title: "발데모사 주차장", address: "Avinguda Arxiduc Lluís Salvador, 07170 Valldemossa, Illes Balears, Spain", coords: [39.7100039, 2.6204493] },
        { id: "d4-deia", time: "14:00", type: "주차", title: "데이아 주차장", candidates: [
          { name: "주차장 후보 1", address: "Carrer Arxiduc Luís Salvador, 8A, 07179 Deià, Illes Balears, Spain", coords: [39.7466140, 2.6496305] },
          { name: "주차장 후보 2", address: "Ma-10, 1, 07179 Deià, Illes Balears, Spain", coords: [39.7510935, 2.6403594] }
        ] },
        { id: "d4-parking", time: "16:00", type: "주차", title: "Alcázar Hotel Sóller 주차장", mapQuery: "Alcázar Hotel Sóller Mallorca" }
      ]
    },
    "2027-06-10": {
      title: "팔마에서 마드리드로",
      summary: "팔마 대성당 · 렌터카 반납 · 마드리드행 항공편",
      items: [
        { id: "d5-breakfast", time: "07:30", type: "조식", title: "조식" },
        { id: "d5-checkout", time: "09:00", type: "숙소", title: "Alcázar Hotel Sóller 체크아웃" },
        { id: "d5-parking", time: "10:00", type: "주차", title: "팔마 주차장", address: "Avinguda de Gabriel Roca, Centre, 07001 Palma, Illes Balears, Spain", coords: [39.5669209, 2.6450589] },
        { id: "d5-cathedral", time: "10:30", type: "관광", title: "팔마 대성당", address: "Plaça de la Seu, s/n, Centre, 07001 Palma, Illes Balears, Spain", coords: [39.5674732, 2.6481680] },
        { id: "d5-return", time: "14:00", type: "렌터카", title: "Record Go 렌터카 반납", detail: "예약 반납 2027.06.10 14:00 · 반납 장소: 팔마 공항 Record Go", mapQuery: "Record Go Palma de Mallorca Airport", coords: [39.5468711, 2.7311444] },
        { id: "d5-airport", time: "반납 후", type: "이동", title: "팔마 공항 도착", mapQuery: "Palma de Mallorca Airport", coords: [39.5532245, 2.7290310] },
        { id: "d5-flight", time: "16:00–17:30", type: "항공", title: "팔마 → 마드리드", detail: "Ryanair FR403 · 20kg 수하물 / 작은 가방 1개", mapQuery: "Madrid Barajas Airport" },
        { id: "d5-arrival", time: "17:30", type: "도착", title: "마드리드 공항 도착", mapQuery: "Madrid Barajas Airport", coords: [40.4952269, -3.5733733] },
        { id: "d5-transfer", time: "18:30", type: "이동", title: "Catalonia Atocha로 이동", detail: "택시: 정찰제 33유로, 약 30분 · 203번 버스: 5유로, 약 30–40분, 매시 00·15·30·45분 운행", mapQuery: "Catalonia Atocha Madrid" },
        { id: "d5-hotel", time: "도착 후", type: "숙소", title: "Catalonia Atocha 체크인", detail: "6/10–6/12, 2박 · 체크인 15:00 / 체크아웃 11:00 · 조식 미포함 · 무료 취소 2027.06.08 23:59까지 · 예약자 봉한슬", address: "C. de Atocha, 81, Centro, 28012 Madrid, Spain", stay: true, phone: "+34 914 203 770", coords: [40.4119257, -3.6977945] }
      ]
    },
    "2027-06-11": {
      title: "마드리드 근교 여행",
      summary: "톨레도 또는 세고비아·톨레도 투어 선택 예정",
      items: [
        { id: "d6-choice", time: "미정", type: "후보", title: "근교 여행 선택", candidates: [
          { name: "톨레도 자유여행", mapQuery: "Toledo Spain", coords: [39.8558913, -4.0242650] },
          { name: "세고비아 + 톨레도 투어", mapQuery: "Segovia Spain", coords: [40.9481192, -4.1172101] }
        ] }
      ]
    },
    "2027-06-12": {
      title: "바르셀로나로 이동",
      summary: "아토차역 출발 · 바르셀로나 산츠역 도착 · 숙소에 짐 맡기기 · 체크인",
      items: [
        { id: "d7-checkout", time: "07:30", type: "숙소", title: "Catalonia Atocha 체크아웃", mapQuery: "Catalonia Atocha Madrid" },
        { id: "d7-walk", time: "07:35", type: "이동", title: "Catalonia Atocha → Desamparados", detail: "도보 이동 · 약 1분", mapQuery: "Desamparados Madrid" },
        { id: "d7-metro", time: "07:40", type: "이동", title: "Desamparados → Estación de Atocha", detail: "전철 이동 · 약 4분", mapQuery: "Estación de Atocha Madrid" },
        { id: "d7-station", time: "08:00", type: "이동", title: "마드리드 아토차역 도착", mapQuery: "Madrid Puerta de Atocha station", coords: [40.4056837, -3.6900187] },
        { id: "d7-train", time: "09:22–12:39", type: "열차", title: "마드리드 아토차역 → 바르셀로나 산츠역", mapQuery: "Barcelona Sants station", coords: [41.3790068, 2.1400042] },
        { id: "d7-barcelona-metro", time: "12:40", type: "이동", title: "바르셀로나 산츠역 → 카탈로니아 광장", detail: "전철 이동 · 약 4분", mapQuery: "Plaça de Catalunya Barcelona" },
        { id: "d7-luggage", time: "13:00", type: "숙소", title: "Catalonia Square에 짐 맡기기", mapQuery: "Catalonia Square Barcelona" },
        { id: "d7-hotel", time: "15:00", type: "숙소", title: "Catalonia Square 체크인", detail: "체크인 15:00 / 체크아웃 12:00 · 조식 미포함 · 무료 취소 2027.06.09 23:59까지 · 예약자 신진욱", address: "Rda. de Sant Pere, 9, Eixample, 08010 Barcelona, Spain", stay: true, phone: "+34 93 302 33 86", coords: [41.3885588, 2.1712865] }
      ]
    },
    "2027-06-13": { title: "8일차", summary: "세부 일정 미정", items: [] },
    "2027-06-14": { title: "9일차", summary: "세부 일정 미정", items: [] },
    "2027-06-15": {
      title: "바르셀로나 출발",
      summary: "공항버스 · 바르셀로나 공항 · 인천행 항공편",
      items: [
        { id: "d10-aerobus", time: "17:30", type: "이동", title: "Parada Aerobus A1에서 공항버스 탑승", detail: "편도 1인 7.75유로 · 카드 결제", address: "Pl. Catalunya - Andana Central, 08002, Barcelona, 스페인", phone: "+34933841758" },
        { id: "d10-airport", time: "18:00", type: "이동", title: "바르셀로나 공항 도착", mapQuery: "Barcelona El Prat Airport", coords: [41.2969440, 2.0790474] },
        { id: "d10-flight", time: "20:50–다음 날 16:20", type: "항공", title: "바르셀로나 → 인천", detail: "아시아나 OZ512 · 인천 도착은 6/16 한국 시각", mapQuery: "Barcelona El Prat Airport" }
      ]
    },
    "2027-06-16": {
      title: "인천 도착",
      summary: "신혼여행 마지막 날",
      items: [
        { id: "d11-arrival", time: "16:20", type: "도착", title: "인천공항 도착", mapQuery: "인천국제공항", coords: [37.4684696, 126.4347417] }
      ]
    }
  }
};

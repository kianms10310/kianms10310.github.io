# 여행 일정 GitHub Pages

정적 HTML, CSS, JavaScript로 만든 여행 일정 모음입니다.

- 홈: `https://kianms10310.github.io/`
- 제주도 여행: `https://kianms10310.github.io/jeju-2026/`
- 신혼여행: `https://kianms10310.github.io/honeymoon-2027/`

홈의 여행 목록은 한국 시간(`Asia/Seoul`) 기준으로 출발 전에는 `D-n`, 여행 중에는 `여행 중`, 마지막 날이 지나면 `완료`를 표시합니다.

제주도 페이지는 한국 시간(`Asia/Seoul`) 기준으로 접속한 날짜가 여행 일정에 있으면 그 날짜를 자동 선택합니다. 해당 날짜가 없으면 첫날을 보여줍니다. 날짜 탭을 눌러 다른 날짜를 볼 수도 있습니다.

각 장소의 **주소 복사**, **네이버 지도 열기**, **완료**, **못함**을 지원합니다. 못함으로 표시한 일정은 이후 날짜에도 표시되며, 완료 처리할 수 있습니다. 상태는 현재 기기의 브라우저 `localStorage`에 저장되므로 다른 기기와 동기화되지는 않습니다.

날짜별 지도에는 등록된 제주 내 위치와 후보 장소가 함께 표시됩니다. 지도 배경은 OpenStreetMap이며, 장소별 검색과 길찾기는 네이버 지도에서 열립니다. 새 장소를 추가할 때 지도에 표시하려면 일정 또는 후보에 `coords: [위도, 경도]`를 입력하세요.

## 일정 수정

`jeju-2026/itinerary.js`에서 `days`의 날짜별 `items`를 수정하세요. 현재는 **11월 12일·13일·15일** 일정이 입력되어 있고, **11월 14일 3일차는 미정**입니다. 각 일정의 `id`는 기존 상태 저장에 사용되므로 수정할 때 유지하세요.

새 여행을 만들려면 `jeju-2026/` 폴더를 복사하여 새 폴더를 만들고, `itinerary.js`의 `id`, 날짜, 일정을 수정한 뒤 홈 `index.html`에 링크를 추가하세요.

신혼여행 일정은 `honeymoon-2027/itinerary.js`에서 수정합니다. **2027년 6월 6일~16일** 중 8·9일차의 세부 일정은 미정입니다. 신혼여행 페이지는 제주도 페이지의 `app.js`와 `style.css`를 함께 사용하며 장소 링크는 구글 지도로 열립니다. 업체 전화번호는 `phone` 필드에 추가하면 누를 수 있는 전화 링크로 표시됩니다.

숙소의 주소와 전화번호는 각 업체의 공식 페이지에서 확인했습니다: [BAH](https://www.barcelonairporthotel.com/en/contact/), [Es Riquers](https://www.hotelesriquers.com/en/contact), [Alcázar Hotel Sóller](https://alcazarhotelsoller.com/en/contact), [Catalonia Atocha](https://www.cataloniahotels.com/en/hotel/catalonia-atocha), [Catalonia Square](https://www.cataloniahotels.com/en/hotel/catalonia-square). Alcázar Hotel Sóller 주소는 전달받은 이전 숙소 주소 대신 공식 주소로 수정했습니다.

> 이 저장소와 GitHub Pages는 공개됩니다. 예약번호, 개인 연락처, 결제 정보 등은 일정 파일에 넣지 마세요.

## 게시

GitHub 저장소의 **Settings → Pages → Build and deployment**에서 **Deploy from a branch**, 브랜치 **main**, 폴더 **/(root)**를 선택하면 됩니다.

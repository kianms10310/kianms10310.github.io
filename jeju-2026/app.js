(() => {
  "use strict";

  const trip = window.TRIP;
  if (!trip) return;
  const storageKey = `${trip.id}-status-v1`;
  const validStates = new Set(["done", "missed"]);
  const allItems = trip.dates.flatMap(date => trip.days[date]?.items || []);
  const itemIds = new Set(allItems.map(item => item.id));
  const $ = selector => document.querySelector(selector);
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"})[character]);
  let statuses = {};
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      statuses = Object.fromEntries(Object.entries(saved).filter(([id, state]) => itemIds.has(id) && validStates.has(state)));
    }
  } catch (_) { /* Private browsing can disable storage. */ }

  function todayInTripZone() {
    const parts = new Intl.DateTimeFormat("en-US", {timeZone: trip.timeZone, year: "numeric", month: "2-digit", day: "2-digit"}).formatToParts(new Date());
    const value = type => parts.find(part => part.type === type)?.value;
    return `${value("year")}-${value("month")}-${value("day")}`;
  }

  function initialDate() {
    const today = todayInTripZone();
    return trip.dates.includes(today) ? today : trip.dates[0];
  }

  let activeDate = initialDate();
  let toastTimer;

  function toast(message) {
    const element = $("#toast");
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove("show"), 1800);
  }

  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(statuses)); }
    catch (_) { toast("이 브라우저에서는 상태를 저장할 수 없어요."); }
  }

  function setState(id, state) {
    if (!itemIds.has(id) || !validStates.has(state)) return;
    if (statuses[id] === state) delete statuses[id];
    else statuses[id] = state;
    save();
    render();
  }

  async function copyAddress(address, label = "주소") {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(address);
      else {
        const textarea = document.createElement("textarea");
        textarea.value = address;
        textarea.style.cssText = "position:fixed;opacity:0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("copy failed");
      }
      toast(`${label}를 복사했어요.`);
    } catch (_) { toast("복사하지 못했어요. 내용을 길게 눌러 복사해 주세요."); }
  }

  function formatDate(date) {
    const [year, month, day] = date.split("-").map(Number);
    const weekday = new Intl.DateTimeFormat("ko-KR", {weekday: "short", timeZone: "UTC"}).format(new Date(Date.UTC(year, month - 1, day)));
    return {short: `${month}/${day}`, weekday};
  }

  function mapSearchUrl(address) {
    return trip.mapProvider === "google"
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : `https://map.naver.com/p/search/${encodeURIComponent(address)}`;
  }

  function placeMapUrl(place, query) {
    return place.mapUrl || mapSearchUrl(query);
  }

  const mapLabel = trip.mapProvider === "google" ? "구글 지도 ↗" : "네이버 지도 ↗";

  function phoneMarkup(phone) {
    if (!phone) return "";
    const dial = String(phone).replace(/[^\d+]/g, "");
    return `<div class="phone">전화 <a href="tel:${dial}">${escapeHtml(phone)}</a></div>`;
  }

  function detailMarkup(detail) {
    if (!detail) return "";
    const lines = detail.split(" · ");
    if (lines.length === 1) return `<p class="detail">${escapeHtml(detail)}</p>`;
    return `<ul class="detail-list">${lines.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`;
  }

  function stayMarkup(item) {
    const fields = (item.detail || "").split(" · ").filter(Boolean).map(line => {
      if (line.startsWith("체크인 ")) {
        const times = line.match(/^체크인 (.+?) \/ 체크아웃 (.+)$/);
        if (times) return ["체크인 · 아웃", `${times[1]} / ${times[2]}`];
      }
      if (/^\d+\/\d+–\d+\/\d+/.test(line)) return ["숙박", line];
      for (const label of ["조식", "무료 취소", "레스토랑", "주차", "수영장", "사우나", "예약자"]) {
        if (line.startsWith(label + " ")) return [label, line.slice(label.length + 1)];
      }
      return ["안내", line];
    });
    if (item.address) fields.push(["주소", item.address]);
    if (item.phone) {
      const dial = String(item.phone).replace(/[^\d+]/g, "");
      fields.push(["전화", `<a href="tel:${dial}">${escapeHtml(item.phone)}</a>`, true]);
    }
    return `<dl class="stay-info">${fields.map(([label, value, isHtml]) => `<div class="stay-row"><dt>${escapeHtml(label)}</dt><dd>${isHtml ? value : escapeHtml(value)}</dd></div>`).join("")}</dl>`;
  }

  function candidateMarkup(candidate, index) {
    const badges = [
      candidate.category && `<span class="candidate-badge category">${escapeHtml(candidate.category)}</span>`,
      candidate.menu && `<span class="candidate-badge menu">${escapeHtml(candidate.menu)}</span>`
    ].filter(Boolean).join("");
    const hours = candidate.hours ? `<div class="candidate-hours">영업 ${escapeHtml(candidate.hours)}${candidate.lastOrder ? ` · 라스트오더 ${escapeHtml(candidate.lastOrder)}` : ""}</div>` : "";
    const location = candidate.address || candidate.mapQuery;
    const address = location ? `<div class="address">${escapeHtml(candidate.address || candidate.mapQuery)}</div><div class="candidate-actions"><button class="action" type="button" data-copy-candidate="${escapeHtml(location)}">${candidate.address ? "주소" : "검색어"} 복사</button><a class="action map" href="${escapeHtml(placeMapUrl(candidate, candidate.mapQuery || location))}" target="_blank" rel="noopener noreferrer">${mapLabel}</a></div>` : `<div class="candidate-note">장소가 정해지면 주소와 지도를 추가할 예정입니다.</div>`;
    return `<div class="candidate"><div class="candidate-heading"><span>후보 ${index + 1}</span><strong>${escapeHtml(candidate.name)}</strong></div><div class="candidate-badges">${badges}</div>${hours}${address}${phoneMarkup(candidate.phone)}</div>`;
  }

  function itemMarkup(item) {
    const state = statuses[item.id] || "pending";
    const location = item.address || item.mapQuery;
    const address = location ? `<div class="address">${item.address ? "" : "지도 검색어 · "}${escapeHtml(location)}</div>` : "";
    const addressActions = location ? `<button class="action" type="button" data-copy="${escapeHtml(item.id)}">${item.address ? "주소" : "검색어"} 복사</button><a class="action map" href="${escapeHtml(placeMapUrl(item, item.mapQuery || location))}" target="_blank" rel="noopener noreferrer">${mapLabel}</a>` : "";
    const candidates = item.candidates?.length ? `<div class="candidates">${item.candidates.map(candidateMarkup).join("")}</div>` : "";
    const transport = item.transport ? `<span class="type transport">${escapeHtml(item.transport)}</span>` : "";
    const menu = item.menu ? `<span class="type menu">${escapeHtml(item.menu)}</span>` : "";
    const hours = item.hours ? `<div class="operating-hours">운영 ${escapeHtml(item.hours)}</div>` : "";
    const details = item.stay ? stayMarkup(item) : `${detailMarkup(item.detail)}${address}${phoneMarkup(item.phone)}`;
    return `<article class="item ${state === "pending" ? "" : state}"><div class="item-head"><span class="time">${escapeHtml(item.time)}</span><span class="type">${escapeHtml(item.type)}</span>${transport}${menu}</div><h3>${escapeHtml(item.title)}</h3>${hours}${details}${candidates}<div class="actions">${addressActions}<button class="state done ${state === "done" ? "active" : ""}" type="button" data-state="done" data-id="${escapeHtml(item.id)}" aria-pressed="${state === "done"}">${state === "done" ? "✓ 완료됨" : "✓ 완료"}</button><button class="state missed ${state === "missed" ? "active" : ""}" type="button" data-state="missed" data-id="${escapeHtml(item.id)}" aria-pressed="${state === "missed"}">${state === "missed" ? "↪ 못함 등록됨" : "↪ 못함"}</button></div></article>`;
  }

  function mapPointsForDay(items) {
    const points = [];
    for (const item of items) {
      if (item.coords) points.push({title: item.title, time: item.time, coords: item.coords, query: item.mapQuery || item.address || item.title, mapUrl: item.mapUrl, alternative: false});
      for (const candidate of item.candidates || []) {
        if (candidate.coords) points.push({title: candidate.name, time: item.time, coords: candidate.coords, query: candidate.mapQuery || candidate.address || candidate.name, mapUrl: candidate.mapUrl, alternative: true});
      }
    }
    return points;
  }

  let dayMap = null;
  let mappedDate = null;

  function renderMap(items) {
    if (mappedDate === activeDate) return;
    if (dayMap) { dayMap.remove(); dayMap = null; }
    mappedDate = activeDate;
    const points = mapPointsForDay(items);
    const section = $("#day-map-section");
    section.hidden = points.length === 0;
    if (!points.length) return;
    $("#map-count").textContent = `${points.length}곳 표시`;
      $("#map-places").innerHTML = points.map((point, index) => `<li><a href="${escapeHtml(placeMapUrl(point, point.query))}" target="_blank" rel="noopener noreferrer"><span class="map-place-number ${point.alternative ? "alternative" : ""}">${index + 1}</span><span class="map-place-label">${escapeHtml(point.title)}</span><span class="map-place-time">${escapeHtml(point.time)}</span></a></li>`).join("");
    const container = $("#day-map");
    if (!window.L) { container.innerHTML = '<div class="map-unavailable">지도를 불러오지 못했어요. 아래 장소 목록을 이용해 주세요.</div>'; return; }
    container.innerHTML = "";
    const touchDevice = window.matchMedia?.("(pointer: coarse)").matches;
    dayMap = L.map(container, {scrollWheelZoom: false, zoomControl: false, dragging: !touchDevice, touchZoom: !touchDevice});
    L.control.zoom({position: "bottomright"}).addTo(dayMap);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(dayMap);
    for (const [index, point] of points.entries()) {
      const icon = L.divIcon({className: "", html: `<span class="map-pin ${point.alternative ? "alternative" : ""}">${index + 1}</span>`, iconSize: [28, 28], iconAnchor: [14, 14]});
      L.marker(point.coords, {icon, title: point.title}).addTo(dayMap).bindPopup(`<span>${escapeHtml(point.time)}</span><strong>${escapeHtml(point.title)}</strong><a href="${escapeHtml(placeMapUrl(point, point.query))}" target="_blank" rel="noopener noreferrer">${mapLabel}</a>`);
    }
    const bounds = L.latLngBounds(points.map(point => point.coords));
    if (points.length === 1) dayMap.setView(points[0].coords, 12);
    else dayMap.fitBounds(bounds, {padding: [28, 28], maxZoom: 13});
  }

  function renderCarryovers() {
    const previous = trip.dates.filter(date => date < activeDate).flatMap(date => (trip.days[date]?.items || []).filter(item => statuses[item.id] === "missed").map(item => ({...item, date})));
    $("#carryovers").innerHTML = previous.length ? `<div class="carry"><h3>↪ 이전 날짜에 못한 일정 ${previous.length}개</h3><p>완료 처리할 때까지 다음 날짜에도 표시됩니다.</p>${previous.map(item => `<div class="carry-row"><strong>${escapeHtml(item.title)}</strong><small>${formatDate(item.date).short} · ${escapeHtml(item.time)}</small><br><button type="button" data-resolve="${escapeHtml(item.id)}">완료 처리</button></div>`).join("")}</div>` : "";
  }

  function render() {
    const today = todayInTripZone();
    const day = trip.days[activeDate];
    const items = day?.items || [];
    const completed = items.filter(item => statuses[item.id] === "done").length;
    const missed = items.filter(item => statuses[item.id] === "missed").length;
    const next = items.find(item => !statuses[item.id]);
    const dateIndex = trip.dates.indexOf(activeDate);
    $("#location").textContent = trip.location;
    $("#trip-title").textContent = trip.title;
    $("#trip-subtitle").textContent = trip.subtitle;
    $("#date-tabs").innerHTML = trip.dates.map(date => {
      const label = formatDate(date);
      const selected = date === activeDate;
      return `<button type="button" class="date-tab ${selected ? "active" : ""}" data-date="${date}" aria-current="${selected ? "date" : "false"}">${label.short}<small>${label.weekday}요일</small></button>`;
    }).join("");
    $("#overview-label").textContent = activeDate === today ? "TODAY'S PLAN · 오늘" : activeDate > today ? "UPCOMING PLAN · 예정" : "PAST PLAN · 지난 일정";
    $("#overview-title").textContent = !items.length ? "일정 준비 중" : next ? `다음 일정 · ${next.title}` : missed ? "오늘의 일정 확인 완료" : "오늘의 일정 완료";
    $("#overview-description").textContent = !items.length ? "이 날짜의 계획은 추후 추가됩니다." : next ? `${next.time} · ${day.summary}` : `${completed}개 완료${missed ? ` · ${missed}개 못함` : ""}`;
    $("#day-number").textContent = `DAY ${String(dateIndex + 1).padStart(2, "0")} · ${activeDate}`;
    $("#day-title").textContent = day?.title || "일정 준비 중";
    $("#day-summary").textContent = day?.summary || "이 날짜의 계획은 아직 등록되지 않았습니다.";
    $("#day-count").textContent = items.length ? `${completed}/${items.length} 완료${missed ? ` · ${missed} 못함` : ""}` : "";
    const percent = items.length ? Math.round(completed / items.length * 100) : 0;
    $("#progress").setAttribute("aria-valuenow", String(percent));
    $("#progress span").style.width = `${percent}%`;
    renderCarryovers();
    $("#timeline").innerHTML = items.length ? items.map(itemMarkup).join("") : `<div class="empty"><strong>아직 등록된 일정이 없어요.</strong><p>다음 일정이 정해지면 이곳에 표시됩니다.</p></div>`;
    renderMap(items);
  }

  document.addEventListener("click", event => {
    const dateButton = event.target.closest("[data-date]");
    if (dateButton) { activeDate = dateButton.dataset.date; render(); return; }
    const stateButton = event.target.closest("[data-state]");
    if (stateButton) { setState(stateButton.dataset.id, stateButton.dataset.state); return; }
    const resolveButton = event.target.closest("[data-resolve]");
    if (resolveButton) { setState(resolveButton.dataset.resolve, "done"); return; }
    const candidateCopyButton = event.target.closest("[data-copy-candidate]");
    if (candidateCopyButton) { copyAddress(candidateCopyButton.dataset.copyCandidate); return; }
    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) {
      const item = allItems.find(entry => entry.id === copyButton.dataset.copy);
      if (item?.address || item?.mapQuery) copyAddress(item.address || item.mapQuery, item.address ? "주소" : "검색어");
    }
  });
  render();
})();

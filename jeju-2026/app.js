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
    const hashDate = decodeURIComponent(location.hash.slice(1));
    if (trip.dates.includes(hashDate)) return hashDate;
    const today = todayInTripZone();
    return trip.dates.find(date => date >= today) || trip.dates[trip.dates.length - 1];
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

  async function copyAddress(address) {
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
      toast("주소를 복사했어요.");
    } catch (_) { toast("복사하지 못했어요. 주소를 길게 눌러 복사해 주세요."); }
  }

  function formatDate(date) {
    const [year, month, day] = date.split("-").map(Number);
    const weekday = new Intl.DateTimeFormat("ko-KR", {weekday: "short", timeZone: "UTC"}).format(new Date(Date.UTC(year, month - 1, day)));
    return {short: `${month}/${day}`, weekday};
  }

  function itemMarkup(item) {
    const state = statuses[item.id] || "pending";
    const address = item.address ? `<div class="address">${escapeHtml(item.address)}</div>` : "";
    const addressActions = item.address ? `<button class="action" type="button" data-copy="${escapeHtml(item.id)}">주소 복사</button><a class="action map" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(item.address)}" target="_blank" rel="noopener noreferrer">지도 보기 ↗</a>` : "";
    return `<article class="item ${state === "pending" ? "" : state}"><div class="item-head"><span class="time">${escapeHtml(item.time)}</span><span class="type">${escapeHtml(item.type)}</span></div><h3>${escapeHtml(item.title)}</h3>${item.detail ? `<p class="detail">${escapeHtml(item.detail)}</p>` : ""}${address}<div class="actions">${addressActions}<button class="state done ${state === "done" ? "active" : ""}" type="button" data-state="done" data-id="${escapeHtml(item.id)}" aria-pressed="${state === "done"}">${state === "done" ? "✓ 완료됨" : "✓ 완료"}</button><button class="state missed ${state === "missed" ? "active" : ""}" type="button" data-state="missed" data-id="${escapeHtml(item.id)}" aria-pressed="${state === "missed"}">${state === "missed" ? "↪ 못함 등록됨" : "↪ 못함"}</button></div></article>`;
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
    $("#overview-title").textContent = !day ? "일정 준비 중" : next ? `다음 일정 · ${next.title}` : missed ? "오늘의 일정 확인 완료" : "오늘의 일정 완료";
    $("#overview-description").textContent = !day ? "이 날짜의 계획은 추후 추가됩니다." : next ? `${next.time} · ${day.summary}` : `${completed}개 완료${missed ? ` · ${missed}개 못함` : ""}`;
    $("#day-number").textContent = `DAY ${String(dateIndex + 1).padStart(2, "0")} · ${activeDate}`;
    $("#day-title").textContent = day?.title || "일정 준비 중";
    $("#day-summary").textContent = day?.summary || "이 날짜의 계획은 아직 등록되지 않았습니다.";
    $("#day-count").textContent = items.length ? `${completed}/${items.length} 완료${missed ? ` · ${missed} 못함` : ""}` : "";
    const percent = items.length ? Math.round(completed / items.length * 100) : 0;
    $("#progress").setAttribute("aria-valuenow", String(percent));
    $("#progress span").style.width = `${percent}%`;
    renderCarryovers();
    $("#timeline").innerHTML = items.length ? items.map(itemMarkup).join("") : `<div class="empty"><strong>아직 등록된 일정이 없어요.</strong><p>다음 일정이 정해지면 이곳에 표시됩니다.</p></div>`;
  }

  document.addEventListener("click", event => {
    const dateButton = event.target.closest("[data-date]");
    if (dateButton) { activeDate = dateButton.dataset.date; history.replaceState(null, "", `#${activeDate}`); render(); return; }
    const stateButton = event.target.closest("[data-state]");
    if (stateButton) { setState(stateButton.dataset.id, stateButton.dataset.state); return; }
    const resolveButton = event.target.closest("[data-resolve]");
    if (resolveButton) { setState(resolveButton.dataset.resolve, "done"); return; }
    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) {
      const item = allItems.find(entry => entry.id === copyButton.dataset.copy);
      if (item?.address) copyAddress(item.address);
    }
  });
  window.addEventListener("hashchange", () => { const date = location.hash.slice(1); if (trip.dates.includes(date)) { activeDate = date; render(); } });
  render();
})();

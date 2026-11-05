'use strict';
(() => {
 const box = document.getElementById('pet-promo-countdown');
 if (!box) return;
 const calendar = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Sao_Paulo', year:'numeric', month:'2-digit', day:'2-digit'});
 const hours = box.querySelector('[data-promo-hours]');
 const minutes = box.querySelector('[data-promo-minutes]');
 const seconds = box.querySelector('[data-promo-seconds]');
 function tick() {
  const now = Date.now();
  const parts = Object.fromEntries(calendar.formatToParts(new Date(now)).map(part => [part.type, part.value]));
  const deadline = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) + 1, 3);
  const day = `${parts.day}.${parts.month}`;
  const remaining = Math.max(0, Math.ceil((deadline - now) / 1000));
  box.dataset.endsAt = new Date(deadline).toISOString();
  hours.textContent = String(Math.floor(remaining / 3600)).padStart(2, '0');
  minutes.textContent = String(Math.floor(remaining / 60) % 60).padStart(2, '0');
  seconds.textContent = String(remaining % 60).padStart(2, '0');
  if (box.dataset.currentDay !== `${parts.year}-${parts.month}-${parts.day}`) {
   box.dataset.currentDay = `${parts.year}-${parts.month}-${parts.day}`;
   const bannerDay = document.querySelector('[data-promo-day]');
   if (bannerDay) bannerDay.textContent = day;
   box.querySelector('[data-promo-deadline]').innerHTML = `Somente hoje, <strong>${day}</strong> · até 23h59 (Brasília)`;
  }
 }
 tick();
 setInterval(tick, 1000);
 document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
})();

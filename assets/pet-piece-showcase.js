'use strict';
(() => {
 const section = document.getElementById('veja-por-dentro');
 if (!section) return;
 const tabs = [...section.querySelectorAll('[data-pet-piece-tab]')];
 const panels = [...section.querySelectorAll('[data-pet-piece-panel]')];
 function select(tab, focus = false) {
  tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
  panels.forEach(panel => { panel.hidden = panel.dataset.petPiecePanel !== tab.dataset.petPieceTab; });
  if (focus) tab.focus();
 }
 tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => select(tab));
  tab.addEventListener('keydown', event => {
   let next;
   if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
   if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
   if (event.key === 'Home') next = 0;
   if (event.key === 'End') next = tabs.length - 1;
   if (next !== undefined) { event.preventDefault(); select(tabs[next], true); }
  });
 });
})();

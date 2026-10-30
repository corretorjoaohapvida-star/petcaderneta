'use strict';
const plans=document.getElementById('planos');
document.querySelectorAll('[data-scroll-plans]').forEach(button=>button.addEventListener('click',()=>plans.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})));
const upgradeDialog=document.getElementById('pet-upgrade-modal');let upgradeReturnFocus=null;
function checkoutUrl(key){const url=window.PET_CHECKOUTS?.[key];return typeof url==='string'&&/^https:\/\//i.test(url)?url:null;}
function goToCheckout(key){const url=checkoutUrl(key);if(upgradeDialog?.open)upgradeDialog.close();if(url)window.location.assign(url);else plans.scrollIntoView({behavior:'smooth',block:'start'});}
document.querySelectorAll('[data-plan]').forEach(link=>{
 const key=link.dataset.plan,url=checkoutUrl(key);if(url)link.href=url;
 if(key==='basico')link.addEventListener('click',event=>{event.preventDefault();upgradeReturnFocus=link;if(!upgradeDialog.open){upgradeDialog.showModal();document.body.style.overflow='hidden';upgradeDialog.querySelector('[data-upgrade-close]').focus();}});
 else if(!url)link.addEventListener('click',event=>{event.preventDefault();goToCheckout(key)});
});
if(upgradeDialog){
 const accept=upgradeDialog.querySelector('[data-upgrade-accept]'),decline=upgradeDialog.querySelector('[data-basic-continue]');
 const offerUrl=checkoutUrl('completo_oferta'),basicUrl=checkoutUrl('basico');if(offerUrl)accept.href=offerUrl;if(basicUrl)decline.href=basicUrl;
 accept.addEventListener('click',event=>{event.preventDefault();goToCheckout('completo_oferta')});
 decline.addEventListener('click',event=>{event.preventDefault();goToCheckout('basico')});
 upgradeDialog.querySelector('[data-upgrade-close]').addEventListener('click',()=>upgradeDialog.close());
 upgradeDialog.addEventListener('close',()=>{document.body.style.overflow='';upgradeReturnFocus?.focus()});
}
const dialog=document.getElementById('catalogo-modal');let returnFocus=null;
document.querySelectorAll('[data-open-gallery]').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('[data-close-gallery]').focus()}));
dialog.querySelectorAll('[data-close-gallery]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';returnFocus?.focus()});
dialog.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{dialog.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===button)));dialog.querySelectorAll('[data-species]').forEach(figure=>figure.hidden=button.dataset.filter!=='todos'&&figure.dataset.species!==button.dataset.filter)}));
document.querySelectorAll('button[data-faq]').forEach(button=>button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));const panel=button.nextElementSibling;panel.classList.toggle('grid-rows-[1fr]',open);panel.classList.toggle('grid-rows-[0fr]',!open);panel.classList.toggle('opacity-100',open);panel.classList.toggle('opacity-0',!open);button.querySelector('[aria-hidden]').classList.toggle('rotate-45',open)}));

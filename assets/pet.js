'use strict';
const plans=document.getElementById('planos');
document.querySelectorAll('[data-scroll-plans]').forEach(button=>button.addEventListener('click',()=>plans.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})));
const upgradeDialog=document.getElementById('pet-upgrade-modal');let upgradeReturnFocus=null;
function checkoutUrl(key){const url=window.PET_CHECKOUTS?.[key];return typeof url==='string'&&/^https:\/\//i.test(url)?url:null;}
let checkoutNavigationPending=false;
function trackPetCheckout(key){
 const value={basico:14.90,completo:29.90,completo_oferta:19.90}[key];
 if(typeof window.fbq==='function'&&value){try{window.fbq('track','InitiateCheckout',{value,currency:'BRL',content_name:key==='basico'?'Pack Básico Pet - 8 temas':'Completo Pet - 100 modelos prontos',content_ids:[key],content_type:'product',num_items:1});}catch(e){/* Tracking must not block checkout. */}}
}
function goToCheckout(key){const url=checkoutUrl(key);if(upgradeDialog?.open)upgradeDialog.close();if(url){if(checkoutNavigationPending)return;checkoutNavigationPending=true;trackPetCheckout(key);setTimeout(()=>window.location.assign(url),180);}else plans.scrollIntoView({behavior:'smooth',block:'start'});}
document.querySelectorAll('[data-plan]').forEach(link=>{
 const key=link.dataset.plan,url=checkoutUrl(key);if(url)link.href=url;
 if(key==='basico')link.addEventListener('click',event=>{event.preventDefault();upgradeReturnFocus=link;if(!upgradeDialog.open){upgradeDialog.showModal();document.body.style.overflow='hidden';upgradeDialog.querySelector('[data-upgrade-close]').focus();}});
 else link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey){if(url)trackPetCheckout(key);return;}event.preventDefault();goToCheckout(key)});
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
const petZoom=document.getElementById('pet-image-lightbox');document.querySelectorAll('[data-pet-zoom]').forEach(img=>{img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar imagem');const open=()=>{petZoom.querySelector('img').src=img.src;petZoom.querySelector('img').alt=img.alt;petZoom.showModal()};img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});petZoom?.querySelector('button').addEventListener('click',()=>petZoom.close());

'use strict';
(() => {
 const root=document.getElementById('miolo-por-dentro');
 if(!root)return;
 const track=root.querySelector('.pet-miolo-scroll'),slides=[...root.querySelectorAll('.pet-miolo-slide')];
 const prev=root.querySelector('[data-miolo-prev]'),next=root.querySelector('[data-miolo-next]'),counter=root.querySelector('[data-miolo-current]');
 let current=0,scheduled=false;
 const positions=()=>slides.map(s=>s.offsetLeft-slides[0].offsetLeft);
 function sync(){
  const offsets=positions();current=offsets.reduce((best,value,i)=>Math.abs(value-track.scrollLeft)<Math.abs(offsets[best]-track.scrollLeft)?i:best,0);
  counter.textContent=String(current+1);prev.disabled=current===0;next.disabled=current===slides.length-1;
  slides.forEach((s,i)=>s.setAttribute('aria-current',String(i===current)));
 }
 function go(index){
  const i=Math.max(0,Math.min(slides.length-1,index));
  track.scrollTo({left:positions()[i],behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 }
 prev.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));
 track.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;sync()});}},{passive:true});
 track.addEventListener('keydown',event=>{
  const index=event.key==='ArrowRight'?current+1:event.key==='ArrowLeft'?current-1:event.key==='Home'?0:event.key==='End'?slides.length-1:null;
  if(index!==null){event.preventDefault();go(index);}
 });
 new ResizeObserver(sync).observe(track);sync();
})();

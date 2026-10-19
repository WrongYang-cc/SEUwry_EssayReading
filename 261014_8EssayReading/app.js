const sections=[...document.querySelectorAll('main section[id]')];
const nav=[...document.querySelectorAll('.rail nav a')];
const progress=document.querySelector('#progress');
function updateScroll(){
  const y=scrollY+innerHeight*.28;
  let active=sections[0]?.id;
  sections.forEach(s=>{if(s.offsetTop<=y)active=s.id});
  nav.forEach(a=>a.classList.toggle('active',a.hash===`#${active}`));
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=`${max?scrollY/max*100:0}%`;
}
addEventListener('scroll',updateScroll,{passive:true});updateScroll();
document.querySelector('#fullscreen').addEventListener('click',async()=>{
  try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch(e){}
});
const buttons=[...document.querySelectorAll('.figure-open')];
const viewer=document.querySelector('#viewer');
const image=document.querySelector('#viewer-image');
const caption=document.querySelector('#viewer-caption');
let index=0;
function render(i){
  index=(i+buttons.length)%buttons.length;
  const b=buttons[index]; image.src=b.dataset.src; image.alt=b.dataset.caption||'';
  image.classList.remove('zoomed'); caption.textContent=`${String(index+1).padStart(2,'0')} / ${buttons.length}　${b.dataset.caption||''}`;
}
buttons.forEach((b,i)=>b.addEventListener('click',()=>{render(i);viewer.showModal()}));
document.querySelector('#prev').addEventListener('click',()=>render(index-1));
document.querySelector('#next').addEventListener('click',()=>render(index+1));
document.querySelector('#close').addEventListener('click',()=>viewer.close());
document.querySelector('#zoom').addEventListener('click',()=>image.classList.toggle('zoomed'));
image.addEventListener('dblclick',()=>image.classList.toggle('zoomed'));
viewer.addEventListener('click',e=>{if(e.target===viewer) viewer.close()});
addEventListener('keydown',e=>{
  if(!viewer.open)return;
  if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a'){e.preventDefault();render(index-1)}
  if(e.key==='ArrowRight'||e.key.toLowerCase()==='d'){e.preventDefault();render(index+1)}
});

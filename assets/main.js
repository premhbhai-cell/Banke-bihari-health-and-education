document.addEventListener('DOMContentLoaded',()=>{
 const b=document.querySelector('.burger'),n=document.querySelector('nav');
 if(b)b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
 document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
 const lb=document.querySelector('.lb');
 if(lb){document.querySelectorAll('.gal img').forEach(i=>i.addEventListener('click',()=>{lb.querySelector('img').src=i.src;lb.classList.add('on')}));lb.addEventListener('click',()=>lb.classList.remove('on'))}
 document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(btn.dataset.copy);const t=btn.textContent;btn.textContent='✔ कॉपी हो गया';setTimeout(()=>btn.textContent=t,1800)}catch(e){prompt('कॉपी करें:',btn.dataset.copy)}}));
 const f=document.getElementById('vform');
 if(f)f.addEventListener('submit',e=>{e.preventDefault();
  const d=new FormData(f);
  const msg=`नमस्ते, मैं ${d.get('name')} हूँ।%0Aफ़ोन: ${d.get('phone')}%0Aशहर: ${d.get('city')||'-'}%0Aविषय: ${d.get('type')}%0Aसंदेश: ${d.get('msg')||'-'}`;
  window.open('https://wa.me/918910808264?text='+msg,'_blank','noopener');});
});

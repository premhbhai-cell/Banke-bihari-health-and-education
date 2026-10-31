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

 /* ---- Hero slider: 1 second per slide ---- */
 const sld=document.getElementById('heroSlider');
 if(sld){
  const sl=[...sld.querySelectorAll('.slide')],dots=sld.querySelector('.dots');let c=0,t=null;
  sl.forEach(e=>{const im=e.querySelector('img'),bg=e.querySelector('.bg'),f=()=>{bg.style.backgroundImage='url("'+im.currentSrc+'")'};im.complete&&im.naturalWidth?f():im.addEventListener('load',f)});
  sl.forEach((_,i)=>dots.appendChild(document.createElement('i')));
  const ds=[...dots.children],show=n=>{c=(n+sl.length)%sl.length;sl.forEach((e,i)=>e.classList.toggle('on',i===c));ds.forEach((e,i)=>e.classList.toggle('on',i===c))};
  const start=()=>{if(!t&&!matchMedia('(prefers-reduced-motion:reduce)').matches)t=setInterval(()=>show(c+1),1000)},stop=()=>{clearInterval(t);t=null};
  show(0);start();
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
 }
 /* ---- Donation: amount buttons -> payment options ---- */
 const hi=document.documentElement.lang!=='en',UPI_ID='';/* UPI ID mile to yahan daalein, e.g. 'name@bank' */
 const L=hi?{t:'सहयोग राशि',o:'भुगतान विकल्प',bank:'बैंक ट्रांसफर (NEFT / IMPS / RTGS)',cp:'खाता संख्या कॉपी करें',cpd:'✔ कॉपी हो गया',wa:'दान की जानकारी WhatsApp करें',call:'फ़ोन पर संपर्क करें',upi:'UPI से दान करें',fine:'दान के बाद कृपया हमें फ़ोन/WhatsApp पर सूचित करें। 80G अनंतिम स्वीकृति प्राप्त।',msg:(a,p)=>`नमस्ते, मैंने ₹${a} का सहयोग (${p}) किया है/करूँगा। कृपया रसीद/जानकारी भेजें।`}
 :{t:'Donation amount',o:'Payment options',bank:'Bank transfer (NEFT / IMPS / RTGS)',cp:'Copy account number',cpd:'✔ Copied',wa:'Share donation details on WhatsApp',call:'Call us',upi:'Donate via UPI',fine:'After donating, please inform us on phone/WhatsApp. 80G provisional approval held.',msg:(a,p)=>`Hello, I have donated / will donate ₹${a} (${p}). Please share the receipt/details.`};
 const dm=document.createElement('dialog');dm.className='dm';dm.setAttribute('aria-label',L.o);document.body.appendChild(dm);
 dm.addEventListener('click',e=>{if(e.target===dm)dm.close()});
 const open=(a,p)=>{a=Math.round(+a);if(!(a>0))return;
  const m=encodeURIComponent(L.msg(a.toLocaleString('en-IN'),p));
  dm.innerHTML=`<div class="in"><button class="x" type="button" aria-label="Close">×</button><h3>${L.t}: ₹${a.toLocaleString('en-IN')}</h3><p class="pur">${p}</p><b>${L.o}</b><div class="opts">`
  +(UPI_ID?`<a class="btn p" href="upi://pay?pa=${UPI_ID}&pn=Banke%20Bihari%20Foundation&am=${a}&cu=INR">${L.upi}</a>`:'')
  +`<a class="btn p" href="https://wa.me/918910808264?text=${m}" target="_blank" rel="noopener">${L.wa}</a><a class="btn o" href="tel:+918910808264">${L.call} 8910808264</a></div>`
  +`<div class="bank"><h3 style="font-size:16px">${L.bank}</h3><dl><dt>A/c No.</dt><dd>120040235980</dd><dt>A/c Name</dt><dd>Banke Bihari Health and Education Charitable Foundation</dd><dt>IFSC</dt><dd>CNRB0004188</dd><dt>Bank</dt><dd>Canara Bank</dd></dl><button class="cp" type="button">${L.cp}</button></div><p class="fine" style="margin-top:12px">${L.fine}</p></div>`;
  dm.querySelector('.x').onclick=()=>dm.close();
  const cp=dm.querySelector('.cp');cp.onclick=async()=>{try{await navigator.clipboard.writeText('120040235980');cp.textContent=L.cpd;setTimeout(()=>cp.textContent=L.cp,1800)}catch(e){prompt(L.cp,'120040235980')}};
  dm.showModal();};
 document.querySelectorAll('[data-donate]').forEach(b=>b.addEventListener('click',()=>{const w=b.closest('[data-purpose]')||b;open(b.dataset.donate,b.dataset.purpose||w.dataset.purpose||'')}));
 document.querySelectorAll('.donpick .custom').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();open(f.amt.value,f.closest('.donpick').dataset.purpose)}));
});

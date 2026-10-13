(function(){
  const d=window.BBF_DATA;
  const $=s=>document.querySelector(s);
  const fallback='assets/images/img1.jpg';
  const safeImg=(src)=>src||fallback;

  const card=(x)=>`<article class="card"><div class="card-media"><img src="${safeImg(x.image)}" alt="${x.title}" onerror="this.src='${fallback}'"></div><div class="card-body"><span class="tag">${x.category}</span><h3>${x.title}</h3><p><b>${x.year}</b> · ${x.place}</p><p>${x.desc}</p></div></article>`;
  const staff=(x,i)=>`<article class="person"><div class="person-photo"><img src="${safeImg(x.image)}" alt="${x.name}" onerror="this.src='${fallback}'"><span class="person-no">${String(i+1).padStart(2,'0')}</span></div><h3>${x.name}</h3><p class="en-name">${x.nameEn}</p><p><b>${x.role}</b></p><p class="en-role">${x.roleEn}</p></article>`;

  $('#internationalGrid').innerHTML=d.international.map(card).join('');
  $('#nationalGrid').innerHTML=d.national.map(card).join('');
  $('#staffGrid').innerHTML=d.staff.map(staff).join('');
  $('#galleryGrid').innerHTML=d.gallery.map((x,i)=>`<a class="gallery-item" href="${x}" target="_blank" rel="noopener"><img src="${x}" alt="BBF Gallery ${i+1}" onerror="this.src='${fallback}'"><span>ছবি ${i+1}</span></a>`).join('');

  const plan=document.createElement('div'); plan.className='container plan-grid';
  plan.innerHTML=d.plan.map(x=>`<article class="plan-card"><div class="plan-year">${x.year}</div><h3>${x.title}</h3><ul>${x.items.map(i=>`<li>${i}</li>`).join('')}</ul></article>`).join('');
  const sec=document.createElement('section'); sec.id='plan'; sec.className='section';
  sec.innerHTML='<div class="container"><div class="section-kicker">৫ বছরের কর্মপরিকল্পনা</div><div class="section-head"><div><h2>২০২৬–২০৩১ নির্বাচিত লক্ষ্য ও প্রধান আয়োজন</h2><p>ফেডারেশনের পাঁচ বছরের পরিকল্পনা থেকে ওয়েবসাইটের জন্য নির্বাচিত প্রধান জাতীয় ও আন্তর্জাতিক কার্যক্রম।</p></div></div></div>';
  sec.querySelector('.container').appendChild(plan); $('#gallery').after(sec);
  $('.links').insertAdjacentHTML('beforeend','<a href="#plan">৫ বছরের পরিকল্পনা</a>');

  const total=d.international.length+d.national.length;
  $('[data-stat=tournaments]').textContent=total+'+';
  $('[data-stat=international]').textContent=d.international.length+'+';
  $('[data-stat=staff]').textContent=d.staff.length+'+';
  $('#year').textContent=new Date().getFullYear();

  // 5-second HD hero slider. Replace img1.jpg ... img5.jpg with your own photos.
  const hero=$('.hero');
  const dots=$('.hero-dots');
  let current=0;
  function showSlide(i){
    current=i;
    hero.dataset.slide=String(i);
    dots.querySelectorAll('button').forEach((b,n)=>b.classList.toggle('active',n===i));
  }
  if(d.hero && d.hero.length){
    d.hero.forEach((src,i)=>{const preload=new Image(); preload.src=src;});
    dots.innerHTML=d.hero.map((_,i)=>`<button aria-label="স্লাইড ${i+1}" ${i===0?'class="active"':''}></button>`).join('');
    dots.querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>showSlide(i)));
    setInterval(()=>showSlide((current+1)%d.hero.length),5000);
  }

  const menu=$('.menu');
  menu.addEventListener('click',()=>$('.links').classList.toggle('show'));
  document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>$('.links').classList.remove('show')));
})();

// A guided, viewport-aware presentation. Manual interaction always takes priority.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = false;
  const tours = [];
  const button = document.createElement('button');
  button.className = 'motion-control';
  button.setAttribute('aria-label', 'Tạm dừng chuyển nội dung tự động');
  // document.querySelector('footer').append(button);
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.append(progress);

  function updateControl() {
    button.innerHTML = `<i></i><span>${enabled ? 'Đang dẫn chuyện' : 'Đã dừng tự động'}</span><b>${enabled ? 'Ⅱ' : '▷'}</b>`;
    button.setAttribute('aria-pressed',String(enabled));
    button.setAttribute('aria-label',enabled ? 'Tạm dừng chuyển nội dung tự động' : 'Bật chuyển nội dung tự động');
    document.body.classList.toggle('guided-motion',enabled);
  }
  button.onclick = () => {enabled = !enabled; updateControl(); tours.forEach(t=>t.sync());};
  reduced.addEventListener('change',()=>{enabled=!reduced.matches;updateControl();tours.forEach(t=>t.sync());});
  updateControl();

  function tour(selector, steps, period, start=0) {
    const target = document.querySelector(selector);
    let visible=false, manual=false, hover=false, timer=null, index=start;
    const hint=document.createElement('div');
    hint.className='tour-hint';
    hint.innerHTML='<span><i></i> TỰ ĐỘNG KHÁM PHÁ</span><small>Chạm để chọn và dừng tại nội dung bạn muốn đọc</small>';
    target.before(hint);
    const sync = () => {
      clearTimeout(timer); timer=null;
      const active=enabled&&visible&&!manual&&!hover&&!document.hidden;
      target.classList.toggle('tour-running',active);
      hint.classList.toggle('running',active);
      hint.querySelector('span').innerHTML=`<i></i> ${manual?'BẠN ĐANG ĐIỀU KHIỂN':enabled?'TỰ ĐỘNG KHÁM PHÁ':'ĐÃ DỪNG TỰ ĐỘNG'}`;
      if(active) timer=setTimeout(async()=>{
        await steps[index % steps.length](); index++;
        sync();
      },period);
    };
    const stopManual=()=>{manual=true;sync();};
    target.addEventListener('pointerdown',stopManual);
    target.addEventListener('keydown',stopManual);
    target.addEventListener('focusin',()=>{hover=true;sync();});
    target.addEventListener('focusout',e=>{if(!target.contains(e.relatedTarget)){hover=false;sync();}});
    target.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;sync();}});
    target.addEventListener('pointerleave',()=>{hover=false;sync();});
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.25}).observe(target);
    const state={sync};tours.push(state);
    return stopManual;
  }
  const stopArchitecture=tour('#architecture-panel',architectures.map((_,i)=>()=>showArchitecture(i)),9000,2);
  document.querySelector('#architecture-tabs').addEventListener('pointerdown',stopArchitecture);
  document.querySelector('#architecture-tabs').addEventListener('keydown',stopArchitecture);
  tour('.system-grid',tiers.map((_,i)=>()=>showTier(i)),6500,1);
  tour('.sequence',[()=>showSequence(false),()=>showSequence(true)],8000);
  document.addEventListener('visibilitychange',()=>tours.forEach(t=>t.sync()));

  // Run a single real demo when its controls enter view; never override a chosen scenario.
  let demoTouched=false, demoPlayed=false;
  const demo=document.querySelector('.playground');
  demo.addEventListener('pointerdown',()=>demoTouched=true);
  demo.addEventListener('keydown',()=>demoTouched=true);
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&enabled&&!document.hidden&&!demoTouched&&!demoPlayed){
      demoPlayed=true;
      document.querySelector('#send').click();
    }
  },{threshold:.7}).observe(document.querySelector('.request-bar'));
  // Choosing a scenario is enough: automatically send it, instead of asking for another click.
  const scenario=document.querySelector('#scenario');
  const previousChange=scenario.onchange;
  scenario.onchange=()=>{previousChange();document.querySelector('#send').click();};
  new MutationObserver(()=>{
    if(!reduced.matches)animate(document.querySelector('#response-code'));
  }).observe(document.querySelector('#response-code'),{childList:true});

  // Open explanatory content as it approaches, one time only; later choices are preserved.
  document.querySelectorAll('.trade-list details').forEach(detail=>{
    let touched=false;
    detail.addEventListener('pointerdown',()=>touched=true);
    detail.addEventListener('keydown',()=>touched=true);
    const io=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){if(enabled&&!touched)detail.open=true;io.disconnect();}
    },{rootMargin:'0px 0px -12% 0px',threshold:.5});
    io.observe(detail);
  });

  // Reveal individual rows and cards, so scrolling unfolds the page rather than whole blocks.
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target);}
  }),{threshold:.12,rootMargin:'0px 0px -4% 0px'});
  document.querySelectorAll('.section-head h2,.reasons article,.alternatives p,.sources a,.trade-list details,.decision-options button,.case-feature,.closing h2,#comparison tbody tr').forEach((el,i)=>{
    el.classList.add('reveal-item');el.style.setProperty('--item-delay',`${i%3*65}ms`);revealObserver.observe(el);
  });
  const sequence=document.querySelector('#sequence-steps');
  function cascadeSteps(){[...sequence.children].forEach((el,i)=>{
    if(!reduced.matches)el.animate([{opacity:0,transform:'translateX(-18px)'},{opacity:1,transform:'translateX(0)'}],{duration:650,delay:i*130,fill:'backwards',easing:'cubic-bezier(.22,1,.36,1)'});
  });}
  new MutationObserver(cascadeSteps).observe(sequence,{childList:true});
  new IntersectionObserver(entries=>{if(entries[0].isIntersecting)cascadeSteps();},{threshold:.3}).observe(sequence);

  // A short ripple gives every click weight, without moving the surrounding layout.
  document.addEventListener('click',event=>{
    const target=event.target.closest('button,.button');
    if(!target||target.disabled||reduced.matches)return;
    const ripple=document.createElement('span');ripple.className='click-ripple';
    const rect=target.getBoundingClientRect();
    ripple.style.left=`${event.clientX ? event.clientX-rect.left : rect.width/2}px`;
    ripple.style.top=`${event.clientY ? event.clientY-rect.top : rect.height/2}px`;
    target.append(ripple);
    ripple.animate([{opacity:.35,transform:'translate(-50%,-50%) scale(0)'},{opacity:0,transform:'translate(-50%,-50%) scale(9)'}],{duration:750,easing:'cubic-bezier(.22,1,.36,1)'}).onfinish=()=>ripple.remove();
  });
  // Transform-only tilt on the hero graphic; no document scroll handlers or rendering loop.
  const network=document.querySelector('.network');
  network.addEventListener('pointermove',e=>{
    if(reduced.matches||e.pointerType!=='mouse')return;
    const box=network.getBoundingClientRect();
    network.style.transform=`perspective(1000px) rotateX(${-(e.clientY-box.top-box.height/2)/60}deg) rotateY(${(e.clientX-box.left-box.width/2)/60}deg)`;
  });
  network.addEventListener('pointerleave',()=>network.style.transform='');
  new IntersectionObserver(entries=>{network.classList.toggle('offscreen',!entries[0].isIntersecting);},{threshold:0}).observe(network);
  const chapterTrack=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const all=[...document.querySelectorAll('.chapter')];
    progress.style.setProperty('--chapter-progress',(all.indexOf(e.target)+1)/all.length);
    document.querySelectorAll('.nav nav a').forEach(a=>a.classList.toggle('current',a.hash===`#${e.target.id}`));
  }),{rootMargin:'-15% 0px -65% 0px'});
  document.querySelectorAll('.chapter').forEach(el=>chapterTrack.observe(el));
})();

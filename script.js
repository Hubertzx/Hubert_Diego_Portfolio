// LIGHTBOX
function openLb(el){const lb=document.getElementById('lb');const img=el.querySelector('img');document.getElementById('lbImg').src=img.src;lb.classList.add('open');}
document.getElementById('lbClose').addEventListener('click',()=>document.getElementById('lb').classList.remove('open'));
document.getElementById('lb').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('lb').classList.remove('open');});

window.addEventListener('scroll',()=>{
  const sc=window.scrollY,tot=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('pbar').style.width=(sc/tot*100)+'%';
  document.getElementById('nav').classList.toggle('scrolled',sc>40);
  document.getElementById('btop').classList.toggle('show',sc>400);
});
document.getElementById('btop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function animR(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;curR.style.left=rx+'px';curR.style.top=ry+'px';requestAnimationFrame(animR);})();
document.querySelectorAll('a,button,.pc,.sk-card,.ec,.clink,.srv-card,.testi-card,.cert-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.classList.add('x');curR.classList.add('x');});
  el.addEventListener('mouseleave',()=>{cur.classList.remove('x');curR.classList.remove('x');});
});

const ham=document.getElementById('ham'),drw=document.getElementById('drawer'),dc=document.getElementById('dClose');
ham.addEventListener('click',()=>{ham.classList.toggle('open');drw.classList.toggle('open');});
dc.addEventListener('click',()=>{ham.classList.remove('open');drw.classList.remove('open');});
document.querySelectorAll('.dl').forEach(a=>a.addEventListener('click',()=>{ham.classList.remove('open');drw.classList.remove('open');}));

const thBtn=document.getElementById('thBtn');
thBtn.addEventListener('click',()=>{document.body.classList.toggle('dark');thBtn.textContent=document.body.classList.contains('dark')?'☀️':'🌙';});

const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>{
        e.target.classList.add('in');
        e.target.querySelectorAll('.sk-fill').forEach(b=>{b.style.width=b.dataset.w+'%';});
      },i*80);
      obs.unobserve(e.target);
    }
  });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target,target=+el.dataset.count,suffix=el.querySelector('span').textContent;
      let cur=0;const dur=1600,step=target/dur*16;
      const t=setInterval(()=>{cur=Math.min(cur+step,target);el.innerHTML=Math.floor(cur)+'<span>'+suffix+'</span>';if(cur>=target)clearInterval(t);},16);
      counterObs.unobserve(el);
    }
  });
},{threshold:.5});
document.querySelectorAll('.s-num[data-count]').forEach(el=>counterObs.observe(el));

document.querySelectorAll('.st').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.st').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat=btn.dataset.cat;
    document.querySelectorAll('#skGrid .sk-card').forEach(card=>{card.style.display=(cat==='all'||card.dataset.c.includes(cat))?'':'none';});
    setTimeout(()=>{document.querySelectorAll('#skGrid .sk-fill').forEach(b=>{b.style.width='0%';setTimeout(()=>b.style.width=b.dataset.w+'%',100);});},50);
  });
});

document.querySelectorAll('.pf').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.pf').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.f;
    document.querySelectorAll('.pc').forEach(c=>{c.style.display=(f==='all'||c.dataset.t.includes(f))?'':'none';});
  });
});

document.getElementById('cForm').addEventListener('submit',async function(e){
  e.preventDefault();
  const btn=document.getElementById('fBtn'),txt=document.getElementById('fTxt'),ico=document.getElementById('fIco');
  const fname=document.getElementById('f_fname').value.trim();
  const lname=document.getElementById('f_lname').value.trim();
  const email=document.getElementById('f_email').value.trim();
  const subject=document.getElementById('f_subject').value;
  const message=document.getElementById('f_message').value.trim();
  if(!fname||!email||!message){txt.textContent='Fill required fields';return;}
  btn.disabled=true;txt.textContent='Sending...';ico.textContent='⏳';
  const body=encodeURIComponent(`Name: ${fname} ${lname}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`);
  window.location.href=`mailto:Hubertdiego688@gmail.com?subject=${encodeURIComponent(subject+' — from '+fname)}&body=${body}`;
  btn.classList.add('sent');txt.textContent='Opening Email App ✓';ico.textContent='';
  setTimeout(()=>{btn.classList.remove('sent');btn.disabled=false;txt.textContent='Send Message';ico.textContent='→';this.reset();},3500);
});

const secs=document.querySelectorAll('section[id]');
const nls=document.querySelectorAll('.nav-links a');
secs.forEach(s=>new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){nls.forEach(a=>a.classList.remove('active'));const m=document.querySelector(`.nav-links a[href="#${s.id}"]`);if(m)m.classList.add('active');}
},{threshold:.35}).observe(s));
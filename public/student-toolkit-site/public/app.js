
const F={
sppu:c=>c>=9.5?20*c-100:c>=8.25?12*c-25:c>=6.75?10*c-7.5:c>=5.75?5*c+26.25:c>=4.75?10*c-2.5:c>=4?6.6*c+13.6:NaN,
mueng:c=>7.1*c+11,muother:c=>(c-0.75)*10,vtu:c=>(c-0.75)*10,anna:c=>c*10,
cbse:c=>c*9.5,simple:c=>c*10,aktu:c=>c*10-7.5};
function inv(fn,p){let b=null,d=1e9;for(let c=0;c<=10.001;c+=0.01){const v=fn(c);if(isNaN(v))continue;const e=Math.abs(v-p);if(e<d){d=e;b=c}}return d<0.5?b:null}
document.querySelectorAll('[data-tool="conv"]').forEach(box=>{
 const q=s=>box.querySelector(s),sel=q('.cfm'),mode=q('.cmode'),lab=q('.clab');
 mode.onchange=()=>lab.textContent=mode.value==='c2p'?'Enter CGPA / SGPA':'Enter percentage';
 q('.cbtn').onclick=()=>{
  const v=parseFloat(q('.cin').value),fn=F[sel?sel.value:box.dataset.f],r=q('.cres');r.classList.remove('hide');
  if(isNaN(v)||v<0){r.textContent='Please enter a valid number.';return}
  if(mode.value==='c2p'){if(v>10){r.textContent='Enter a value from 0 to 10.';return}
   const o=fn(v);r.textContent=isNaN(o)?'This value is outside the official formula range.':'≈ '+Math.min(o,100).toFixed(2)+' %'}
  else{const o=inv(fn,v);r.textContent=o===null?'No matching CGPA for this percentage.':'≈ '+o.toFixed(2)+' CGPA'}};
});
const sb=document.getElementById('subs');
if(sb){
 const add=()=>{const d=document.createElement('div');d.className='row';
  d.innerHTML='<input placeholder="Subject"><input type="number" placeholder="Credits" inputmode="decimal"><input type="number" placeholder="Grade pt" inputmode="decimal"><button class="sm" aria-label="Remove">✕</button>';
  d.querySelector('button').onclick=()=>d.remove();sb.appendChild(d)};
 add();add();add();document.getElementById('addsub').onclick=add;
 document.getElementById('sbtn').onclick=()=>{let tc=0,tp=0;
  sb.querySelectorAll('.row').forEach(r=>{const i=r.querySelectorAll('input'),c=parseFloat(i[1].value),g=parseFloat(i[2].value);if(!isNaN(c)&&!isNaN(g)){tc+=c;tp+=c*g}});
  const r=document.getElementById('sres');r.classList.remove('hide');r.textContent=tc?'SGPA: '+(tp/tc).toFixed(2):'Add credits and grade points first.'};
 document.getElementById('gbtn').onclick=()=>{const a=document.getElementById('sg').value.split(',').map(x=>parseFloat(x.trim())).filter(x=>!isNaN(x));
  const r=document.getElementById('gres');r.classList.remove('hide');r.textContent=a.length?'CGPA (simple average): '+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2):'Enter at least one SGPA.'};
}
const el=document.getElementById('elist');
if(el){let ex=[];try{ex=JSON.parse(localStorage.getItem('exams')||'[]')}catch(e){}
 const save=()=>{try{localStorage.setItem('exams',JSON.stringify(ex))}catch(e){}};
 const dl=d=>{const t=new Date();t.setHours(0,0,0,0);return Math.round((new Date(d+'T00:00:00')-t)/864e5)};
 const draw=()=>{ex.sort((a,b)=>a.d.localeCompare(b.d));el.innerHTML='';const pl=document.getElementById('plan');pl.innerHTML='';
  if(!ex.length){el.innerHTML='<p class="muted">No exams yet. Add one above.</p>';return}
  ex.forEach((e,i)=>{const n=dl(e.d),col=n<0?'var(--muted)':n<=7?'var(--bad)':n<=21?'var(--warn)':'var(--ok)';
   const r=document.createElement('div');r.className='exam';
   const l=document.createElement('div'),a=document.createElement('div'),b=document.createElement('div');a.textContent=e.n;b.className='muted';b.textContent=e.d;l.append(a,b);
   const m=document.createElement('div');m.className='days';m.style.color=col;m.textContent=n<0?'Done':n===0?'Today!':n+' days';
   const x=document.createElement('button');x.className='sm';x.textContent='✕';x.onclick=()=>{ex.splice(i,1);save();draw()};
   r.append(l,m,x);el.appendChild(r)});
  const up=ex.filter(e=>dl(e.d)>0);
  if(up.length){const n=dl(up[0].d),per=Math.max(1,Math.round(n/up.length));
   pl.innerHTML='<div class="res" style="font-size:.95rem">📅 Next exam is in '+n+' days. With '+up.length+' upcoming exam(s), give each about '+per+' day(s) of focused prep and revise the nearest one daily.</div>'}};
 document.getElementById('ebtn').onclick=()=>{const n=document.getElementById('en').value.trim(),d=document.getElementById('ed').value;if(!n||!d)return;ex.push({n,d});save();document.getElementById('en').value='';draw()};
 draw()}

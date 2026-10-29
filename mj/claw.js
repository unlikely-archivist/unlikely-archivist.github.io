(() => {
'use strict';
const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const prizes = [
 {name:'Anna Nicole Smith',src:'anna-nicole.png'},
 {name:'Paris Hilton',src:'paris.png'},
 {name:'Lindsay Lohan',src:'lindsay.png'},
 {name:'Nicole Richie',src:'nicole.png'},
 {name:'Trisha Paytas',src:'trisha.png'}
];
function art(p){return `<image href="assets/plushies/${p.src}" x="-34" y="-53" width="68" height="104" preserveAspectRatio="xMidYMid meet"/>`;}
let owned = new Set();
try { const saved=JSON.parse(localStorage.getItem('molly-celebrity-plushies-v2'));if(Array.isArray(saved))owned=new Set(saved.filter(i=>Number.isInteger(i)&&i>=0&&i<prizes.length)); } catch {}
function collection(){
 $('count').textContent=`${owned.size} / ${prizes.length}`;
 $('collection').innerHTML=prizes.map((p,i)=>`<div class="prize"><svg viewBox="-40 -56 80 110" class="${owned.has(i)?'':'unknown'}" aria-hidden="true">${art(p)}</svg>${owned.has(i)?p.name:'???'}</div>`).join('');
}
const positions=[{x:70,y:242},{x:125,y:220},{x:180,y:249},{x:235,y:216},{x:290,y:244}];
const toys=prizes.map((p,i)=>{const g=document.createElementNS(NS,'g');g.innerHTML=art(p);g.setAttribute('transform',`translate(${positions[i].x} ${positions[i].y}) scale(1.45)`);$('toys').append(g);return g;});
let x=180,y=57,busy=false,dir=0,last=0,closed=false;
function draw(){ $('rope').setAttribute('d',`M${x} 30V${y}`);$('carriage').setAttribute('transform',`translate(${x} 0)`);$('claw').setAttribute('transform',`translate(${x} ${y})`);$('fingers').setAttribute('d',closed?'M0 0v12m0-7l-16 15 9 12m7-27l16 15-9 12':'M0 0v12m0-7l-23 15-3 12M0 5l23 15 3 12');$('held').setAttribute('transform',`translate(${x} ${y+102}) scale(1.45)`); }
function frame(t){if(!busy&&dir)x=Math.max(32,Math.min(328,x+dir*Math.min(t-last,40)*.18));last=t;draw();requestAnimationFrame(frame);}
function tween(tx,ty,ms){return new Promise(resolve=>{const sx=x,sy=y,start=performance.now();function step(t){const a=Math.min(1,(t-start)/ms),v=a*a*(3-2*a);x=sx+(tx-sx)*v;y=sy+(ty-sy)*v;draw();if(a<1)requestAnimationFrame(step);else resolve();}requestAnimationFrame(step);});}
async function drop(){
 if(busy)return;busy=true;dir=0;document.querySelectorAll('button').forEach(b=>b.disabled=true);$('message').textContent='Down we go…';
 // The first plushie under the open claw blocks those below it.
 const target=positions.map((p,i)=>({...p,i})).filter(p=>Math.abs(p.x-x)<30).sort((a,b)=>a.y-b.y)[0];
 await tween(x,target?target.y-102:252,700);closed=true;draw();
 const caught=target&&Math.abs(target.x-x)<=18;
 if(caught){toys[target.i].style.visibility='hidden';$('held').innerHTML=art(prizes[target.i]);}
 await tween(x,57,750);
 if(caught){await tween(48,57,650);closed=false;await tween(48,245,500);$('held').innerHTML='';const fresh=!owned.has(target.i);owned.add(target.i);try{localStorage.setItem('molly-celebrity-plushies-v2',JSON.stringify([...owned]));}catch{}collection();$('message').textContent=`${fresh?'You won':'Another'} ${prizes[target.i].name}!${owned.size===prizes.length?' All five icons collected!':''}`;toys[target.i].style.visibility='';}
 else $('message').textContent='Ooh, just missed! Aim for the middle of a plushie.';
 closed=false;await tween(180,57,500);busy=false;document.querySelectorAll('button').forEach(b=>b.disabled=false);
}
for(const [id,d] of [['left',-1],['right',1]]){
 $(id).addEventListener('pointerdown',e=>{if(busy||e.button>0)return;e.preventDefault();dir=d;$(id).setPointerCapture(e.pointerId);});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])$(id).addEventListener(event,()=>dir=0);
 $(id).addEventListener('click',e=>{if(e.detail===0&&!busy)x=Math.max(32,Math.min(328,x+d*12));});
}
$('drop').addEventListener('click',drop);
document.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey)return;if(['ArrowLeft','ArrowRight',' '].includes(e.key)){if(e.key===' '&&e.target.tagName==='BUTTON')return;e.preventDefault();if(!busy){if(e.key===' ')drop();else dir=e.key==='ArrowLeft'?-1:1;}}});
document.addEventListener('keyup',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')dir=0;});
window.addEventListener('blur',()=>dir=0);document.addEventListener('visibilitychange',()=>dir=0);
collection();draw();requestAnimationFrame(frame);
})();

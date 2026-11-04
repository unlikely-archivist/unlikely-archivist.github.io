(() => {
'use strict';
// Feast catch: Molly, in whatever she's wearing in her room, catches the falling feast in a basket.
// Dropping food or catching a sprout costs a heart. Everything is drawn on a 1080 × 1350 canvas;
// Molly is drawn at half her doll-base.png size (so her 12px blocks become 6px), and so is the food.
const $ = id => document.getElementById(id);
const GW = 1080, GH = 1350, S = 0.5, B = P * S; // B = one block on screen
const TOP = 60;                                 // room above her head for the hat (it sits at y -36)
const MW = DOLL_W * S, MH = (DOLL_H + TOP) * S; // Molly's sprite size on the canvas
const MOLLY_Y = GH - 18 - MH;
const BASKET = { x0: 180, x1: 910, y: 770, h: 120 }; // in doll pixels, held across her hips
const MOUTH_Y = MOLLY_Y + (TOP + BASKET.y) * S;
const FOOD = 12 * B; // food sprites are 12 × 12 blocks

// ---- the menu ----
// When the sprite sheet is ready: set SHEET.src (e.g. 'assets/feast-sprites.png'), the size of one cell,
// and each food's [column, row] on the sheet. Until then the little block drawings below are used.
const SHEET = { src: null, size: 64, frames: { drumstick: [0, 0], pie: [1, 0], corn: [2, 0], cranberry: [3, 0], roll: [4, 0], sprout: [5, 0] } };
const FOODS = {
  drumstick: { name: 'turkey leg', points: 10, weight: 5, rows: ['.....bbbb...', '....bmmmmb..', '...bmhmmmmb.', '...bmmmmmmb.', '...bmmmmmmb.', '....bmmmmb..', '....wbbbb...', '...ww.......', '..ww........', 'www.........', 'w.w.........', '............'], pal: { b: '#6b3a1e', m: '#b8662d', h: '#e09a52', w: '#f6efe0' } },
  pie: { name: 'pumpkin pie', points: 25, weight: 2, rows: ['............', '.....ww.....', 'cc..wwww....', 'cfccww......', 'cfffcc......', 'cfffffcc....', 'cfffffffcc..', 'cfffffffffcc', 'cccccccccccc', '.dddddddddd.', '............', '............'], pal: { c: '#e6b46a', f: '#e0782b', d: '#b98345', w: '#fff8ee' } },
  corn: { name: 'corn', points: 10, weight: 4, rows: ['.....yy.....', '....yYyy....', '....yyYy....', '...gyYyyg...', '...gyyYyg...', '..ggyYyygg..', '..ggyyYygg..', '.gg.yYyy.gg.', '.g..yyYy..g.', '....gyyg....', '.....gg.....', '............'], pal: { y: '#ffd34d', Y: '#f2b632', g: '#7aa83a' } },
  cranberry: { name: 'cranberry sauce', points: 15, weight: 3, rows: ['............', '...rrrrrr...', '..rRrrrrrr..', '..rrrrrrrr..', '..dddddddd..', '..rRrrrrrr..', '..rrrrrrrr..', '..dddddddd..', '..rRrrrrrr..', '..rrrrrrrr..', '...rrrrrr...', '............'], pal: { r: '#c8233c', R: '#ef5a6e', d: '#8f1428' } },
  roll: { name: 'dinner roll', points: 5, weight: 5, rows: ['............', '............', '....tttt....', '..ttTTtttt..', '.ttTTttttbt.', '.tttttttbbt.', '.tttttbbbtt.', '.ttbbbbttt..', '..tttttt....', '............', '............', '............'], pal: { t: '#e7b071', T: '#f6d6a0', b: '#c98b4a' } },
  sprout: { name: 'brussels sprout', bad: true, rows: ['............', '.....gg.....', '...gGGgg....', '..gGllGgg...', '..gllGlgg...', '..gGlGlgg...', '..ggGlgGg...', '...gggGg....', '....ggg.....', '.....d......', '............', '............'], pal: { g: '#4f7d2c', G: '#6fa03c', l: '#a9d36a', d: '#3a5a20' } },
};
const INK = '#2b1a1a';
function blocks(rows, pal, outline) { // a little block drawing, one canvas pixel per block, with an outline around it
  const w = rows[0].length + 2, h = rows.length + 2, c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d'), filled = (x, y) => rows[y] && pal[rows[y][x]];
  for (let y = -1; y <= rows.length; y++) for (let x = -1; x <= rows[0].length; x++) {
    const col = filled(x, y) || (outline && (filled(x - 1, y) || filled(x + 1, y) || filled(x, y - 1) || filled(x, y + 1)) ? INK : null);
    if (col) { g.fillStyle = col; g.fillRect(x + 1, y + 1, 1, 1); }
  }
  return c;
}
for (const f of Object.values(FOODS)) f.art = { img: blocks(f.rows, f.pal, true), sx: 0, sy: 0, s: 14 };
if (SHEET.src) {
  const sheet = new Image();
  sheet.onload = () => { for (const [k, [c, r]] of Object.entries(SHEET.frames)) FOODS[k].art = { img: sheet, sx: c * SHEET.size, sy: r * SHEET.size, s: SHEET.size, sheet: true }; menu(); };
  sheet.src = SHEET.src;
}
function drawFood(g, f, x, y, size) {
  const a = f.art, pad = a.sheet ? 0 : size / 12; // the block drawings have a one-block outline border
  g.imageSmoothingEnabled = false;
  g.drawImage(a.img, a.sx, a.sy, a.s, a.s, x - pad, y - pad, size + 2 * pad, size + 2 * pad);
}
function menu() {
  $('menu').innerHTML = '';
  for (const f of Object.values(FOODS)) {
    const d = document.createElement('div'); d.className = 'food' + (f.bad ? ' bad' : '');
    const c = document.createElement('canvas'); c.width = c.height = 48; drawFood(c.getContext('2d'), f, 4, 4, 40);
    d.append(c, f.bad ? `${f.name}: yuck!` : `${f.name} +${f.points}`);
    $('menu').append(d);
  }
}
menu();

// ---- Molly in her outfit (saved by her room in localStorage), holding the basket ----
let placed = {};
try { placed = JSON.parse(localStorage.getItem('molly-placed')) || {}; } catch {}
const molly = document.createElement('canvas');
molly.width = MW; molly.height = MH;
const load = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; });
(async function dressMolly() {
  const [base, hair] = await Promise.all([load('assets/doll-base.png'), load('assets/hair-front.png')]);
  const layers = [{ img: base, x: 0, y: 0, w: DOLL_W, z: 0 }, { img: hair, x: 0, y: 0, w: DOLL_W, z: 4 }];
  for (const it of ITEMS) {
    const p = placed[it.id];
    if (!Array.isArray(p)) continue;
    const img = await load(it.front || it.src);
    if (!img) continue;
    const cx = p[0] + it.w / 2, cy = p[1] + it.w * img.naturalHeight / img.naturalWidth / 2;
    if (cx < 0 || cx > DOLL_W || cy < 0 || cy > DOLL_H) continue; // lying somewhere in her room, not on her
    layers.push({ img, x: p[0], y: p[1], w: it.w, z: it.z });
    if (it.back) { const back = await load(it.back); if (back) layers.push({ img: back, x: p[0], y: p[1], w: it.w, z: -1 }); }
  }
  const g = molly.getContext('2d');
  g.imageSmoothingEnabled = false;
  for (const L of layers.sort((a, b) => a.z - b.z)) if (L.img)
    g.drawImage(L.img, L.x * S, (L.y + TOP) * S, L.w * S, L.w * L.img.naturalHeight / L.img.naturalWidth * S);
  // the basket, in her 12px blocks: a woven trapezoid with a light rim, outlined like everything else
  const cols = (BASKET.x1 - BASKET.x0) / P | 0, rows = BASKET.h / P | 0, rowsArt = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      const inset = Math.floor(r / 3);
      line += c < inset || c >= cols - inset ? '.' : r === 0 ? 'r' : r === 1 ? 'R' : (c + r) % 4 === 0 || r % 3 === 2 ? 'd' : 'w';
    }
    rowsArt.push(line);
  }
  const basket = blocks(rowsArt, { r: '#f2cf98', R: '#c28a52', w: '#c99456', d: '#94633a' }, true);
  g.drawImage(basket, (BASKET.x0 - P) * S, (BASKET.y + TOP - P) * S, basket.width * B, basket.height * B);
})();

// ---- her room, behind everything ----
const room = new Image(); room.src = 'assets/pink-room.jpg';

// ---- the game ----
const canvas = $('game'), ctx = canvas.getContext('2d');
let best = 0;
try { best = +localStorage.getItem('molly-feast-best') || 0; } catch {}
let g = null; // the current round
const idle = { x: (GW - MW) / 2, hop: 0 };

function start() {
  g = { on: true, t: 0, score: 0, lives: 3, x: g ? g.x : idle.x, food: [], pops: [], next: 0.8, hop: 0, shake: 0 };
  $('overlay').hidden = true; $('message').textContent = '';
  hud(); canvas.focus?.();
}
function hud() {
  const lives = g ? Math.max(0, g.lives) : 3;
  $('score').textContent = g ? g.score : 0;
  $('best').textContent = 'best ' + best;
  $('lives').textContent = '♥'.repeat(lives) + '♡'.repeat(3 - lives);
  $('lives').setAttribute('aria-label', `${lives} heart${lives === 1 ? '' : 's'} left`);
}
function pick(level) {
  const pool = Object.entries(FOODS).map(([k, f]) => [k, f.bad ? 2 + level : f.weight]);
  let r = Math.random() * pool.reduce((a, [, w]) => a + w, 0);
  for (const [k, w] of pool) if ((r -= w) < 0) return k;
  return 'roll';
}
function pop(x, y, text, color) { g.pops.push({ x, y, t: 0, text, color }); }
function hurt(x, y, text) {
  g.lives--; g.shake = 0.3;
  pop(x, y, text, '#c8233c');
  if (g.lives <= 0) {
    g.on = false;
    const record = g.score > best;
    if (record) { best = g.score; try { localStorage.setItem('molly-feast-best', best); } catch {} }
    $('title').textContent = record ? 'new best!' : 'all full!';
    $('msg').textContent = `Molly caught ${g.score} points of feast.`;
    $('play').textContent = 'AGAIN!';
    $('overlay').hidden = false;
    $('message').textContent = `Game over: ${g.score} points.${record ? ' New best!' : ''}`;
    $('play').focus();
  }
}

// controls: hold ◀ ▶, arrow keys, or drag (the mouse just hovering works too)
let dir = 0, target = null;
for (const [id, d] of [['left', -1], ['right', 1]]) {
  $(id).addEventListener('pointerdown', e => { if (e.button > 0) return; e.preventDefault(); dir = d; $(id).setPointerCapture(e.pointerId); });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) $(id).addEventListener(ev, () => { dir = 0; });
}
const gameX = e => { const r = canvas.getBoundingClientRect(); return (e.clientX - r.left) / r.width * GW; };
canvas.addEventListener('pointerdown', e => { target = gameX(e); canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.buttons) target = gameX(e); });
for (const ev of ['pointerup', 'pointercancel']) canvas.addEventListener(ev, e => { if (e.pointerType !== 'mouse') target = null; });
canvas.addEventListener('pointerleave', () => { target = null; });
document.addEventListener('keydown', e => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); dir = e.key === 'ArrowLeft' ? -1 : 1; }
  if (e.key === ' ' && !(g && g.on) && e.target.tagName !== 'BUTTON') { e.preventDefault(); start(); }
});
document.addEventListener('keyup', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') dir = 0; });
addEventListener('blur', () => { dir = 0; });
$('play').addEventListener('click', start);

function update(dt) {
  if (!g || !g.on) return;
  g.t += dt;
  const level = Math.min(8, g.t / 15); // a little faster every 15 seconds
  let d = dir;
  if (!d && target !== null) { const off = target - (g.x + MW / 2); d = Math.abs(off) < 8 ? 0 : Math.sign(off) * Math.min(1, Math.abs(off) / 90); }
  g.x = Math.max(-60, Math.min(GW - MW + 60, g.x + d * 760 * dt));
  g.moving = !!d;

  if ((g.next -= dt) <= 0) {
    g.food.push({ kind: pick(level), x: 20 + Math.random() * (GW - 40 - FOOD), y: -FOOD, vy: 260 + level * 40 + Math.random() * 80 });
    g.next = Math.max(0.4, 1.15 - level * 0.09) * (0.7 + Math.random() * 0.6);
  }
  const bx0 = g.x + (BASKET.x0 + 24) * S, bx1 = g.x + (BASKET.x1 - 24) * S;
  for (const f of g.food) {
    const before = f.y + FOOD * 0.8;
    f.y += f.vy * dt;
    const cx = f.x + FOOD / 2, bottom = f.y + FOOD * 0.8;
    if (!f.done && before < MOUTH_Y && bottom >= MOUTH_Y && cx > bx0 && cx < bx1) {
      f.done = true;
      const food = FOODS[f.kind];
      if (food.bad) hurt(cx, MOUTH_Y - 40, 'yuck!');
      else { g.score += food.points; g.hop = 0.18; pop(cx, MOUTH_Y - 40, '+' + food.points, '#493b3d'); }
    }
    if (!f.done && f.y > GH - FOOD) { f.done = true; if (!FOODS[f.kind].bad && g.on) hurt(cx, GH - 120, 'oops!'); }
  }
  g.food = g.food.filter(f => !f.done);
  for (const p of g.pops) { p.t += dt; p.y -= 90 * dt; }
  g.pops = g.pops.filter(p => p.t < 0.8);
  g.hop = Math.max(0, g.hop - dt); g.shake = Math.max(0, g.shake - dt);
  hud();
}

function draw() {
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#f5a0a7'; ctx.fillRect(0, 0, GW, GH);
  if (room.complete && room.naturalWidth) { // cover the canvas, anchored at the floor like her room
    const k = Math.max(GW / room.naturalWidth, GH / room.naturalHeight), w = room.naturalWidth * k, h = room.naturalHeight * k;
    ctx.drawImage(room, (GW - w) / 2, GH - h, w, h);
  }
  const s = g || idle;
  const step = g && g.on && g.moving ? (Math.floor(g.t * 10) % 2) * B : 0; // a block-sized bob while she walks
  const hop = g && g.hop > 0 ? 2 * B : 0;
  const shake = g && g.shake > 0 ? (Math.floor(g.shake * 40) % 2 ? B : -B) : 0;
  const mx = Math.round((s.x + shake) / B) * B;
  ctx.fillStyle = 'rgba(73,59,61,.22)'; ctx.fillRect(mx + MW * 0.28, GH - 24, MW * 0.44, B * 2);
  ctx.drawImage(molly, mx, MOLLY_Y - step - hop);
  if (!g) return;
  for (const f of g.food) drawFood(ctx, FOODS[f.kind], Math.round(f.x / B) * B, Math.round(f.y / B) * B, FOOD);
  ctx.textAlign = 'center'; ctx.font = 'bold italic 56px Georgia, serif'; ctx.lineWidth = 10; ctx.lineJoin = 'round';
  for (const p of g.pops) {
    ctx.globalAlpha = 1 - p.t / 0.8;
    ctx.strokeStyle = '#fff3f6'; ctx.strokeText(p.text, p.x, p.y);
    ctx.fillStyle = p.color; ctx.fillText(p.text, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}

let last = performance.now();
(function loop(now) {
  update(Math.min(0.05, (now - last) / 1000)); last = now;
  draw();
  requestAnimationFrame(loop);
})(last);
document.addEventListener('visibilitychange', () => { last = performance.now(); dir = 0; });
hud();
})();

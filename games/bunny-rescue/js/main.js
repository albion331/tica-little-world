import { Game } from './game.js';
import { LAYOUTS } from './game-state.js';
import { loadSprites, drawBunny, Animator } from './animation.js';
import { bindPointer } from './input.js';
import * as audio from './audio.js';
import { renderHud, renderSound, goBack } from './ui.js';
import { markVisited } from '../../../js/navigation.js';

const $ = (s) => document.querySelector(s);
const canvas = $('.stage canvas'), stage = $('.stage');
const pickLayout = () => (innerHeight > innerWidth ? LAYOUTS.portrait : LAYOUTS.landscape);

let sprites;
try {
  sprites = await loadSprites();
} catch (err) {
  $('#play').textContent = 'Aset gagal dimuat';
  throw err;
}

const game = new Game(canvas, sprites, pickLayout(), () => renderHud(game));

function fit() {
  const k = Math.min(stage.clientWidth / canvas.width, stage.clientHeight / canvas.height);
  canvas.style.width = `${Math.floor(canvas.width * k)}px`;
  canvas.style.height = `${Math.floor(canvas.height * k)}px`;
}
function resize() {
  // The layout only changes between rounds, never mid-game.
  if (game.phase === 'ready' && game.layout !== pickLayout()) game.setLayout(pickLayout());
  fit();
}
new ResizeObserver(resize).observe(stage);

const input = bindPointer(canvas, {
  down: (p) => game.down(p),
  move: (p) => game.move(p),
  up: (p, cancelled) => game.up(p, cancelled),
});

function begin() {
  audio.unlock();
  audio.sfx('button');
  input.reset();
  if (game.layout !== pickLayout()) { game.setLayout(pickLayout()); fit(); }
  game.start();
  audio.startMusic();
}
$('#play').disabled = false;
$('#play').textContent = 'Play';
$('#play').addEventListener('click', begin);
document.querySelectorAll('.restart').forEach((b) => b.addEventListener('click', () => { audio.stopMusic(); begin(); }));
$('#pause').addEventListener('click', () => { audio.sfx('button'); input.reset(); game.pause(); });
$('#resume').addEventListener('click', () => { audio.unlock(); audio.sfx('button'); game.resume(); audio.startMusic(); });
document.querySelectorAll('.sound').forEach((b) => b.addEventListener('click', () => {
  audio.unlock();
  audio.setEnabled(!audio.isEnabled());
  audio.sfx('button');
  renderSound();
}));
document.querySelectorAll('.back').forEach((b) => b.addEventListener('click', () => { audio.stopMusic(); goBack(); }));
document.addEventListener('visibilitychange', () => { if (document.hidden) { input.reset(); game.pause(); } });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') game.pause(); });
window.addEventListener('pagehide', () => { game.pause(); audio.stopMusic(); });

// Mascots on the start and victory screens use the same sprite system.
const mascots = [...document.querySelectorAll('.mascot')].map((c) => ({ c, anim: new Animator() }));

let last = performance.now();
function frame(now) {
  const dt = Math.max(0, Math.min(0.1, (now - last) / 1000)); // delta time, clamped after tab switches
  last = now;
  game.update(dt);
  game.draw();
  for (const m of mascots) {
    if (!m.c.offsetParent && m.c.closest('.screen').hidden) continue;
    m.anim.play(m.c.closest('#victory') ? 'happy' : 'idle');
    m.anim.update(dt, sprites.atlases.snowy.animations[m.anim.name]);
    const g = m.c.getContext('2d');
    g.clearRect(0, 0, 192, 192);
    g.save(); g.translate(96, 170); g.scale(1.6, 1.6);
    drawBunny(g, sprites, 'snowy', m.anim, 0, 0);
    g.restore();
  }
  if (game.phase === 'victory' && Math.random() < dt * 8) game.particles.burst(Math.random() * game.layout.w, game.layout.h * 0.4, Math.random() < 0.5 ? 'heart' : 'sparkle', 3);
  requestAnimationFrame(frame);
}
markVisited('bunny');
renderHud(game);
renderSound();
requestAnimationFrame(frame);
if (new URLSearchParams(location.search).has('debug')) window.__game = game;

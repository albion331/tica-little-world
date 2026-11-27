import { CONFIG } from './game-state.js';
import * as audio from './audio.js';

const $ = (s) => document.querySelector(s);
let shown = null;

export function renderHud(game) {
  $('#time').textContent = Math.ceil(game.time);
  $('#score').textContent = `${game.score}/${CONFIG.target}`;
  $('#hand').textContent = game.held ? 1 : 0;
  $('#progress').textContent = `${game.score}/${CONFIG.target}`;
  $('#fill').style.width = `${game.score / CONFIG.target * 100}%`;
  $('#final-score').textContent = game.score;
  $('#pause').disabled = game.phase !== 'playing';
  if (game.phase === shown) return;
  shown = game.phase;
  const screens = { ready: '#start', paused: '#paused', victory: '#victory', gameover: '#gameover' };
  for (const [phase, id] of Object.entries(screens)) $(id).hidden = phase !== game.phase;
  if (game.phase !== 'playing') audio.stopMusic();
}

export function renderSound() {
  document.querySelectorAll('.sound').forEach((b) => { b.textContent = `Sound: ${audio.isEnabled() ? 'on' : 'off'}`; });
}

export function goBack() {
  const home = new URL('../../index.html', location.href);
  let sameSite = false;
  try {
    const from = new URL(document.referrer);
    sameSite = from.origin === location.origin && from.pathname.startsWith(new URL('../../', location.href).pathname) && from.pathname !== location.pathname;
  } catch { /* no referrer */ }
  if ((sameSite || location.protocol === 'file:') && history.length > 1) history.back();
  else location.href = home.href;
}

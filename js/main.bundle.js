// Dibuat oleh tools/bundle.py. Jangan diedit langsung.
(async () => {
const SELF = document.currentScript.src;
const __js_music_js = await (async () => {

// Website background music. The game page never loads this module, so the two never overlap.
const ON = 'tisya.music.on';
const AT = 'tisya.music.at';
const get = (k) => { try { return sessionStorage.getItem(k); } catch { return null; } };
const set = (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* storage blocked */ } };

function initMusic(button) {
  const audio = new Audio(new URL('../assets/music/for-my-core.mp3', new URL('music.js', SELF).href).href);
  audio.loop = true;
  audio.preload = 'none';
  audio.volume = 0.55;
  let wanted = get(ON) === '1';
  let resumeAt = Number(get(AT)) || 0;

  const render = () => {
    const playing = !audio.paused;
    button.textContent = playing ? 'Music: on' : 'Music: off';
    button.setAttribute('aria-pressed', String(playing));
  };
  const play = () => {
    if (resumeAt) {
      const t = resumeAt;
      resumeAt = 0;
      audio.addEventListener('loadedmetadata', () => { audio.currentTime = t; }, { once: true });
    }
    return audio.play().catch(() => render()); // autoplay blocked: wait for a gesture
  };
  const save = () => { if (audio.currentTime > 0) set(AT, String(audio.currentTime)); };

  button.addEventListener('click', () => {
    wanted = audio.paused;
    set(ON, wanted ? '1' : '0');
    if (wanted) play(); else audio.pause();
  });
  document.addEventListener('pointerdown', (e) => {
    if (wanted && audio.paused && e.target !== button) play();
  });
  // "OPEN YOUR LITTLE WORLD" is a user gesture, so it may start the music (unless she turned it off).
  document.querySelector('a[href="#explore"]')?.addEventListener('click', () => {
    if (get(ON) !== '0') { wanted = true; set(ON, '1'); play(); }
  });
  audio.addEventListener('play', render);
  audio.addEventListener('pause', render);
  window.addEventListener('pagehide', () => { save(); audio.pause(); });
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) { wanted = get(ON) === '1'; if (wanted) play(); }
  });
  if (wanted) play();
  render();
}

return { initMusic };
})();
const __js_navigation_js = await (async () => {

const KEY = 'tisya.visited';
const PARTS = ['memories', 'letter', 'photobooth', 'bunny'];

function visited() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function markVisited(key) {
  const list = new Set(visited());
  list.add(key);
  try { localStorage.setItem(KEY, JSON.stringify([...list])); } catch { /* storage blocked */ }
}
function initProgress() {
  const seen = visited().filter((k) => PARTS.includes(k));
  document.querySelectorAll('.card[data-key]').forEach((c) => c.classList.toggle('visited', seen.includes(c.dataset.key)));
  document.querySelectorAll('.progress-note').forEach((el) => {
    el.textContent = seen.length === PARTS.length
      ? 'Kamu sudah menjelajahi semuanya.'
      : `${seen.length} dari ${PARTS.length} sudut sudah kamu jelajahi.`;
  });
  document.querySelector('.topbar [aria-current]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
}

return { visited, markVisited, initProgress };
})();
const __js_main_js = await (async () => {
const { initMusic } = __js_music_js;
const { initProgress, markVisited } = __js_navigation_js;



const page = document.body.dataset.page;
if (['memories', 'letter', 'photobooth'].includes(page)) markVisited(page);
initProgress();
window.addEventListener('pageshow', initProgress);
initMusic(document.querySelector('.music-toggle'));

const hearts = document.querySelector('.hearts');
if (hearts) {
  for (let i = 0; i < 10; i++) {
    const img = new Image();
    img.src = 'assets/decorations/heart.svg';
    img.alt = '';
    img.style.cssText = `left:${5 + i * 9.4}%;animation-duration:${7 + (i % 4) * 2}s;animation-delay:${(i * 0.9).toFixed(1)}s`;
    hearts.append(img);
  }
}

return {  };
})();
})();

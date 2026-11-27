// Website background music. The game page never loads this module, so the two never overlap.
const ON = 'tisya.music.on';
const AT = 'tisya.music.at';
const get = (k) => { try { return sessionStorage.getItem(k); } catch { return null; } };
const set = (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* storage blocked */ } };

export function initMusic(button) {
  const audio = new Audio(new URL('../assets/music/for-my-core.mp3', import.meta.url).href);
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

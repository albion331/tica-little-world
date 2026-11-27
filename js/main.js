import { initMusic } from './music.js';
import { initProgress, markVisited } from './navigation.js';

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

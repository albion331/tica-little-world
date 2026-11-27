const KEY = 'tisya.visited';
const PARTS = ['memories', 'letter', 'photobooth', 'bunny'];

export function visited() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
export function markVisited(key) {
  const list = new Set(visited());
  list.add(key);
  try { localStorage.setItem(KEY, JSON.stringify([...list])); } catch { /* storage blocked */ }
}
export function initProgress() {
  const seen = visited().filter((k) => PARTS.includes(k));
  document.querySelectorAll('.card[data-key]').forEach((c) => c.classList.toggle('visited', seen.includes(c.dataset.key)));
  document.querySelectorAll('.progress-note').forEach((el) => {
    el.textContent = seen.length === PARTS.length
      ? 'Kamu sudah menjelajahi semuanya.'
      : `${seen.length} dari ${PARTS.length} sudut sudah kamu jelajahi.`;
  });
  document.querySelector('.topbar [aria-current]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
}

const cards = [...document.querySelectorAll('.polaroid')];
const box = document.querySelector('.lightbox');
const img = box.querySelector('img');
const caption = box.querySelector('figcaption');
let index = 0;

function show(i) {
  index = (i + cards.length) % cards.length;
  img.src = cards[index].dataset.full;
  img.alt = cards[index].dataset.caption;
  caption.textContent = cards[index].dataset.caption;
  if (!box.open) box.showModal();
}
cards.forEach((c, i) => c.addEventListener('click', () => show(i)));
box.addEventListener('click', (e) => {
  const act = e.target.dataset.act;
  if (act === 'close' || e.target === box) box.close();
  if (act === 'prev') show(index - 1);
  if (act === 'next') show(index + 1);
});
box.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') show(index - 1);
  if (e.key === 'ArrowRight') show(index + 1);
});

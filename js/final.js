const button = document.querySelector('#blow');
button.addEventListener('click', () => {
  document.querySelector('.flame').classList.add('off');
  document.querySelector('#wish-title').textContent = 'Wish sent to the universe!';
  button.hidden = true;
  const finale = document.querySelector('#finale');
  finale.hidden = false;
  finale.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

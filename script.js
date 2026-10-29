/* For Labby — made with love by Joe / Vami.
   Our real couple photos are included in assets/photos/.
   The February 26 countdown needs no anniversary year. */

const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const music = document.getElementById('backgroundMusic');
music.volume = 0.47;

musicToggle.addEventListener('click', async () => {
  if (!music.paused) { music.pause(); return; }
  try { await music.play(); }
  catch (error) { musicLabel.textContent = 'audio unavailable'; musicToggle.title = 'Check assets/audio/for-labby-original.mp3'; }
});
music.addEventListener('play', () => { musicToggle.setAttribute('aria-pressed', 'true'); musicToggle.setAttribute('aria-label', 'Pause background music'); musicLabel.textContent = 'pause our song'; });
music.addEventListener('pause', () => { musicToggle.setAttribute('aria-pressed', 'false'); musicToggle.setAttribute('aria-label', 'Play background music'); musicLabel.textContent = 'play our song'; });

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: .10, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible')); }

// This counts down to the NEXT February 26, without guessing the year you started dating.
function updateCountdown() {
  const now = new Date();
  let next = new Date(now.getFullYear(), 1, 26, 0, 0, 0, 0);
  const isAnniversaryToday = now.getMonth() === 1 && now.getDate() === 26;
  if (isAnniversaryToday) {
    document.getElementById('countdownLabel').textContent = 'Happy February 26, Labby! Today is our special day ♡';
    // Show time remaining in today's anniversary instead of rolling over immediately.
    next = new Date(now.getFullYear(), 1, 27, 0, 0, 0, 0);
  } else {
    if (next <= now) next = new Date(now.getFullYear() + 1, 1, 26, 0, 0, 0, 0);
    document.getElementById('countdownLabel').textContent = 'Counting down to February 26, ' + next.getFullYear();
  }
  let remaining = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
  const days = Math.floor(remaining / 86400); remaining %= 86400;
  const hours = Math.floor(remaining / 3600); remaining %= 3600;
  const minutes = Math.floor(remaining / 60); const seconds = remaining % 60;
  document.getElementById('countDays').textContent = String(days).padStart(2, '0');
  document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
  document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown(); setInterval(updateCountdown, 1000);

const letterDialog = document.getElementById('letterDialog');
function showLetter() {
  if (typeof letterDialog.showModal === 'function') letterDialog.showModal();
  else letterDialog.setAttribute('open', '');
}
document.getElementById('openLetter').addEventListener('click', showLetter);
document.getElementById('envelopeButton').addEventListener('click', showLetter);
document.querySelector('[data-close-letter]').addEventListener('click', () => letterDialog.close());
letterDialog.addEventListener('click', e => { if (e.target === letterDialog) letterDialog.close(); });

const photoDialog = document.getElementById('photoDialog');
const photoDialogImage = document.getElementById('photoDialogImage');
const photoDialogCaption = document.getElementById('photoDialogCaption');
const photoTitles = ['A quiet moment, together', 'Even ordinary days feel special', 'The happiest kind of selfie', 'I love every adventure with you', 'Side by side, wherever we go'];
document.querySelectorAll('.memory-card').forEach((card, index) => {
  card.addEventListener('click', () => {
    const photo = card.querySelector('img');
    photoDialogImage.src = photo.currentSrc || photo.src;
    photoDialogImage.alt = photo.alt;
    photoDialogCaption.textContent = photoTitles[index] + ' ♡';
    photoDialog.showModal();
  });
});
document.querySelector('[data-close-photo]').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', e => { if (e.target === photoDialog) photoDialog.close(); });

const promiseButton = document.getElementById('promiseButton');
const promiseMessage = document.getElementById('promiseMessage');
promiseButton.addEventListener('click', () => {
  const opening = promiseMessage.hidden;
  promiseMessage.hidden = !opening;
  promiseButton.innerHTML = opening ? 'You are my favorite ♡' : 'Tap here, Labby <span aria-hidden="true">♡</span>';
  promiseButton.setAttribute('aria-expanded', String(opening));
  if (opening) promiseMessage.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
});
promiseButton.setAttribute('aria-expanded', 'false');

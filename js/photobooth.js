import { REAL_FRAME } from './frame-config.js';

const SVG = {"flower": "<svg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><ellipse cx=\"50\" cy=\"26\" rx=\"16\" ry=\"22\" fill=\"#FFDCE9\" stroke=\"#493D48\" stroke-width=\"3\" transform=\"rotate(0 50 50)\"/><ellipse cx=\"50\" cy=\"26\" rx=\"16\" ry=\"22\" fill=\"#FFDCE9\" stroke=\"#493D48\" stroke-width=\"3\" transform=\"rotate(72 50 50)\"/><ellipse cx=\"50\" cy=\"26\" rx=\"16\" ry=\"22\" fill=\"#FFDCE9\" stroke=\"#493D48\" stroke-width=\"3\" transform=\"rotate(144 50 50)\"/><ellipse cx=\"50\" cy=\"26\" rx=\"16\" ry=\"22\" fill=\"#FFDCE9\" stroke=\"#493D48\" stroke-width=\"3\" transform=\"rotate(216 50 50)\"/><ellipse cx=\"50\" cy=\"26\" rx=\"16\" ry=\"22\" fill=\"#FFDCE9\" stroke=\"#493D48\" stroke-width=\"3\" transform=\"rotate(288 50 50)\"/><circle cx=\"50\" cy=\"50\" r=\"13\" fill=\"#FFF19B\" stroke=\"#493D48\" stroke-width=\"3\"/></svg>", "cloud": "<svg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M25 75C5 75 4 48 24 47 22 24 54 15 62 37 78 28 94 42 87 55 101 60 96 75 80 75Z\" fill=\"#fff\" stroke=\"#64C4B0\" stroke-width=\"4\"/><circle cx=\"43\" cy=\"55\" r=\"3\" fill=\"#493D48\"/><circle cx=\"63\" cy=\"55\" r=\"3\" fill=\"#493D48\"/><path d=\"M46 62q7 8 14 0\" fill=\"none\" stroke=\"#493D48\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg>", "heart": "<svg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M50 88C20 66 6 50 8 31 11 9 40 8 50 29 60 8 89 9 92 31 94 50 80 66 50 88Z\" fill=\"#F5A9C8\" stroke=\"#493D48\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg>"};
const $ = (s) => document.querySelector(s);
const video = $('video'), placeholder = $('.placeholder'), count = $('.count'), flash = $('.flash');
const status = $('.status'), startBtn = $('#start'), cameraBtn = $('#camera'), soundBtn = $('#sound');
const result = $('.result'), canvas = $('.result canvas');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let stream = null, busy = false, soundOn = true, audioCtx = null, opening = false;

function shutter() {
  if (!soundOn || !audioCtx) return;
  const len = Math.floor(audioCtx.sampleRate * 0.12);
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const click = i < len * 0.2 || (i > len * 0.55 && i < len * 0.75);
    data[i] = click ? (Math.random() * 2 - 1) * 0.5 : 0;
  }
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  src.connect(audioCtx.destination);
  src.start();
}

function fail(message) {
  status.textContent = message;
  placeholder.textContent = 'Kamera belum tersedia';
  placeholder.hidden = false;
  startBtn.disabled = true;
  cameraBtn.hidden = false;
}

async function openCamera() {
  if (opening) return;
  cameraBtn.hidden = true;
  if (!navigator.mediaDevices?.getUserMedia) {
    fail('Browser ini tidak bisa membuka kamera. Gunakan Chrome atau Safari terbaru lewat HTTPS (bukan dari dalam aplikasi chat).');
    return;
  }
  opening = true;
  status.textContent = 'Izinkan akses kamera, ya.';
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false,
    });
    video.srcObject = stream;
    await video.play();
    stream.getVideoTracks()[0].addEventListener('ended', () => fail('Kamera terputus. Coba buka lagi.'));
    placeholder.hidden = true;
    startBtn.disabled = false;
    status.textContent = 'Kamera siap. Atur posemu lalu tekan START.';
  } catch (err) {
    const messages = {
      NotAllowedError: 'Izin kamera ditolak. Izinkan kamera di pengaturan situs, lalu coba lagi.',
      NotFoundError: 'Tidak ada kamera yang terdeteksi di perangkat ini.',
      NotReadableError: 'Kamera sedang dipakai aplikasi lain. Tutup dulu, lalu coba lagi.',
    };
    fail(messages[err.name] || 'Kamera gagal dibuka. Coba lagi.');
  } finally {
    opening = false;
  }
}

// Mirrored, centre-cropped to the same 4:3 area the preview shows.
function snapshot() {
  const vw = video.videoWidth, vh = video.videoHeight;
  const sw = Math.min(vw, vh * 4 / 3), sh = sw * 3 / 4;
  const c = document.createElement('canvas');
  c.width = Math.round(sw); c.height = Math.round(sh);
  const g = c.getContext('2d');
  g.translate(c.width, 0); g.scale(-1, 1);
  g.drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, c.width, c.height);
  return c;
}

function cover(g, im, s) {
  const k = Math.max(s.w / im.width, s.h / im.height);
  const sw = s.w / k, sh = s.h / k;
  g.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, s.x, s.y, s.w, s.h);
}

const loadImage = (src) => new Promise((resolve, reject) => {
  const im = new Image();
  im.onload = () => resolve(im);
  im.onerror = reject;
  im.src = src;
});

function star(g, x, y, r) {
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.46 : r;
    g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  g.closePath();
  g.fillStyle = '#FFF19B'; g.fill();
  g.lineWidth = 6; g.strokeStyle = '#64C4B0'; g.stroke();
}

async function buildStrip(shots) {
  const g = canvas.getContext('2d');
  if (REAL_FRAME) {
    const frame = await loadImage(new URL(`../assets/photobooth/${REAL_FRAME.file}`, import.meta.url).href);
    canvas.width = REAL_FRAME.width; canvas.height = REAL_FRAME.height;
    REAL_FRAME.slots.forEach((s, i) => cover(g, shots[i], s));
    g.drawImage(frame, 0, 0, canvas.width, canvas.height);
    return;
  }
  await document.fonts.ready;
  const decor = (n) => loadImage(`data:image/svg+xml,${encodeURIComponent(SVG[n])}`);
  const [flower, cloud, heart] = await Promise.all(['flower', 'cloud', 'heart'].map(decor));
  canvas.width = 900; canvas.height = 2060;
  g.fillStyle = '#F5A9C8'; g.fillRect(0, 0, 900, 2060);
  g.fillStyle = '#C4F5E9'; g.fillRect(34, 34, 832, 1992);
  g.fillStyle = '#FFF19B';
  for (let y = 20, row = 0; y < 2060; y += 62, row++) {
    for (let x = 20 + (row % 2) * 31; x < 900; x += 62) {
      if (x < 70 || x > 830 || y < 100 || y > 1850) { g.beginPath(); g.arc(x, y, 10, 0, Math.PI * 2); g.fill(); }
    }
  }
  shots.forEach((shot, i) => {
    const s = { x: 90, y: 130 + i * 580, w: 720, h: 540 };
    g.fillStyle = '#fff'; g.fillRect(s.x - 14, s.y - 14, s.w + 28, s.h + 28);
    cover(g, shot, s);
  });
  g.textAlign = 'center'; g.fillStyle = '#493D48';
  g.font = '700 56px Fredoka, sans-serif'; g.fillText('CUTE!!', 450, 92);
  g.font = '700 60px Fredoka, sans-serif'; g.fillText('HAPPY 20TH, TISYA!', 450, 1940);
  g.font = '44px Caveat, cursive'; g.fillText(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 450, 2000);
  g.drawImage(cloud, 60, 10, 150, 150); g.drawImage(cloud, 700, 1790, 160, 160);
  g.drawImage(flower, 20, 620, 120, 120); g.drawImage(flower, 770, 1210, 120, 120); g.drawImage(flower, 40, 1800, 130, 130);
  g.drawImage(heart, 780, 640, 90, 90); g.drawImage(heart, 35, 1240, 80, 80);
  star(g, 810, 110, 52); star(g, 90, 1220 - 560, 34); star(g, 830, 1760, 40);
}

async function session() {
  if (busy || !video.videoWidth) return;
  busy = true;
  startBtn.disabled = true;
  result.hidden = true;
  audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
  audioCtx.resume();
  const shots = [];
  try {
    for (let i = 0; i < 3; i++) {
      status.textContent = `Foto ${i + 1} dari 3, siap-siap!`;
      for (let n = 3; n >= 1; n--) {
        count.textContent = n; count.hidden = false;
        await sleep(1000);
      }
      count.hidden = true;
      if (!stream?.active || document.hidden) throw new Error('interrupted');
      shots.push(snapshot());
      shutter();
      flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
      await sleep(700);
    }
    await buildStrip(shots);
    result.hidden = false;
    status.textContent = 'Selesai! Photo strip kamu sudah jadi.';
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch {
    status.textContent = 'Sesi terhenti. Tekan START untuk mengulang.';
  } finally {
    count.hidden = true;
    busy = false;
    startBtn.disabled = !stream?.active;
  }
}

startBtn.addEventListener('click', session);
cameraBtn.addEventListener('click', openCamera);
$('#retake').addEventListener('click', () => {
  result.hidden = true;
  video.scrollIntoView({ behavior: 'smooth', block: 'center' });
  session();
});
$('#download').addEventListener('click', () => {
  canvas.toBlob((blob) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tisya-20th-photostrip.png';
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  }, 'image/png');
});
soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  soundBtn.textContent = `Shutter: ${soundOn ? 'on' : 'off'}`;
  soundBtn.setAttribute('aria-pressed', String(soundOn));
});
window.addEventListener('pagehide', () => stream?.getTracks().forEach((t) => t.stop()));
window.addEventListener('pageshow', (e) => { if (e.persisted) openCamera(); });
openCamera();

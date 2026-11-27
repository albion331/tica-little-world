// All game audio is synthesised with the Web Audio API; no files needed.
const MELODY = [523, 659, 784, 659, 587, 698, 880, 698, 523, 659, 784, 1047, 988, 784, 659, 587];
let ctx = null, master = null, timer = null, step = 0, nextAt = 0;
let enabled = true;
try { enabled = sessionStorage.getItem('tisya.game.sound') !== '0'; } catch { /* storage blocked */ }

export const isEnabled = () => enabled;

// Call from a user gesture (autoplay policy).
export function unlock() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = enabled ? 1 : 0;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
}

export function setEnabled(on) {
  enabled = on;
  if (master) master.gain.value = on ? 1 : 0;
  try { sessionStorage.setItem('tisya.game.sound', on ? '1' : '0'); } catch { /* storage blocked */ }
}

function tone(freq, at, length, type = 'square', volume = 0.08, endFreq = freq) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, at);
  o.frequency.exponentialRampToValueAtTime(endFreq, at + length);
  g.gain.setValueAtTime(volume, at);
  g.gain.exponentialRampToValueAtTime(0.001, at + length);
  o.connect(g).connect(master);
  o.start(at);
  o.stop(at + length);
}

export function sfx(name) {
  if (!ctx) return;
  const t = ctx.currentTime;
  const notes = (list, gap, len) => list.forEach((f, i) => tone(f, t + i * gap, len));
  if (name === 'button') tone(660, t, 0.08);
  if (name === 'pickup') tone(420, t, 0.14, 'square', 0.1, 880);
  if (name === 'drop') tone(300, t, 0.12, 'triangle', 0.1, 180);
  if (name === 'dooropen') tone(240, t, 0.18, 'triangle', 0.08, 420);
  if (name === 'doorclose') tone(180, t, 0.1, 'square', 0.09, 90);
  if (name === 'hide') tone(500, t, 0.22, 'triangle', 0.07, 140);
  if (name === 'rescue') notes([659, 880, 1319], 0.08, 0.16);
  if (name === 'victory') notes([523, 659, 784, 1047, 784, 1047, 1319], 0.13, 0.28);
  if (name === 'gameover') notes([392, 330, 262, 196], 0.2, 0.3);
}

export function startMusic() {
  if (!ctx || timer) return;
  nextAt = ctx.currentTime + 0.05;
  timer = setInterval(() => {
    while (nextAt < ctx.currentTime + 0.3) {
      tone(MELODY[step % MELODY.length], nextAt, 0.2, 'triangle', 0.045);
      if (step % 4 === 0) tone(MELODY[step % MELODY.length] / 4, nextAt, 0.5, 'sine', 0.07);
      step++;
      nextAt += 0.24;
    }
  }, 100);
}

export function stopMusic() {
  clearInterval(timer);
  timer = null;
}

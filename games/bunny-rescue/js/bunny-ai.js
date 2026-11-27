import { CONFIG } from './game-state.js';
import { contain } from './collision.js';

const rand = (a, b) => a + Math.random() * (b - a);
const BUSY = new Set(['MOVING_TO_HOLE', 'HIDING', 'HIDDEN', 'PEEKING', 'EXITING']);

function heading(b, speed) {
  const a = rand(0, Math.PI * 2);
  b.vx = Math.cos(a) * speed;
  b.vy = Math.sin(a) * speed * 0.7;
}

function chooseNext(b, world) {
  b.lift = 0;
  const free = world.layout.holes.map((_, i) => i).filter((i) => !world.bunnies.some((o) => o.hole === i));
  const hiding = world.bunnies.filter((o) => BUSY.has(o.state)).length;
  const r = Math.random();
  if (r < 0.3 && hiding < CONFIG.maxHiding && free.length) {
    b.hole = free[Math.floor(Math.random() * free.length)];
    b.setState('MOVING_TO_HOLE', 6);
  } else if (r < 0.42) {
    b.setState('IDLE', rand(0.5, 1.3));
  } else if (r < 0.7) {
    heading(b, rand(40, 65)); b.setState('WALK', rand(0.8, 2));
  } else if (r < 0.85) {
    heading(b, rand(110, 145)); b.setState('RUN', rand(0.5, 1.1));
  } else {
    heading(b, 70); b.setState('JUMP', 0.6);
  }
}

export function updateBunny(b, dt, world) {
  b.timer -= dt;
  b.elapsed += dt;
  const { bounds } = world.layout;
  switch (b.state) {
    case 'CARRIED':
    case 'RESCUED':
      return;
    case 'IDLE':
      if (b.timer <= 0) chooseNext(b, world);
      break;
    case 'WALK':
    case 'RUN':
    case 'JUMP': {
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.x < bounds.x0 || b.x > bounds.x1) b.vx *= -1;
      if (b.y < bounds.y0 || b.y > bounds.y1) b.vy *= -1;
      contain(b, world.layout);
      b.lift = b.state === 'JUMP' ? Math.sin(Math.PI * Math.min(1, b.elapsed / b.duration)) * 36 : 0;
      if (b.timer <= 0) chooseNext(b, world);
      break;
    }
    case 'MOVING_TO_HOLE': {
      const [hx, hy] = world.layout.holes[b.hole];
      const dx = hx - b.x, dy = hy - b.y, d = Math.hypot(dx, dy);
      const step = 95 * dt;
      if (d <= step) {
        b.x = hx; b.y = hy;
        b.setState('HIDING', 0.65);
        world.onHide();
      } else {
        b.x += dx / d * step; b.y += dy / d * step; b.vx = dx;
        if (b.timer <= 0) { b.hole = null; chooseNext(b, world); } // never stuck
      }
      break;
    }
    case 'HIDING':
      if (b.timer <= 0) b.setState('HIDDEN', rand(1, 2));
      break;
    case 'HIDDEN':
      if (b.timer <= 0) b.setState('PEEKING', 0.75);
      break;
    case 'PEEKING':
      if (b.timer <= 0) b.setState('EXITING', 0.5);
      break;
    case 'EXITING':
      if (b.timer <= 0) {
        b.hole = null;
        heading(b, 60); b.setState('WALK', rand(0.8, 1.4));
      }
      break;
  }
  if (Math.abs(b.vx) > 1) b.facing = b.vx > 0 ? 1 : -1;
}

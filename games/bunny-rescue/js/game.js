import { CONFIG } from './game-state.js';
import { Bunny } from './bunny.js';
import { updateBunny } from './bunny-ai.js';
import { drawBunny } from './animation.js';
import { contain, separate, inRect, clamp } from './collision.js';
import * as env from './environment.js';
import { Particles } from './particles.js';
import * as audio from './audio.js';

export class Game {
  constructor(canvas, sprites, layout, onChange) {
    Object.assign(this, { canvas, sprites, onChange });
    this.ctx = canvas.getContext('2d');
    this.particles = new Particles(sprites.art);
    this.phase = 'ready';
    this.setLayout(layout);
  }
  setLayout(layout) {
    this.layout = layout;
    this.canvas.width = layout.w;
    this.canvas.height = layout.h;
    this.background = env.renderBackground(layout, this.sprites.art);
    this.reset();
  }
  reset() {
    this.time = CONFIG.duration;
    this.score = 0;
    this.held = null;
    this.pointer = null;
    this.door = 0;
    this.bump = 0;
    this.clock = 0;
    this.particles.clear();
    const { bounds } = this.layout;
    const columns = 5;
    this.bunnies = Array.from({ length: CONFIG.target }, (_, i) => {
      const b = new Bunny(
        this.sprites.variants[i % this.sprites.variants.length],
        bounds.x0 + 50 + (i % columns) * (bounds.x1 - bounds.x0 - 100) / (columns - 1),
        bounds.y0 + 60 + Math.floor(i / columns) * 120,
      );
      contain(b, this.layout);
      return b;
    });
    // Two bunnies head for a hole early, so the hiding mechanic shows right away.
    [[0, 0], [6, 3]].forEach(([i, hole]) => {
      this.bunnies[i].hole = hole;
      this.bunnies[i].setState('MOVING_TO_HOLE', 8);
    });
    this.onHide = () => audio.sfx('hide');
  }
  start() { this.reset(); this.phase = 'playing'; this.onChange(); }
  pause() { if (this.phase !== 'playing') return; this.drop(true); this.phase = 'paused'; this.onChange(); }
  resume() { if (this.phase !== 'paused') return; this.phase = 'playing'; this.onChange(); }

  down(p) {
    if (this.phase !== 'playing' || this.held) return false;
    // Front-most (lowest on screen) bunny wins.
    const b = [...this.bunnies].sort((a, c) => c.y - a.y).find((o) => o.contains(p.x, p.y));
    if (!b) return false;
    b.hole = null;
    b.lift = 0;
    b.setState('CARRIED');
    this.held = b;
    this.move(p);
    audio.sfx('pickup');
    this.particles.burst(p.x, p.y, 'sparkle', 6);
    this.onChange();
    return true;
  }
  move(p) {
    if (!this.held) return;
    this.held.x = clamp(p.x, 20, this.layout.w - 20);
    // On touch the bunny floats above the fingertip so it stays visible.
    this.held.y = clamp(p.y + (p.touch ? -6 : 32), 60, this.layout.h - 8);
    this.pointer = p;
  }
  up(p, cancelled) {
    if (!this.held) return;
    if (!cancelled && inRect(p.x, p.y, this.layout.hutch, 12)) this.rescue(this.held);
    else this.drop(cancelled);
  }
  drop(quiet) {
    const b = this.held;
    if (!b) return;
    this.held = null;
    contain(b, this.layout);
    b.setState('IDLE', 0.35);
    if (!quiet) audio.sfx('drop');
    this.onChange();
  }
  rescue(b) {
    this.held = null;
    const h = this.layout.hutch;
    b.from = { x: b.x, y: b.y };
    b.setState('RESCUED');
    this.score++;
    audio.sfx('rescue');
    this.particles.burst(h.x + h.w / 2, h.y + h.h / 2, 'sparkle', 8);
    this.particles.add({ x: h.x + h.w / 2, y: h.y + h.h * 0.6, kind: 'ring', life: 0.7 });
    if (this.score >= CONFIG.target) {
      this.phase = 'victory';
      audio.sfx('victory');
      this.particles.burst(this.layout.w / 2, this.layout.h / 2, 'heart', 70);
    }
    this.onChange();
  }

  // The door opens while a carried bunny is close, stays open while it hops in, then shuts.
  updateDoor(dt) {
    this.bump = Math.max(0, this.bump - dt * 6);
    const near = this.held && this.pointer && inRect(this.pointer.x, this.pointer.y, this.layout.hutch, 80);
    const entering = this.bunnies.some((b) => b.state === 'RESCUED' && b.elapsed < 0.75);
    const target = near || entering ? 1 : 0;
    if (this.door === target) return;
    if (this.door === 0) audio.sfx('dooropen');
    this.door = target ? Math.min(1, this.door + dt / 0.22) : Math.max(0, this.door - dt / 0.22);
    if (this.door === 0) {
      audio.sfx('doorclose');
      this.bump = 1;
    }
  }

  update(dt) {
    if (this.phase === 'paused') return;
    this.clock += dt;
    this.particles.update(dt);
    this.updateDoor(dt);
    for (const b of this.bunnies) {
      const clip = this.sprites.atlases[b.variant]?.animations[b.anim.name];
      b.anim.update(dt, clip);
      if (b.state === 'RESCUED') b.elapsed += dt;
    }
    if (this.phase !== 'playing') return;
    this.particles.petals(dt, this.layout.w, this.layout.h);
    this.time = Math.max(0, this.time - dt);
    for (const b of this.bunnies) updateBunny(b, dt, this);
    separate(this.bunnies, dt);
    for (const b of this.bunnies) if (['IDLE', 'WALK', 'RUN'].includes(b.state)) contain(b, this.layout);
    if (this.time <= 0) {
      this.drop(true);
      this.phase = 'gameover';
      audio.sfx('gameover');
    }
    this.onChange();
  }

  drawOne(b) {
    const g = this.ctx;
    const inHole = ['HIDING', 'HIDDEN', 'PEEKING', 'EXITING'].includes(b.state);
    if (!inHole) {
      g.fillStyle = '#00000022';
      g.beginPath(); g.ellipse(b.x, b.y + (b === this.held ? 26 : 0), 26, 7, 0, 0, Math.PI * 2); g.fill();
      drawBunny(g, this.sprites, b.variant, b.anim, b.x, b.y - b.lift, b.facing);
      return;
    }
    if (b.state === 'HIDDEN') return;
    const t = Math.min(1, b.elapsed / b.duration);
    // How far below the rim (pixels).
    const sink = b.state === 'HIDING' ? t * t * 30 : b.state === 'PEEKING' ? 26 * (1 - Math.min(1, t * 2)) + 6 : 10 * (1 - t);
    const jumpOut = b.state === 'EXITING' ? Math.sin(Math.PI * t) * 34 : 0;
    g.save();
    g.beginPath(); g.rect(b.x - 80, b.y - 170, 160, 184); g.clip(); // nothing shows below the rim
    drawBunny(g, this.sprites, b.variant, b.anim, b.x, b.y + 8 + sink - jumpOut, b.facing);
    g.restore();
  }

  draw() {
    const g = this.ctx, l = this.layout, art = this.sprites.art;
    g.imageSmoothingEnabled = false;
    g.drawImage(this.background, 0, 0); // layers 1-3
    const over = this.held && this.pointer && inRect(this.pointer.x, this.pointer.y, l.hutch, 12);
    env.drawHutch(g, art, l.hutch, this.score, this.door, over, this.bump);
    l.holes.forEach((h, i) => env.drawHoleBack(g, art, i, h)); // layer 4
    // Layers 5-6, row by row from back to front.
    const items = [
      ...l.holes.map((h, i) => ({ y: h[1] + 0.5, draw: () => env.drawHoleFront(g, art, i, h) })),
      ...this.bunnies.filter((b) => b.state !== 'RESCUED' && b !== this.held)
        .map((b) => ({ y: b.y, draw: () => this.drawOne(b) })),
    ].sort((a, b) => a.y - b.y);
    items.forEach((i) => i.draw());
    env.drawForeground(g, l, this.clock); // layer 7
    // Rescued bunnies hop through the hutch door.
    for (const b of this.bunnies) {
      if (b.state !== 'RESCUED' || b.elapsed >= 0.7) continue;
      const t = b.elapsed / 0.7;
      const { x: tx, y: ty } = env.doorPosition(art, l.hutch);
      g.save();
      g.globalAlpha = Math.min(1, (1 - t) * 3);
      g.translate(b.from.x + (tx - b.from.x) * t, b.from.y + (ty - b.from.y) * t - Math.sin(Math.PI * t) * 60);
      g.scale(1 - 0.5 * t, 1 - 0.5 * t);
      drawBunny(g, this.sprites, b.variant, b.anim, 0, 0, 1);
      g.restore();
    }
    if (this.held) this.drawOne(this.held);
    this.particles.draw(g); // layer 8 (HUD is HTML on top)
  }
}

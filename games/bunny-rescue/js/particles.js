export class Particles {
  constructor(art) { this.art = art; this.list = []; this.ambient = 0; }
  clear() { this.list = []; }
  add(p) { if (this.list.length < 220) this.list.push({ vx: 0, vy: 0, g: 0, age: 0, ...p }); }
  burst(x, y, kind, n) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = 40 + Math.random() * 130;
      this.add({ x, y, kind, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 60, g: 140, life: 0.7 + Math.random() * 0.8 });
    }
  }
  petals(dt, w, h) {
    this.ambient -= dt;
    if (this.ambient > 0) return;
    this.ambient = 0.5;
    this.add({ x: Math.random() * w, y: Math.random() * h * 0.7, kind: Math.random() < 0.5 ? 'petal' : 'leaf', vx: 12, vy: 18, life: 3 });
  }
  update(dt) {
    for (const p of this.list) { p.age += dt; p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; }
    this.list = this.list.filter((p) => p.age < p.life);
  }
  draw(g) {
    const sprites = {
      ring: ['ring', 90], heart: ['pHeart', 20], sparkle: ['pStar', 18], petal: ['pFlower', 13], leaf: ['pLeaf', 14],
    };
    for (const p of this.list) {
      const [key, base] = sprites[p.kind];
      const image = this.art[key];
      const size = p.kind === 'ring' ? base + p.age * 90 : base;
      const height = size * image.height / image.width;
      g.globalAlpha = Math.max(0, 1 - p.age / p.life);
      g.drawImage(image, Math.round(p.x - size / 2), Math.round(p.y - height / 2), size, height);
    }
    g.globalAlpha = 1;
  }
}

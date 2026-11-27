import manifest from './manifest.js';

export const ANIMATIONS = {
  idle: { frames: 4, ms: 220, loop: true },
  walk: { frames: 4, ms: 140, loop: true },
  run: { frames: 4, ms: 90, loop: true },
  jump: { frames: 4, ms: 150, loop: false },
  hide: { frames: 4, ms: 125, loop: false },
  peek: { frames: 4, ms: 180, loop: false },
  exit: { frames: 4, ms: 125, loop: false },
  happy: { frames: 4, ms: 140, loop: true },
  carried: { frames: 2, ms: 220, loop: true },
};

export class Animator {
  constructor() { this.play('idle'); }
  play(name) {
    if (name === this.name) return;
    this.name = name;
    this.time = 0;
    this.index = 0;
  }
  // `clip` is the manifest entry for this animation, if the atlas is available.
  update(dt, clip) {
    const def = ANIMATIONS[this.name];
    const total = clip?.frames.length ?? def.frames;
    const ms = clip?.ms ?? def.ms;
    this.time += dt * 1000;
    const step = Math.floor(this.time / ms);
    this.index = def.loop ? step % total : Math.min(step, total - 1);
  }
}

const load = (path) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error(`Aset gagal dimuat: ${path}`));
  image.src = new URL(`../assets/${path}`, import.meta.url).href;
});

const ART = {
  tree: 'environment/tree', fence: 'environment/fence', shrub: 'environment/flower-shrub', bush: 'environment/flower-patch', sign: 'environment/signpost',
  hole0: 'props/hole-3', hole1: 'props/hole-4', hutchOpen: 'props/hutch-2', hutchClosed: 'props/hutch-3',
  lamp: 'environment/lamp', mailbox: 'environment/mailbox', flowerPink: 'environment/flower-pink', flowerRose: 'environment/flower-rose',
  pHeart: 'effects/p-heart', pFlower: 'effects/p-flower', pStar: 'effects/p-star', pLeaf: 'effects/p-leaf',
  sparkle: 'effects/effect-1', heart: 'effects/effect-3', ring: 'effects/effect-5',
};

export async function loadSprites() {
  const atlases = {};
  const art = {};
  await Promise.all([
    ...Object.entries(ART).map(async ([key, path]) => { art[key] = await load(`${path}.png`); }),
    ...Object.entries(manifest.bunnies).map(async ([variant, animations]) => {
      const entry = { animations: {} };
      await Promise.all(Object.entries(animations).map(async ([name, clip]) => {
        entry.animations[name] = {
          ms: clip.ms,
          frames: await Promise.all(clip.frames.map(async (f) => ({ ...f, image: await load(`bunnies/frames/${f.file}`) }))),
        };
      }));
      atlases[variant] = entry;
    }),
  ]);
  return { scale: manifest.scale, faces: manifest.faces, variants: Object.keys(manifest.bunnies), atlases, art };
}

// Feet at (x, y). The atlas poses differ only slightly, so hop, squash and sway are added on top.
export function drawBunny(ctx, sprites, variant, animator, x, y, facing = 1) {
  const clip = sprites.atlases[variant].animations[animator.name];
  const f = clip.frames[Math.min(animator.index, clip.frames.length - 1)];
  const t = animator.time / 1000;
  let hop = 0, sx = 1, sy = 1, tilt = 0;
  if (animator.name === 'idle') { sy = 1 + Math.sin(t * 4) * 0.035; sx = 2 - sy; }
  if (animator.name === 'walk' || animator.name === 'run') {
    const run = animator.name === 'run';
    const wave = Math.abs(Math.sin(t * (run ? 13 : 8)));
    hop = wave * (run ? 13 : 7);
    sy = 0.92 + wave * 0.13; sx = 2 - sy;
    tilt = run ? 0.09 : 0.04;
  }
  if (animator.name === 'happy') hop = Math.abs(Math.sin(t * 7)) * 16;
  if (animator.name === 'carried') tilt = Math.sin(t * 9) * 0.16;
  const k = sprites.scale;
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y - hop));
  ctx.imageSmoothingEnabled = false;
  ctx.scale(facing * sprites.faces, 1);
  ctx.rotate(-tilt);
  ctx.scale(sx, sy);
  ctx.drawImage(f.image, -f.w * k / 2, -(f.h - 3) * k, f.w * k, f.h * k);
  ctx.restore();
}

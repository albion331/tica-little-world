// Dibuat oleh tools/bundle.py. Jangan diedit langsung.
(async () => {
const SELF = document.currentScript.src;
const __games_bunny_rescue_js_game_state_js = await (async () => {

const CONFIG = { duration: 45, target: 10, maxHiding: 3 };
const STATES = ['IDLE', 'WALK', 'RUN', 'JUMP', 'MOVING_TO_HOLE', 'HIDING', 'HIDDEN', 'PEEKING', 'EXITING', 'CARRIED', 'RESCUED'];
const GRABBABLE = new Set(['IDLE', 'WALK', 'RUN', 'JUMP', 'MOVING_TO_HOLE']);

// Two logical layouts so the arena fills both wide and tall screens.
const LAYOUTS = {
  landscape: {
    w: 960, h: 600, horizon: 150,
    bounds: { x0: 45, y0: 220, x1: 915, y1: 570 },
    hutch: { x: 730, y: 185, w: 200, h: 165 },
    holes: [[150, 290], [420, 265], [600, 390], [250, 475], [450, 535], [830, 480]],
  },
  portrait: {
    w: 600, h: 900, horizon: 150,
    bounds: { x0: 45, y0: 220, x1: 555, y1: 865 },
    hutch: { x: 195, y: 690, w: 210, h: 175 },
    holes: [[130, 280], [450, 305], [290, 420], [120, 550], [470, 575], [300, 622]],
  },
};

return { CONFIG, STATES, GRABBABLE, LAYOUTS };
})();
const __games_bunny_rescue_js_manifest_js = await (async () => {

// Frame asli dari atlas (koordinat sumber ada di atlas-source.png).
// Atlas hanya punya 3 pose per baris. walk/exit/happy/carried memakai ulang pose asli.
const __default = {"scale":1.3,"faces":-1,"bunnies":{"snowy":{"idle":{"ms":320,"frames":[{"file":"snowy-idle-1.png","w":58,"h":65},{"file":"snowy-idle-2.png","w":55,"h":65},{"file":"snowy-idle-3.png","w":55,"h":65}]},"walk":{"ms":170,"frames":[{"file":"snowy-run-1.png","w":58,"h":63},{"file":"snowy-run-2.png","w":59,"h":63},{"file":"snowy-run-3.png","w":59,"h":63}]},"run":{"ms":95,"frames":[{"file":"snowy-run-1.png","w":58,"h":63},{"file":"snowy-run-2.png","w":59,"h":63},{"file":"snowy-run-3.png","w":59,"h":63}]},"jump":{"ms":190,"frames":[{"file":"snowy-jump-1.png","w":58,"h":75},{"file":"snowy-jump-2.png","w":60,"h":63},{"file":"snowy-jump-3.png","w":57,"h":64}]},"hide":{"ms":215,"frames":[{"file":"snowy-hide-1.png","w":62,"h":50},{"file":"snowy-hide-2.png","w":61,"h":47},{"file":"snowy-hide-3.png","w":59,"h":44}]},"peek":{"ms":240,"frames":[{"file":"snowy-peek-3.png","w":60,"h":40},{"file":"snowy-peek-2.png","w":61,"h":39},{"file":"snowy-peek-1.png","w":59,"h":40}]},"exit":{"ms":165,"frames":[{"file":"snowy-hide-2.png","w":61,"h":47},{"file":"snowy-hide-1.png","w":62,"h":50},{"file":"snowy-jump-1.png","w":58,"h":75}]},"happy":{"ms":150,"frames":[{"file":"snowy-jump-1.png","w":58,"h":75},{"file":"snowy-jump-2.png","w":60,"h":63},{"file":"snowy-jump-3.png","w":57,"h":64}]},"carried":{"ms":240,"frames":[{"file":"snowy-jump-1.png","w":58,"h":75},{"file":"snowy-jump-2.png","w":60,"h":63}]}},"choco":{"idle":{"ms":320,"frames":[{"file":"choco-idle-1.png","w":56,"h":69},{"file":"choco-idle-2.png","w":53,"h":66},{"file":"choco-idle-3.png","w":54,"h":68}]},"walk":{"ms":170,"frames":[{"file":"choco-run-1.png","w":57,"h":64},{"file":"choco-run-2.png","w":55,"h":63},{"file":"choco-run-3.png","w":54,"h":65}]},"run":{"ms":95,"frames":[{"file":"choco-run-1.png","w":57,"h":64},{"file":"choco-run-2.png","w":55,"h":63},{"file":"choco-run-3.png","w":54,"h":65}]},"jump":{"ms":190,"frames":[{"file":"choco-jump-1.png","w":55,"h":74},{"file":"choco-jump-2.png","w":54,"h":62},{"file":"choco-jump-3.png","w":51,"h":58}]},"hide":{"ms":215,"frames":[{"file":"choco-hide-1.png","w":57,"h":58},{"file":"choco-hide-2.png","w":57,"h":45},{"file":"choco-hide-3.png","w":56,"h":34}]},"peek":{"ms":240,"frames":[{"file":"choco-peek-3.png","w":54,"h":27},{"file":"choco-peek-2.png","w":56,"h":37},{"file":"choco-peek-1.png","w":57,"h":41}]},"exit":{"ms":165,"frames":[{"file":"choco-hide-2.png","w":57,"h":45},{"file":"choco-hide-1.png","w":57,"h":58},{"file":"choco-jump-1.png","w":55,"h":74}]},"happy":{"ms":150,"frames":[{"file":"choco-jump-1.png","w":55,"h":74},{"file":"choco-jump-2.png","w":54,"h":62},{"file":"choco-jump-3.png","w":51,"h":58}]},"carried":{"ms":240,"frames":[{"file":"choco-jump-1.png","w":55,"h":74},{"file":"choco-jump-2.png","w":54,"h":62}]}},"mizu":{"idle":{"ms":320,"frames":[{"file":"mizu-idle-1.png","w":53,"h":65},{"file":"mizu-idle-2.png","w":55,"h":65},{"file":"mizu-idle-3.png","w":53,"h":67}]},"walk":{"ms":170,"frames":[{"file":"mizu-run-1.png","w":53,"h":63},{"file":"mizu-run-2.png","w":54,"h":63},{"file":"mizu-run-3.png","w":54,"h":63}]},"run":{"ms":95,"frames":[{"file":"mizu-run-1.png","w":53,"h":63},{"file":"mizu-run-2.png","w":54,"h":63},{"file":"mizu-run-3.png","w":54,"h":63}]},"jump":{"ms":190,"frames":[{"file":"mizu-jump-1.png","w":51,"h":74},{"file":"mizu-jump-2.png","w":55,"h":62},{"file":"mizu-jump-3.png","w":53,"h":60}]},"hide":{"ms":215,"frames":[{"file":"mizu-hide-1.png","w":57,"h":49},{"file":"mizu-hide-2.png","w":56,"h":44},{"file":"mizu-hide-3.png","w":55,"h":34}]},"peek":{"ms":240,"frames":[{"file":"mizu-peek-3.png","w":54,"h":27},{"file":"mizu-peek-2.png","w":55,"h":36},{"file":"mizu-peek-1.png","w":55,"h":36}]},"exit":{"ms":165,"frames":[{"file":"mizu-hide-2.png","w":56,"h":44},{"file":"mizu-hide-1.png","w":57,"h":49},{"file":"mizu-jump-1.png","w":51,"h":74}]},"happy":{"ms":150,"frames":[{"file":"mizu-jump-1.png","w":51,"h":74},{"file":"mizu-jump-2.png","w":55,"h":62},{"file":"mizu-jump-3.png","w":53,"h":60}]},"carried":{"ms":240,"frames":[{"file":"mizu-jump-1.png","w":51,"h":74},{"file":"mizu-jump-2.png","w":55,"h":62}]}},"coco":{"idle":{"ms":320,"frames":[{"file":"coco-idle-1.png","w":52,"h":65},{"file":"coco-idle-2.png","w":54,"h":65},{"file":"coco-idle-3.png","w":55,"h":65}]},"walk":{"ms":170,"frames":[{"file":"coco-run-1.png","w":51,"h":62},{"file":"coco-run-2.png","w":54,"h":63},{"file":"coco-run-3.png","w":54,"h":63}]},"run":{"ms":95,"frames":[{"file":"coco-run-1.png","w":51,"h":62},{"file":"coco-run-2.png","w":54,"h":63},{"file":"coco-run-3.png","w":54,"h":63}]},"jump":{"ms":190,"frames":[{"file":"coco-jump-1.png","w":52,"h":70},{"file":"coco-jump-2.png","w":52,"h":62},{"file":"coco-jump-3.png","w":55,"h":61}]},"hide":{"ms":215,"frames":[{"file":"coco-hide-1.png","w":54,"h":46},{"file":"coco-hide-2.png","w":55,"h":41},{"file":"coco-hide-3.png","w":55,"h":34}]},"peek":{"ms":240,"frames":[{"file":"coco-peek-3.png","w":56,"h":33},{"file":"coco-peek-2.png","w":56,"h":35},{"file":"coco-peek-1.png","w":55,"h":35}]},"exit":{"ms":165,"frames":[{"file":"coco-hide-2.png","w":55,"h":41},{"file":"coco-hide-1.png","w":54,"h":46},{"file":"coco-jump-1.png","w":52,"h":70}]},"happy":{"ms":150,"frames":[{"file":"coco-jump-1.png","w":52,"h":70},{"file":"coco-jump-2.png","w":52,"h":62},{"file":"coco-jump-3.png","w":55,"h":61}]},"carried":{"ms":240,"frames":[{"file":"coco-jump-1.png","w":52,"h":70},{"file":"coco-jump-2.png","w":52,"h":62}]}},"mochi":{"idle":{"ms":320,"frames":[{"file":"mochi-idle-1.png","w":52,"h":65},{"file":"mochi-idle-2.png","w":52,"h":64},{"file":"mochi-idle-3.png","w":54,"h":66}]},"walk":{"ms":170,"frames":[{"file":"mochi-run-1.png","w":54,"h":64},{"file":"mochi-run-2.png","w":54,"h":62},{"file":"mochi-run-3.png","w":54,"h":63}]},"run":{"ms":95,"frames":[{"file":"mochi-run-1.png","w":54,"h":64},{"file":"mochi-run-2.png","w":54,"h":62},{"file":"mochi-run-3.png","w":54,"h":63}]},"jump":{"ms":190,"frames":[{"file":"mochi-jump-1.png","w":53,"h":74},{"file":"mochi-jump-2.png","w":49,"h":58},{"file":"mochi-jump-3.png","w":53,"h":62}]},"hide":{"ms":215,"frames":[{"file":"mochi-hide-1.png","w":57,"h":47},{"file":"mochi-hide-2.png","w":56,"h":43},{"file":"mochi-hide-3.png","w":54,"h":35}]},"peek":{"ms":240,"frames":[{"file":"mochi-peek-3.png","w":54,"h":28},{"file":"mochi-peek-2.png","w":56,"h":36},{"file":"mochi-peek-1.png","w":56,"h":36}]},"exit":{"ms":165,"frames":[{"file":"mochi-hide-2.png","w":56,"h":43},{"file":"mochi-hide-1.png","w":57,"h":47},{"file":"mochi-jump-1.png","w":53,"h":74}]},"happy":{"ms":150,"frames":[{"file":"mochi-jump-1.png","w":53,"h":74},{"file":"mochi-jump-2.png","w":49,"h":58},{"file":"mochi-jump-3.png","w":53,"h":62}]},"carried":{"ms":240,"frames":[{"file":"mochi-jump-1.png","w":53,"h":74},{"file":"mochi-jump-2.png","w":49,"h":58}]}},"strawberry":{"idle":{"ms":320,"frames":[{"file":"strawberry-idle-1.png","w":53,"h":66},{"file":"strawberry-idle-2.png","w":51,"h":65},{"file":"strawberry-idle-3.png","w":54,"h":66}]},"walk":{"ms":170,"frames":[{"file":"strawberry-run-1.png","w":54,"h":63},{"file":"strawberry-run-2.png","w":54,"h":63},{"file":"strawberry-run-3.png","w":56,"h":63}]},"run":{"ms":95,"frames":[{"file":"strawberry-run-1.png","w":54,"h":63},{"file":"strawberry-run-2.png","w":54,"h":63},{"file":"strawberry-run-3.png","w":56,"h":63}]},"jump":{"ms":190,"frames":[{"file":"strawberry-jump-1.png","w":53,"h":63},{"file":"strawberry-jump-2.png","w":53,"h":59},{"file":"strawberry-jump-3.png","w":53,"h":60}]},"hide":{"ms":215,"frames":[{"file":"strawberry-hide-1.png","w":55,"h":44},{"file":"strawberry-hide-2.png","w":55,"h":40},{"file":"strawberry-hide-3.png","w":54,"h":36}]},"peek":{"ms":240,"frames":[{"file":"strawberry-peek-3.png","w":54,"h":35},{"file":"strawberry-peek-2.png","w":55,"h":35},{"file":"strawberry-peek-1.png","w":56,"h":36}]},"exit":{"ms":165,"frames":[{"file":"strawberry-hide-2.png","w":55,"h":40},{"file":"strawberry-hide-1.png","w":55,"h":44},{"file":"strawberry-jump-1.png","w":53,"h":63}]},"happy":{"ms":150,"frames":[{"file":"strawberry-jump-1.png","w":53,"h":63},{"file":"strawberry-jump-2.png","w":53,"h":59},{"file":"strawberry-jump-3.png","w":53,"h":60}]},"carried":{"ms":240,"frames":[{"file":"strawberry-jump-1.png","w":53,"h":63},{"file":"strawberry-jump-2.png","w":53,"h":59}]}},"luna":{"idle":{"ms":320,"frames":[{"file":"luna-idle-1.png","w":53,"h":65},{"file":"luna-idle-2.png","w":54,"h":65},{"file":"luna-idle-3.png","w":55,"h":66}]},"walk":{"ms":170,"frames":[{"file":"luna-run-1.png","w":54,"h":63},{"file":"luna-run-2.png","w":55,"h":63},{"file":"luna-run-3.png","w":55,"h":63}]},"run":{"ms":95,"frames":[{"file":"luna-run-1.png","w":54,"h":63},{"file":"luna-run-2.png","w":55,"h":63},{"file":"luna-run-3.png","w":55,"h":63}]},"jump":{"ms":190,"frames":[{"file":"luna-jump-1.png","w":52,"h":71},{"file":"luna-jump-2.png","w":52,"h":60},{"file":"luna-jump-3.png","w":54,"h":59}]},"hide":{"ms":215,"frames":[{"file":"luna-hide-1.png","w":54,"h":48},{"file":"luna-hide-2.png","w":56,"h":45},{"file":"luna-hide-3.png","w":56,"h":34}]},"peek":{"ms":240,"frames":[{"file":"luna-peek-3.png","w":54,"h":31},{"file":"luna-peek-2.png","w":56,"h":36},{"file":"luna-peek-1.png","w":54,"h":36}]},"exit":{"ms":165,"frames":[{"file":"luna-hide-2.png","w":56,"h":45},{"file":"luna-hide-1.png","w":54,"h":48},{"file":"luna-jump-1.png","w":52,"h":71}]},"happy":{"ms":150,"frames":[{"file":"luna-jump-1.png","w":52,"h":71},{"file":"luna-jump-2.png","w":52,"h":60},{"file":"luna-jump-3.png","w":54,"h":59}]},"carried":{"ms":240,"frames":[{"file":"luna-jump-1.png","w":52,"h":71},{"file":"luna-jump-2.png","w":52,"h":60}]}},"pudding":{"idle":{"ms":320,"frames":[{"file":"pudding-idle-1.png","w":53,"h":65},{"file":"pudding-idle-2.png","w":53,"h":65},{"file":"pudding-idle-3.png","w":53,"h":65}]},"walk":{"ms":170,"frames":[{"file":"pudding-run-1.png","w":52,"h":63},{"file":"pudding-run-2.png","w":54,"h":63},{"file":"pudding-run-3.png","w":54,"h":63}]},"run":{"ms":95,"frames":[{"file":"pudding-run-1.png","w":52,"h":63},{"file":"pudding-run-2.png","w":54,"h":63},{"file":"pudding-run-3.png","w":54,"h":63}]},"jump":{"ms":190,"frames":[{"file":"pudding-jump-1.png","w":52,"h":65},{"file":"pudding-jump-2.png","w":53,"h":60},{"file":"pudding-jump-3.png","w":54,"h":60}]},"hide":{"ms":215,"frames":[{"file":"pudding-hide-1.png","w":56,"h":44},{"file":"pudding-hide-2.png","w":55,"h":43},{"file":"pudding-hide-3.png","w":55,"h":34}]},"peek":{"ms":240,"frames":[{"file":"pudding-peek-3.png","w":54,"h":31},{"file":"pudding-peek-2.png","w":55,"h":36},{"file":"pudding-peek-1.png","w":55,"h":36}]},"exit":{"ms":165,"frames":[{"file":"pudding-hide-2.png","w":55,"h":43},{"file":"pudding-hide-1.png","w":56,"h":44},{"file":"pudding-jump-1.png","w":52,"h":65}]},"happy":{"ms":150,"frames":[{"file":"pudding-jump-1.png","w":52,"h":65},{"file":"pudding-jump-2.png","w":53,"h":60},{"file":"pudding-jump-3.png","w":54,"h":60}]},"carried":{"ms":240,"frames":[{"file":"pudding-jump-1.png","w":52,"h":65},{"file":"pudding-jump-2.png","w":53,"h":60}]}}}};

return { default: __default };
})();
const __games_bunny_rescue_js_animation_js = await (async () => {
const manifest = __games_bunny_rescue_js_manifest_js.default;


const ANIMATIONS = {
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

class Animator {
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
  image.src = new URL(`../assets/${path}`, new URL('animation.js', SELF).href).href;
});

const ART = {
  tree: 'environment/tree', fence: 'environment/fence', shrub: 'environment/flower-shrub', bush: 'environment/flower-patch', sign: 'environment/signpost',
  hole0: 'props/hole-3', hole1: 'props/hole-4', hutchOpen: 'props/hutch-2', hutchClosed: 'props/hutch-3',
  lamp: 'environment/lamp', mailbox: 'environment/mailbox', flowerPink: 'environment/flower-pink', flowerRose: 'environment/flower-rose',
  pHeart: 'effects/p-heart', pFlower: 'effects/p-flower', pStar: 'effects/p-star', pLeaf: 'effects/p-leaf',
  sparkle: 'effects/effect-1', heart: 'effects/effect-3', ring: 'effects/effect-5',
};

async function loadSprites() {
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
function drawBunny(ctx, sprites, variant, animator, x, y, facing = 1) {
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

return { ANIMATIONS, Animator, loadSprites, drawBunny };
})();
const __games_bunny_rescue_js_bunny_js = await (async () => {
const { Animator } = __games_bunny_rescue_js_animation_js;
const { GRABBABLE } = __games_bunny_rescue_js_game_state_js;



class Bunny {
  constructor(variant, x, y) {
    Object.assign(this, { variant, x, y, vx: 0, vy: 0, facing: 1, hole: null, lift: 0 });
    this.anim = new Animator();
    this.setState('IDLE', 0.3 + Math.random());
  }
  setState(state, duration = 0) {
    this.state = state;
    this.timer = duration;
    this.elapsed = 0;
    this.duration = duration;
    const names = { IDLE: 'idle', WALK: 'walk', RUN: 'run', JUMP: 'jump', MOVING_TO_HOLE: 'run', HIDING: 'hide', HIDDEN: 'hide', PEEKING: 'peek', EXITING: 'exit', CARRIED: 'carried', RESCUED: 'happy' };
    this.anim.play(names[state]);
  }
  get grabbable() { return GRABBABLE.has(this.state); }
  contains(px, py) {
    return this.grabbable && Math.abs(px - this.x) <= 40 && py >= this.y - 84 - this.lift && py <= this.y + 14;
  }
}

return { Bunny };
})();
const __games_bunny_rescue_js_collision_js = await (async () => {

const inRect = (x, y, r, pad = 0) => x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Keep bunnies inside the garden and out of the hutch.
function contain(b, layout) {
  const { bounds: a, hutch } = layout;
  b.x = clamp(b.x, a.x0, a.x1);
  b.y = clamp(b.y, a.y0, a.y1);
  if (!inRect(b.x, b.y, hutch, 24)) return;
  const exits = [
    [Math.abs(b.x - (hutch.x - 25)), hutch.x - 25, b.y],
    [Math.abs(b.x - (hutch.x + hutch.w + 25)), hutch.x + hutch.w + 25, b.y],
    [Math.abs(b.y - (hutch.y - 25)), b.x, hutch.y - 25],
    [Math.abs(b.y - (hutch.y + hutch.h + 25)), b.x, hutch.y + hutch.h + 25],
  ].filter(([, x, y]) => x >= a.x0 && x <= a.x1 && y >= a.y0 && y <= a.y1).sort((p, q) => p[0] - q[0]);
  if (exits.length) [, b.x, b.y] = exits[0];
}

// Soft push so free bunnies do not stack on each other.
function separate(bunnies, dt) {
  const free = bunnies.filter((b) => ['IDLE', 'WALK', 'RUN'].includes(b.state));
  for (let i = 0; i < free.length; i++) {
    for (let j = i + 1; j < free.length; j++) {
      const a = free[i], b = free[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.01;
      if (d >= 52) continue;
      const push = (52 - d) * Math.min(1, dt * 6) / 2;
      const nx = d < 0.02 ? 1 : dx / d, ny = d < 0.02 ? 0 : dy / d;
      a.x -= nx * push; a.y -= ny * push;
      b.x += nx * push; b.y += ny * push;
    }
  }
}

return { inRect, clamp, contain, separate };
})();
const __games_bunny_rescue_js_bunny_ai_js = await (async () => {
const { CONFIG } = __games_bunny_rescue_js_game_state_js;
const { contain } = __games_bunny_rescue_js_collision_js;



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

function updateBunny(b, dt, world) {
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

return { updateBunny };
})();
const __games_bunny_rescue_js_environment_js = await (async () => {

// Pixel-art garden drawn in code, split into the layers of the draw order.
const px = (g, color, x, y, w, h) => { g.fillStyle = color; g.fillRect(Math.round(x), Math.round(y), w, h); };
const seeded = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// Place sprite art with its bottom centre at (x, y).
function put(g, image, x, y, width) {
  const h = image.height * width / image.width;
  g.drawImage(image, Math.round(x - width / 2), Math.round(y - h), width, Math.round(h));
}

// Layers 1-3: sky, distant decorations, terrain. Rendered once.
function renderBackground(layout, art) {
  const c = document.createElement('canvas');
  c.width = layout.w; c.height = layout.h;
  const g = c.getContext('2d');
  g.imageSmoothingEnabled = false;
  const rnd = seeded(20);
  const { w, h, horizon } = layout;
  px(g, '#C4F5E9', 0, 0, w, horizon + 40);
  for (let x = 90; x < w; x += 280) { px(g, '#fff', x, 36, 66, 18); px(g, '#fff', x + 15, 24, 33, 12); }
  const top = horizon + 40;
  px(g, '#a9dc8f', 0, top, w, h - top);
  for (let i = 0; i < 260; i++) px(g, rnd() < 0.5 ? '#9ad282' : '#bbe6a0', rnd() * w, top + rnd() * (h - top), 9, 3);
  put(g, art.tree, 55, top + 12, 130);
  put(g, art.tree, w - 55, top + 12, 130);
  for (let x = 150; x < w - 120; x += 88) put(g, art.fence, x, top + 8, 92);
  put(g, art.shrub, 135, top + 16, 76);
  put(g, art.bush, w - 135, top + 16, 66);
  put(g, art.lamp, 205, top + 22, 26);
  put(g, art.mailbox, w - 205, top + 24, 34);
  // Small flowers, kept clear of the holes and the hutch.
  const { hutch, holes } = layout;
  for (let i = 0, placed = 0; i < 200 && placed < 14; i++) {
    const x = 25 + rnd() * (w - 50), y = top + 75 + rnd() * (h - top - 85);
    const nearHole = holes.some(([hx, hy]) => Math.abs(x - hx) < 85 && Math.abs(y - hy) < 60);
    const nearHutch = x > hutch.x - 30 && x < hutch.x + hutch.w + 30 && y > hutch.y - 40 && y < hutch.y + hutch.h + 40;
    if (nearHole || nearHutch) continue;
    put(g, placed++ % 2 ? art.flowerPink : art.flowerRose, x, y, 22);
  }
  return c;
}

const HOLE_W = 128;
function holeBox(art, i, [x, y]) {
  const image = art[`hole${i % 2}`];
  const h = image.height * HOLE_W / image.width;
  return { image, x: x - HOLE_W / 2, y: y - h * 0.55, h };
}
function drawHoleBack(g, art, i, pos) {
  const b = holeBox(art, i, pos);
  g.drawImage(b.image, b.x, b.y, HOLE_W, b.h);
}
// Front lip: the same art clipped to below the opening, so it covers the bunny's base.
function drawHoleFront(g, art, i, pos) {
  const b = holeBox(art, i, pos);
  const [x, y] = pos;
  g.save();
  g.beginPath();
  g.moveTo(b.x, y);
  g.lineTo(x - 38, y);
  g.ellipse(x, y, 38, 13, 0, Math.PI, 0, true);
  g.lineTo(b.x + HOLE_W, y);
  g.lineTo(b.x + HOLE_W, b.y + b.h);
  g.lineTo(b.x, b.y + b.h);
  g.closePath();
  g.clip();
  g.drawImage(b.image, b.x, b.y, HOLE_W, b.h);
  g.restore();
}

function drawForeground(g, layout, t) {
  for (let x = 12; x < layout.w; x += 54) {
    const sway = Math.round(Math.sin(t * 1.5 + x) * 2);
    px(g, '#6fb56a', x + sway, layout.h - 14, 6, 14); px(g, '#6fb56a', x + 12, layout.h - 9, 6, 9);
  }
}

// Door opening inside hutch-2, and the door itself inside hutch-3 (source pixels).
const OPENING = { x: 41, y: 56, w: 43, h: 57 };
const DOOR = { x: 37, y: 55, w: 48, h: 67 };

function hutchBox(art, { x, y, w, h }) {
  const k = (h + 20) / art.hutchClosed.height; // one scale for both frames, so nothing jumps
  return (image) => ({ x: x + (w - image.width * k) / 2, y: y + h - image.height * k, w: image.width * k, h: image.height * k, k });
}

function doorPosition(art, hutch) {
  const b = hutchBox(art, hutch)(art.hutchOpen);
  return { x: b.x + (OPENING.x + OPENING.w / 2) * b.k, y: b.y + (OPENING.y + OPENING.h) * b.k };
}

// open: 0 = shut, 1 = fully open. In between, the two halves of the door swing on their hinges.
function drawHutch(g, art, hutch, count, open, highlight, bump) {
  const { x, y, w, h } = hutch;
  const box = hutchBox(art, hutch);
  if (highlight) {
    g.fillStyle = '#FFF19Bcc';
    g.beginPath(); g.ellipse(x + w / 2, y + h - 8, w / 2 + 8, 26, 0, 0, Math.PI * 2); g.fill();
  }
  g.save();
  g.translate(x + w / 2, y + h);
  g.scale(1 + bump * 0.05, 1 - bump * 0.05);
  g.translate(-(x + w / 2), -(y + h));
  const paint = (image) => { const b = box(image); g.drawImage(image, b.x, b.y, b.w, b.h); };
  if (open <= 0) paint(art.hutchClosed);
  else {
    paint(art.hutchOpen);
    if (open < 1) {
      const b = box(art.hutchOpen);
      const left = b.x + OPENING.x * b.k, top = b.y + OPENING.y * b.k, width = OPENING.w * b.k, height = OPENING.h * b.k;
      const half = (width / 2) * (1 - open);
      g.save();
      g.beginPath(); // arched doorway
      g.moveTo(left, top + height);
      g.lineTo(left, top + width / 2);
      g.arc(left + width / 2, top + width / 2, width / 2, Math.PI, 0);
      g.lineTo(left + width, top + height);
      g.clip();
      g.drawImage(art.hutchClosed, DOOR.x, DOOR.y, DOOR.w / 2, DOOR.h, left, top, half, height);
      g.drawImage(art.hutchClosed, DOOR.x + DOOR.w / 2, DOOR.y, DOOR.w / 2, DOOR.h, left + width - half, top, half, height);
      g.restore();
    }
  }
  g.restore();
  g.fillStyle = '#fff'; g.strokeStyle = '#493D48'; g.lineWidth = 3;
  g.beginPath(); g.arc(x + w - 14, y + 24, 18, 0, Math.PI * 2); g.fill(); g.stroke();
  g.fillStyle = '#493D48'; g.font = '700 18px "Pixelify Sans", monospace'; g.textAlign = 'center';
  g.fillText(count, x + w - 14, y + 30);
}

return { renderBackground, drawHoleBack, drawHoleFront, drawForeground, doorPosition, drawHutch };
})();
const __games_bunny_rescue_js_particles_js = await (async () => {

class Particles {
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

return { Particles };
})();
const __games_bunny_rescue_js_audio_js = await (async () => {

// All game audio is synthesised with the Web Audio API; no files needed.
const MELODY = [523, 659, 784, 659, 587, 698, 880, 698, 523, 659, 784, 1047, 988, 784, 659, 587];
let ctx = null, master = null, timer = null, step = 0, nextAt = 0;
let enabled = true;
try { enabled = sessionStorage.getItem('tisya.game.sound') !== '0'; } catch { /* storage blocked */ }

const isEnabled = () => enabled;

// Call from a user gesture (autoplay policy).
function unlock() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = enabled ? 1 : 0;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
}

function setEnabled(on) {
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

function sfx(name) {
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

function startMusic() {
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

function stopMusic() {
  clearInterval(timer);
  timer = null;
}

return { isEnabled, unlock, setEnabled, sfx, startMusic, stopMusic };
})();
const __games_bunny_rescue_js_game_js = await (async () => {
const { CONFIG } = __games_bunny_rescue_js_game_state_js;
const { Bunny } = __games_bunny_rescue_js_bunny_js;
const { updateBunny } = __games_bunny_rescue_js_bunny_ai_js;
const { drawBunny } = __games_bunny_rescue_js_animation_js;
const { contain, separate, inRect, clamp } = __games_bunny_rescue_js_collision_js;
const env = __games_bunny_rescue_js_environment_js;
const { Particles } = __games_bunny_rescue_js_particles_js;
const audio = __games_bunny_rescue_js_audio_js;









class Game {
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

return { Game };
})();
const __games_bunny_rescue_js_input_js = await (async () => {

// Pointer Events: one input path for mouse, touch and pen. Only one pointer drags at a time.
function bindPointer(canvas, handlers) {
  let active = null;
  const point = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height, touch: e.pointerType === 'touch' };
  };
  canvas.addEventListener('pointerdown', (e) => {
    if (active !== null || e.button !== 0) return;
    e.preventDefault();
    if (!handlers.down(point(e))) return;
    active = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => { if (e.pointerId === active) handlers.move(point(e)); });
  const finish = (e, cancelled) => {
    if (e.pointerId !== active) return;
    active = null;
    handlers.up(point(e), cancelled);
  };
  canvas.addEventListener('pointerup', (e) => finish(e, false));
  canvas.addEventListener('pointercancel', (e) => finish(e, true));
  canvas.addEventListener('lostpointercapture', (e) => finish(e, true));
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  return { reset: () => { active = null; } };
}

return { bindPointer };
})();
const __games_bunny_rescue_js_ui_js = await (async () => {
const { CONFIG } = __games_bunny_rescue_js_game_state_js;
const audio = __games_bunny_rescue_js_audio_js;



const $ = (s) => document.querySelector(s);
let shown = null;

function renderHud(game) {
  $('#time').textContent = Math.ceil(game.time);
  $('#score').textContent = `${game.score}/${CONFIG.target}`;
  $('#hand').textContent = game.held ? 1 : 0;
  $('#progress').textContent = `${game.score}/${CONFIG.target}`;
  $('#fill').style.width = `${game.score / CONFIG.target * 100}%`;
  $('#final-score').textContent = game.score;
  $('#pause').disabled = game.phase !== 'playing';
  if (game.phase === shown) return;
  shown = game.phase;
  const screens = { ready: '#start', paused: '#paused', victory: '#victory', gameover: '#gameover' };
  for (const [phase, id] of Object.entries(screens)) $(id).hidden = phase !== game.phase;
  if (game.phase !== 'playing') audio.stopMusic();
}

function renderSound() {
  document.querySelectorAll('.sound').forEach((b) => { b.textContent = `Sound: ${audio.isEnabled() ? 'on' : 'off'}`; });
}

function goBack() {
  const home = new URL('../../index.html', location.href);
  let sameSite = false;
  try {
    const from = new URL(document.referrer);
    sameSite = from.origin === location.origin && from.pathname.startsWith(new URL('../../', location.href).pathname) && from.pathname !== location.pathname;
  } catch { /* no referrer */ }
  if ((sameSite || location.protocol === 'file:') && history.length > 1) history.back();
  else location.href = home.href;
}

return { renderHud, renderSound, goBack };
})();
const __js_navigation_js = await (async () => {

const KEY = 'tisya.visited';
const PARTS = ['memories', 'letter', 'photobooth', 'bunny'];

function visited() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function markVisited(key) {
  const list = new Set(visited());
  list.add(key);
  try { localStorage.setItem(KEY, JSON.stringify([...list])); } catch { /* storage blocked */ }
}
function initProgress() {
  const seen = visited().filter((k) => PARTS.includes(k));
  document.querySelectorAll('.card[data-key]').forEach((c) => c.classList.toggle('visited', seen.includes(c.dataset.key)));
  document.querySelectorAll('.progress-note').forEach((el) => {
    el.textContent = seen.length === PARTS.length
      ? 'Kamu sudah menjelajahi semuanya.'
      : `${seen.length} dari ${PARTS.length} sudut sudah kamu jelajahi.`;
  });
  document.querySelector('.topbar [aria-current]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
}

return { visited, markVisited, initProgress };
})();
const __games_bunny_rescue_js_main_js = await (async () => {
const { Game } = __games_bunny_rescue_js_game_js;
const { LAYOUTS } = __games_bunny_rescue_js_game_state_js;
const { loadSprites, drawBunny, Animator } = __games_bunny_rescue_js_animation_js;
const { bindPointer } = __games_bunny_rescue_js_input_js;
const audio = __games_bunny_rescue_js_audio_js;
const { renderHud, renderSound, goBack } = __games_bunny_rescue_js_ui_js;
const { markVisited } = __js_navigation_js;








const $ = (s) => document.querySelector(s);
const canvas = $('.stage canvas'), stage = $('.stage');
const pickLayout = () => (innerHeight > innerWidth ? LAYOUTS.portrait : LAYOUTS.landscape);

let sprites;
try {
  sprites = await loadSprites();
} catch (err) {
  $('#play').textContent = 'Aset gagal dimuat';
  throw err;
}

const game = new Game(canvas, sprites, pickLayout(), () => renderHud(game));

function fit() {
  const k = Math.min(stage.clientWidth / canvas.width, stage.clientHeight / canvas.height);
  canvas.style.width = `${Math.floor(canvas.width * k)}px`;
  canvas.style.height = `${Math.floor(canvas.height * k)}px`;
}
function resize() {
  // The layout only changes between rounds, never mid-game.
  if (game.phase === 'ready' && game.layout !== pickLayout()) game.setLayout(pickLayout());
  fit();
}
new ResizeObserver(resize).observe(stage);

const input = bindPointer(canvas, {
  down: (p) => game.down(p),
  move: (p) => game.move(p),
  up: (p, cancelled) => game.up(p, cancelled),
});

function begin() {
  audio.unlock();
  audio.sfx('button');
  input.reset();
  if (game.layout !== pickLayout()) { game.setLayout(pickLayout()); fit(); }
  game.start();
  audio.startMusic();
}
$('#play').disabled = false;
$('#play').textContent = 'Play';
$('#play').addEventListener('click', begin);
document.querySelectorAll('.restart').forEach((b) => b.addEventListener('click', () => { audio.stopMusic(); begin(); }));
$('#pause').addEventListener('click', () => { audio.sfx('button'); input.reset(); game.pause(); });
$('#resume').addEventListener('click', () => { audio.unlock(); audio.sfx('button'); game.resume(); audio.startMusic(); });
document.querySelectorAll('.sound').forEach((b) => b.addEventListener('click', () => {
  audio.unlock();
  audio.setEnabled(!audio.isEnabled());
  audio.sfx('button');
  renderSound();
}));
document.querySelectorAll('.back').forEach((b) => b.addEventListener('click', () => { audio.stopMusic(); goBack(); }));
document.addEventListener('visibilitychange', () => { if (document.hidden) { input.reset(); game.pause(); } });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') game.pause(); });
window.addEventListener('pagehide', () => { game.pause(); audio.stopMusic(); });

// Mascots on the start and victory screens use the same sprite system.
const mascots = [...document.querySelectorAll('.mascot')].map((c) => ({ c, anim: new Animator() }));

let last = performance.now();
function frame(now) {
  const dt = Math.max(0, Math.min(0.1, (now - last) / 1000)); // delta time, clamped after tab switches
  last = now;
  game.update(dt);
  game.draw();
  for (const m of mascots) {
    if (!m.c.offsetParent && m.c.closest('.screen').hidden) continue;
    m.anim.play(m.c.closest('#victory') ? 'happy' : 'idle');
    m.anim.update(dt, sprites.atlases.snowy.animations[m.anim.name]);
    const g = m.c.getContext('2d');
    g.clearRect(0, 0, 192, 192);
    g.save(); g.translate(96, 170); g.scale(1.6, 1.6);
    drawBunny(g, sprites, 'snowy', m.anim, 0, 0);
    g.restore();
  }
  if (game.phase === 'victory' && Math.random() < dt * 8) game.particles.burst(Math.random() * game.layout.w, game.layout.h * 0.4, Math.random() < 0.5 ? 'heart' : 'sparkle', 3);
  requestAnimationFrame(frame);
}
markVisited('bunny');
renderHud(game);
renderSound();
requestAnimationFrame(frame);
if (new URLSearchParams(location.search).has('debug')) window.__game = game;

return {  };
})();
})();

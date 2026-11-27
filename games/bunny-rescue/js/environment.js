// Pixel-art garden drawn in code, split into the layers of the draw order.
const px = (g, color, x, y, w, h) => { g.fillStyle = color; g.fillRect(Math.round(x), Math.round(y), w, h); };
const seeded = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// Place sprite art with its bottom centre at (x, y).
function put(g, image, x, y, width) {
  const h = image.height * width / image.width;
  g.drawImage(image, Math.round(x - width / 2), Math.round(y - h), width, Math.round(h));
}

// Layers 1-3: sky, distant decorations, terrain. Rendered once.
export function renderBackground(layout, art) {
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
export function drawHoleBack(g, art, i, pos) {
  const b = holeBox(art, i, pos);
  g.drawImage(b.image, b.x, b.y, HOLE_W, b.h);
}
// Front lip: the same art clipped to below the opening, so it covers the bunny's base.
export function drawHoleFront(g, art, i, pos) {
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

export function drawForeground(g, layout, t) {
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

export function doorPosition(art, hutch) {
  const b = hutchBox(art, hutch)(art.hutchOpen);
  return { x: b.x + (OPENING.x + OPENING.w / 2) * b.k, y: b.y + (OPENING.y + OPENING.h) * b.k };
}

// open: 0 = shut, 1 = fully open. In between, the two halves of the door swing on their hinges.
export function drawHutch(g, art, hutch, count, open, highlight, bump) {
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

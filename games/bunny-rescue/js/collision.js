export const inRect = (x, y, r, pad = 0) => x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Keep bunnies inside the garden and out of the hutch.
export function contain(b, layout) {
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
export function separate(bunnies, dt) {
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

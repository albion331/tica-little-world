// Pointer Events: one input path for mouse, touch and pen. Only one pointer drags at a time.
export function bindPointer(canvas, handlers) {
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

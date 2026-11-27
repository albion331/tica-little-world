export const CONFIG = { duration: 45, target: 10, maxHiding: 3 };
export const STATES = ['IDLE', 'WALK', 'RUN', 'JUMP', 'MOVING_TO_HOLE', 'HIDING', 'HIDDEN', 'PEEKING', 'EXITING', 'CARRIED', 'RESCUED'];
export const GRABBABLE = new Set(['IDLE', 'WALK', 'RUN', 'JUMP', 'MOVING_TO_HOLE']);

// Two logical layouts so the arena fills both wide and tall screens.
export const LAYOUTS = {
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

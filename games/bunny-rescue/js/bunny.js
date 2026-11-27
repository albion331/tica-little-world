import { Animator } from './animation.js';
import { GRABBABLE } from './game-state.js';

export class Bunny {
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

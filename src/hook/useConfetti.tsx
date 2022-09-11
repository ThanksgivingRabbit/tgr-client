/* eslint-disable no-magic-numbers */
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const count = 200;
interface Options {
  spread?: number;
  decay?: number;
  scalar?: number;
  startVelocity?: number;
}

const defaults = {
  origin: { y: 0.7 },
};

const fire = (particleRatio: number, options: Options) => {
  // eslint-disable-next-line no-void
  void confetti({
    ...defaults,
    ...options,
    particleCount: Math.floor(count * particleRatio),
  });
};

export default (trigger: boolean) => {
  useEffect(() => {
    if (trigger) {
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        decay: 0.91,
        scalar: 0.8,
        spread: 100,
      });
      fire(0.1, {
        decay: 0.92,
        scalar: 1.2,
        spread: 120,
        startVelocity: 25,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [trigger]);
};

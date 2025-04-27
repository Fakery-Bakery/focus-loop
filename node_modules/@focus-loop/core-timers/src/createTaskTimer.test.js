import { expect, test, describe } from 'vitest';
import { createTaskTimer } from './createTaskTimer.js';
import { TIMER_STATE } from './index.js';

describe('createTaskTimer', () => {
  test('creates a task timer with initial state', () => {
    const timer = createTaskTimer({ duration: 25 * 60 * 1000 }); // 25 minutes
    expect(timer.getState()).toBe(TIMER_STATE.IDLE);
    expect(timer.getRemaining()).toBe(25 * 60 * 1000);
  });

  test('starts and updates timer state', () => {
    const timer = createTaskTimer({ duration: 25 * 60 * 1000 });
    timer.start();
    expect(timer.getState()).toBe(TIMER_STATE.RUNNING);
  });

  test('pauses timer', () => {
    const timer = createTaskTimer({ duration: 25 * 60 * 1000 });
    timer.start();
    timer.pause();
    expect(timer.getState()).toBe(TIMER_STATE.PAUSED);
  });

  test('resumes timer from pause', () => {
    const timer = createTaskTimer({ duration: 25 * 60 * 1000 });
    timer.start();
    timer.pause();
    timer.resume();
    expect(timer.getState()).toBe(TIMER_STATE.RUNNING);
  });
}); 
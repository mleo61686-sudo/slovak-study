import { SrsState } from "./types";

const DAY = 1000 * 60 * 60 * 24;

export function initState(id: string): SrsState {
  return {
    id,
    dueAt: Date.now(),
    interval: 0,
    ease: 2.5,
    reps: 0,
  };
}

export function review(prev: SrsState, grade: 0 | 1 | 2 | 3): SrsState {
  let { ease, interval, reps } = prev;

  if (grade === 0) {
    return { ...prev, interval: 1, reps: 0, dueAt: Date.now() + DAY };
  }

  if (grade === 1) ease -= 0.15;
  if (grade === 2) ease += 0.05;
  if (grade === 3) ease += 0.15;

  reps++;
  if (reps === 1) interval = 1;
  else if (reps === 2) interval = 3;
  else interval = Math.round(interval * ease);

  return {
    ...prev,
    ease: Math.max(1.3, ease),
    reps,
    interval,
    dueAt: Date.now() + interval * DAY,
  };
}
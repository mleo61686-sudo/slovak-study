export type Word = {
  sk: string;
  ua: string;
  ipa?: string;
};

export type SrsState = {
  id: string;        // sk слово
  dueAt: number;
  interval: number;
  ease: number;
  reps: number;
};
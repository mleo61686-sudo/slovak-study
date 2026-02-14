export const phraseKey = (sk: string, ua: string, lessonId: string | number) =>
  `${sk.trim().toLowerCase()}||${ua.trim().toLowerCase()}||${String(lessonId).toLowerCase()}`;

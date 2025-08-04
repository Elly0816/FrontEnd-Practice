export const showFormattedTime = (hours, minutes, seconds, milliSeconds) => {
  const hh = String(hours).padStart(2, 0);
  const mins = String(minutes).padStart(2, 0);
  const sec = String(seconds).padStart(2, 0);
  const ms = String(Math.floor(milliSeconds / 10)).padStart(2, 0);

  return `${hh}:${mins}:${sec}:${ms}`;
};

export const allZero = (obj) => Object.values(obj).every((v) => v == 0);

export const fromMilliToFormattedTime = (milliSeconds) => {
  let milliSecondsRemaining;
  const hours = Math.floor(milliSeconds / (1000 * 60 * 60));
  milliSecondsRemaining = milliSeconds % (1000 * 60 * 60);
  const minutes = Math.floor(milliSecondsRemaining / (1000 * 60));
  milliSecondsRemaining = milliSecondsRemaining % (1000 * 60);
  const seconds = Math.floor(milliSecondsRemaining / 1000);
  milliSecondsRemaining = Math.floor(milliSecondsRemaining % 1000);
  console.log(`hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}, milliSeconds: ${milliSecondsRemaining}`);
  return { hours, minutes, seconds, milliSecondsRemaining };
};

export const fromTimeFormatToMilliSeconds = (hours, minutes, seconds, milliSeconds) => {
  const totalMilliSeconds = milliSeconds + seconds * 1000 + minutes * 1000 * 60 + hours * 1000 * 60 * 60;
  return totalMilliSeconds;
};

export const CONSTANTS = {
  PLAY: 'Play',
  PAUSE: 'Pause',
  STOPWATCH: 'STOPWATCH',
  TIMER: 'TIMER',
  RESET: 'Reset',
  SPLIT: 'Split',
};

const MS_IN_SECONDS = 1000;
const MS_IN_MINUTES = 1000 * 60;
const MS_IN_HOURS = 1000 * 60 * 60;

export function displayDuration(ms: number) {
  const hours = Math.floor(ms / MS_IN_HOURS);
  const minutes = Math.floor((ms % MS_IN_HOURS) / MS_IN_MINUTES);
  const seconds = Math.floor((ms % MS_IN_MINUTES) / MS_IN_SECONDS);
  // const remainingMs = Math.floor(ms % MS_IN_SECONDS);

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${padLeft(seconds)}`;
  }
}

function padLeft(number: number) {
  if (number >= 0 && number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

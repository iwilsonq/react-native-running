import { MS_IN_HOURS, MS_IN_MINUTES, MS_IN_SECONDS } from "./constants";
import { padLeft } from "./padLeft";

export function displayDuration(ms: number): string {
  const hours = Math.floor(ms / MS_IN_HOURS);
  const minutes = Math.floor((ms % MS_IN_HOURS) / MS_IN_MINUTES);
  const seconds = Math.floor((ms % MS_IN_MINUTES) / MS_IN_SECONDS);
  const _remainingMs = Math.floor(ms % MS_IN_SECONDS);

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${padLeft(seconds)}`;
  }
}

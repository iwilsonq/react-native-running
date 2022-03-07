import { METERS_IN_MILE, MS_IN_MINUTES } from "./constants";
import { padLeft } from "./padLeft";

export interface Stats {
  calories: number;
  addedDistance: number;
  addedDuration: number;
  totalDistance: number;
  totalDuration: number;
  elevationGained: number;
  heartrate: number | null;
}

export interface MomentaryStats {
  averageHeartrate: number | null;
  averagePace: string;
  currentHeartrate: number | null;
  currentPace: string;
  distance: string;
  duration: string;
}

export interface AllStats {
  rolling: Stats[];
  momentary: MomentaryStats;
}

export function createStats(): Stats {
  return {
    calories: 0,
    addedDistance: 0,
    addedDuration: 0,
    totalDistance: 0,
    totalDuration: 0,
    elevationGained: 0,
    heartrate: null,
  };
}

export function getDistanceInMiles(distanceInMeters: number): number {
  return distanceInMeters / METERS_IN_MILE;
}

export function getPacePerMile(
  durationInMs: number,
  distanceInMeters: number,
): number {
  if (distanceInMeters === 0) {
    return 0;
  }

  const durationInMinutes = durationInMs / MS_IN_MINUTES;
  const distanceInMiles = getDistanceInMiles(distanceInMeters);

  return durationInMinutes / distanceInMiles;
}

export function displayDistanceInMiles(distanceInMeters: number): string {
  const distanceInMiles = getDistanceInMiles(distanceInMeters);
  return distanceInMiles.toFixed(2);
}

export function getAndDisplayPacePerMile(
  durationInMs: number,
  distanceInMeters: number,
): string {
  const minutesPerMile = getPacePerMile(durationInMs, distanceInMeters);
  return displayPacePerMile(minutesPerMile);
}

export function displayPacePerMile(minutesPerMile: number): string {
  const wholeMinutesPerMile = Math.floor(minutesPerMile);
  const fractionalMinutePerMile = minutesPerMile % 1;
  const fractionalSeconds = Math.floor(fractionalMinutePerMile * 60);
  return `${wholeMinutesPerMile}'${padLeft(fractionalSeconds)}"`;
}

export { displayDuration } from "./time";

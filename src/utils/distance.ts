import Geolocation from "react-native-geolocation-service";

export interface GeoPosition extends Geolocation.GeoPosition {}

export function getDistanceBetweenGeoPositions(
  pointA: GeoPosition,
  pointB: GeoPosition,
): number {
  // Haversine formula
  // https://www.movable-type.co.uk/scripts/latlong.html
  const R = 6371e3; // metres
  const φ1 = (pointA.coords.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (pointB.coords.longitude * Math.PI) / 180;
  const Δφ =
    ((pointB.coords.latitude - pointA.coords.latitude) * Math.PI) / 180;
  const Δλ =
    ((pointB.coords.longitude - pointB.coords.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d;
}

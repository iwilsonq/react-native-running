import React from "react";
import { Region } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

interface UseGeoLocation {
  region?: Region;
  position?: Geolocation.GeoPosition;
}

const DEFAULT_LATITUDE_DELTA = 0.015;
const DEFAULT_LONGITUDE_DELTA = 0.0121;

function useGeolocation(): UseGeoLocation {
  const [position, setPosition] = React.useState<
    Geolocation.GeoPosition | undefined
  >();
  const watchIdRef = React.useRef<number>();

  function clearWatch(watchId: number) {
    Geolocation.clearWatch(watchId);
  }

  React.useEffect(() => {
    watchIdRef.current = Geolocation.watchPosition(
      position => setPosition(position),
      error => {
        console.log("error", error.code, error.message);
      },
      { enableHighAccuracy: true, maximumAge: 10000 },
    );

    return () => {
      if (watchIdRef.current !== undefined) {
        clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const region: Region | undefined = position
    ? {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      }
    : undefined;

  return { region, position };
}

export default useGeolocation;

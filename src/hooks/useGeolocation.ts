import React from "react";
import { Region } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

function useGeolocation() {
  const [region, setRegion] = React.useState<Region | undefined>();
  const watchIdRef = React.useRef<number>();

  function clearWatch(watchId: number) {
    Geolocation.clearWatch(watchId);
  }

  React.useEffect(() => {
    watchIdRef.current = Geolocation.watchPosition(
      position => {
        console.log(position)
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      },
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

  return { region };
}

export default useGeolocation;

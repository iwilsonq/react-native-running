import React from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeMapView, { Address, LatLng, Region } from "react-native-maps";

interface Props {
  region?: Region;
}

export function MapView({ region }: Props) {
  const mapViewRef = React.useRef<ReactNativeMapView | null>(null);

  async function addressForCoordinate(
    coordinate: LatLng,
  ): Promise<Address | null> {
    if (mapViewRef.current) {
      const address = await mapViewRef.current.addressForCoordinate(coordinate);
      return address;
    }

    return null;
  }

  React.useEffect(() => {
    addressForCoordinate({
      latitude: region?.latitude || 0,
      longitude: region?.longitude || 0,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ReactNativeMapView
        followsUserLocation={false}
        ref={mapViewRef}
        region={region}
        showsUserLocation={true}
        style={styles.map}></ReactNativeMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList, RunStackParamList } from "types/app";
import Layout from "templates/Layout";
import useGeolocation from "hooks/useGeolocation";
import { MapView } from "molecules/MapView";
import { Button } from "atoms/Button";
import { useRunStateContext } from "hooks/useRunStateContext";

export function StartRunScreen({
  navigation,
}: NativeStackScreenProps<RunStackParamList, "Run">) {
  const { region } = useGeolocation();
  const { state, start } = useRunStateContext();

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView region={region} />
        </View>
        <View style={styles.startButtonWrapper}>
          <Button
            onPress={() => {
              start();
              navigation.navigate("RunDashboard");
            }}>
            Start
          </Button>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  mapContainer: {
    height: 400,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  startButtonWrapper: {
    marginTop: 32,
  },
});

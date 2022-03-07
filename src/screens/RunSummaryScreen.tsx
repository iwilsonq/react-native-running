import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RunStackParamList } from "types/app";
import Layout from "templates/Layout";
import { Text } from "atoms/Text";
import { Button } from "atoms/Button";
import { useRunStateContext } from "hooks/useRunStateContext";
import { Stat } from "molecules/Stat";
import { MapView } from "molecules/MapView";
import {
  displayDistanceInMiles,
  displayDuration,
  displayPacePerMile,
} from "utils/stats";

export function RunSummaryScreen({
  navigation,
}: NativeStackScreenProps<RunStackParamList, "RunSummary">) {
  const { state, exit } = useRunStateContext();

  const {
    region,
    stats: { momentary },
  } = state.context;

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text size="lg">Run Summary</Text>
        </View>
        <View style={styles.statsSection}>
          <View style={styles.statsColumn}>
            <Stat value={momentary.averagePace} label="Avg. pace" />
            <Stat value="435ft" label="Elevation gained" />
          </View>
          <View style={styles.statsColumn}>
            <Stat value={momentary.distance} label="Miles ran" />
            <Stat
              value={momentary.averageHeartrate?.toString() || "-"}
              label="Avg. BPM"
            />
          </View>
          <View style={styles.statsColumn}>
            <Stat value={momentary.duration} label="Duration" />
          </View>
        </View>
        <View style={styles.mapContainer}>
          <MapView region={region} />
        </View>

        <View style={styles.actionButtonWrapper}>
          <Button
            onPress={() => {
              exit();
              navigation.navigate("Run");
            }}>
            Home
          </Button>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-start",
  },
  heading: {
    marginBottom: 16,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  statsColumn: {
    marginBottom: 8,
  },
  mapContainer: {
    height: 300,
    width: "100%",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    flex: 2,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonWrapper: {
    marginRight: 16,
  },
});

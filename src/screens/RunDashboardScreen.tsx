import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RunStackParamList } from "types/app";
import Layout from "templates/Layout";
import { Text } from "atoms/Text";
import { Button } from "atoms/Button";
import { useRunStateContext } from "hooks/useRunStateContext";
import { Countdown } from "organisms/Countdown";
import { displayDuration } from "utils/stats";
import { MainStat, Stat } from "molecules/Stat";

export function RunDashboardScreen({
  navigation,
}: NativeStackScreenProps<RunStackParamList, "RunDashboard">) {
  const { state, pause, resume, end } = useRunStateContext(true);

  if (state.matches("countdown")) {
    return <Countdown countdown={state.context.countdown} />;
  }

  const {
    elapsed,
    stats: { momentary },
  } = state.context;
  const elapsedInMs = elapsed * 1000;

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Stat label="Avg. pace" value={momentary.averagePace} />
          <Stat label="Miles" value={momentary.distance} />
          <Stat label="Duration" value={displayDuration(elapsedInMs)} />
        </View>
        <View style={styles.main}>
          {state.matches("paused") ? (
            <Text>Paused.</Text>
          ) : (
            <Text>Running!</Text>
          )}
          <MainStat label="Pace" value={momentary.currentPace} />
        </View>
        <View style={styles.actionButtons}>
          {state.matches("active") ? (
            <View style={styles.actionButtonWrapper}>
              <Button onPress={() => pause()}>Pause</Button>
            </View>
          ) : null}
          {state.matches("paused") ? (
            <View style={styles.actionButtonWrapper}>
              <Button onPress={() => resume()}>Resume</Button>
            </View>
          ) : null}
          {state.matches("active") || state.matches("paused") ? (
            <View style={styles.actionButtonWrapper}>
              <Button
                variant="danger"
                onPress={() => {
                  end();
                  navigation.navigate("RunSummary");
                }}>
                End
              </Button>
            </View>
          ) : null}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  topbar: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  topbarItem: {
    fontSize: 24,
  },
  main: {
    flex: 4,
    alignItems: "center",
  },
  primaryStat: {
    fontSize: 64,
    fontWeight: "700",
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

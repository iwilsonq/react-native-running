import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RunStackParamList } from "types/app";
import Layout from "templates/Layout";
import { Text } from "atoms/Text";
import { Button } from "atoms/Button";
import { useRunStateContext } from "hooks/useRunStateContext";
import { Countdown } from "organisms/Countdown";

export function RunDashboardScreen({
  navigation,
}: NativeStackScreenProps<RunStackParamList, "RunDashboard">) {
  const { state, pause, resume, end } = useRunStateContext();

  if (state.matches("countdown")) {
    return <Countdown countdown={state.context.countdown} />;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Text size="md">7'47"</Text>
          <Text size="md">6.11mi</Text>
          <Text size="md">43:07</Text>
        </View>

        <View style={styles.main}>
          <Text size="xl">7'31"</Text>
          {state.matches("paused") ? (
            <Text>Paused.</Text>
          ) : (
            <Text>Running!</Text>
          )}
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

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabParamList } from "types/app";
import React from "react";
import {
  Text,
  Button as ReactNativeButton,
  StyleSheet,
  View,
} from "react-native";
import useWorkouts from "hooks/useWorkouts";
import WorkoutList from "molecules/WorkoutList";
import Layout from "templates/Layout";
import { Button } from "atoms/Button";

export function HistoryScreen({
  navigation,
}: NativeStackScreenProps<BottomTabParamList, "History">) {
  const { data: workouts, error } = useWorkouts();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ReactNativeButton
          onPress={() =>
            navigation.navigate({ name: "Profile", params: undefined })
          }
          title="Profile"
        />
      ),
    });
  }, [navigation]);

  if (!workouts) {
    return (
      <Layout>
        <Text>Loading...</Text>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Text>Error: {error}</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <WorkoutList workouts={workouts} />
      <View style={styles.buttonWrapper}>
        <Button
          onPress={() =>
            navigation.navigate({ name: "StartRun", params: undefined })
          }>
          Go Run
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
  },
});

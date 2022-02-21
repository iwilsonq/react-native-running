import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "types/app";
import React from "react";
import { Text, Button as ReactNativeButton } from "react-native";
import useWorkouts from "hooks/useWorkouts";
import WorkoutList from "molecules/WorkoutList";
import Layout from "templates/Layout";
import Button from "atoms/Button";

function HistoryScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "History">) {
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
      <Button
        label="Go Run"
        onPress={() => navigation.navigate({ name: "Run", params: undefined })}
      />
    </Layout>
  );
}

export default HistoryScreen;

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Workout } from "hooks/useWorkouts";
import { displayDuration } from "utils/time";

interface Props {
  workout: Workout;
}

function WorkoutListItem({ workout }: Props) {
  return (
    <View key={workout.id} style={styles.item}>
      <View style={styles.itemBody}>
        <Text style={styles.itemTitle}>{workout.title}</Text>
        <Text style={styles.itemText}>{workout.notes}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text>{displayDuration(workout.duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    fontSize: 18,
    height: 44,
    marginBottom: 8,
  },
  itemBody: {
    flex: 6,
  },
  itemRight: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "600",
    fontSize: 21,
  },
  itemText: {
    color: "rgba(0,0,0,0.6)",
  },
});

export default WorkoutListItem;

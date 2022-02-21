import type { Workout } from "hooks/useWorkouts";

import React from "react";
import { FlatList } from "react-native";
import WorkoutListItem from "atoms/WorkoutListItem";

interface Props {
  workouts: Workout[];
}

function WorkoutList({ workouts }: Props) {
  return (
    <FlatList
      data={workouts}
      renderItem={props => <WorkoutListItem workout={props.item} {...props} />}
    />
  );
}

export default WorkoutList;

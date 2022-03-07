import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "atoms/Text";

interface Props {
  value: string;
  label: string;
}

export function Stat(props: Props) {
  return (
    <View style={styles.statContainer}>
      <Text>{props.value}</Text>
      <Text size="sm" variant="muted">
        {props.label}
      </Text>
    </View>
  );
}

export function MainStat(props: Props) {
  return (
    <View style={styles.mainStatContainer}>
      <Text size="xl">{props.value}</Text>
      <Text size="lg" variant="muted">
        {props.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statContainer: {},
  mainStatContainer: {
    alignItems: "center",
  },
});

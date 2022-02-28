import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "atoms/Text";

interface Props {
  value: string;
  label: string;
}

export function Stat(props: Props) {
  return (
    <View style={styles.container}>
      <Text>{props.value}</Text>
      <Text size="sm" variant="muted">{props.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
})
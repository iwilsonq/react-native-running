import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  label: String;
  onPress: () => void;
}

function Button({ label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Button;

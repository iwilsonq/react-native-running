import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "theme/theme";
import { Size } from "theme/typography";
import { Text, TextVariant } from "atoms/Text";

type Variant = "primary" | "secondary" | "danger" | "success";

interface Props {
  variant?: Variant;
  onPress: () => void;
  size?: Size;
}

function getTextVariant(buttonVariant: Variant): TextVariant {
  if (buttonVariant === "secondary") {
    return "black";
  }

  return "white";
}

export function Button(props: React.PropsWithChildren<Props>) {
  const variant = props.variant || "primary";
  const textSize = props.size || "md";

  const variantButtonStyle = variantButtonStyles[variant];

  const textVariant = getTextVariant(variant);

  return (
    <TouchableOpacity
      style={[styles.button, variantButtonStyle]}
      onPress={props.onPress}>
      <Text size={textSize} variant={textVariant}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
});

const variantButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.black,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
});

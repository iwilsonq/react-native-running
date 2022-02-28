import React from "react";
import { StyleSheet, Text as ReactNativeText, TextStyle } from "react-native";
import { theme } from "theme/theme";
import { Size } from "theme/typography";

export type TextVariant = "black" | "white" | "muted" | "success" | "danger";

interface Props extends React.PropsWithChildren<{}> {
  variant?: TextVariant;
  size?: Size;
}

export function Text(props: Props) {
  const variant = props.variant || "black";
  const size = props.size || "md";

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <ReactNativeText style={[variantStyle, sizeStyle]}>
      {props.children}
    </ReactNativeText>
  );
}

const sizeStyles = StyleSheet.create(theme.typography);

const variantStyles = StyleSheet.create({
  black: {
    color: theme.colors.black,
  },
  white: {
    color: theme.colors.white,
  },
  danger: {
    color: theme.colors.danger,
  },
  muted: {
    color: theme.colors.gray.middle,
  },
  success: {
    color: theme.colors.success,
  },
});

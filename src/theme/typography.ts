import { TextStyle } from "react-native";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

type TextStyleBySize = Record<Size, TextStyle>;

export const typography: TextStyleBySize = {
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 16,
  },
  md: {
    fontSize: 24,
  },
  lg: {
    fontSize: 32,
    fontWeight: "700",
  },
  xl: {
    fontSize: 80,
    fontWeight: "700",
  },
};

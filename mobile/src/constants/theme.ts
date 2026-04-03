import { Platform } from "react-native";

export const palette = {
  background: "#F4F7FB",
  surface: "#FFFFFF",
  surfaceAlt: "#FFF4D9",
  primary: "#126A5A",
  primarySoft: "#D7F1EA",
  accent: "#F59E0B",
  accentSoft: "#FFF2CC",
  textPrimary: "#102A43",
  textSecondary: "#52606D",
  textMuted: "#7B8794",
  border: "#D9E2EC",
  success: "#0F9D58",
  danger: "#DC2626",
  info: "#0EA5E9",
  shadow: "rgba(15, 23, 42, 0.08)"
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32
};

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999
};

export const typography = {
  heading: Platform.select({
    ios: "Avenir Next",
    android: "sans-serif-medium",
    default: "System"
  }),
  body: Platform.select({
    ios: "Avenir",
    android: "sans-serif",
    default: "System"
  })
};


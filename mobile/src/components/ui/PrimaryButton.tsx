import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle
} from "react-native";

import { palette, radii, spacing, typography } from "@/constants/theme";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "solid" | "ghost";
  style?: StyleProp<ViewStyle>;
};

export const PrimaryButton = ({
  label,
  onPress,
  variant = "solid",
  style
}: PrimaryButtonProps) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={({ pressed }) => [
      styles.base,
      variant === "solid" ? styles.solid : styles.ghost,
      pressed && styles.pressed,
      style
    ]}
  >
    <Text style={[styles.label, variant === "ghost" && styles.ghostLabel]}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center"
  },
  solid: {
    backgroundColor: palette.textPrimary
  },
  ghost: {
    backgroundColor: palette.primarySoft
  },
  label: {
    color: palette.surface,
    fontFamily: typography.heading,
    fontSize: 14,
    fontWeight: "700"
  },
  ghostLabel: {
    color: palette.primary
  },
  pressed: {
    opacity: 0.86
  }
});


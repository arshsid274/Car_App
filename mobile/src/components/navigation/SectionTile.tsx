import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { palette, radii, spacing, typography } from "@/constants/theme";
import type { SectionConfig } from "@/types/app";

type SectionTileProps = {
  section: SectionConfig;
  isActive: boolean;
  onPress: () => void;
};

export const SectionTile = ({
  section,
  isActive,
  onPress
}: SectionTileProps) => {
  const Icon = section.icon;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        isActive && styles.activeTile,
        pressed && styles.pressed
      ]}
    >
      <Icon
        color={isActive ? section.color : palette.textSecondary}
        size={18}
        strokeWidth={2.2}
      />
      <Text style={[styles.label, isActive && styles.activeLabel]}>
        {section.label}
      </Text>
      {isActive ? (
        <View style={[styles.underline, { backgroundColor: section.color }]} />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tile: {
    minHeight: 54,
    minWidth: 96,
    borderRadius: radii.lg,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "transparent"
  },
  activeTile: {
    borderColor: palette.border,
    backgroundColor: "#F8FBFF"
  },
  label: {
    fontFamily: typography.body,
    fontSize: 12,
    color: palette.textSecondary
  },
  activeLabel: {
    fontFamily: typography.heading,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  underline: {
    height: 3,
    width: 28,
    borderRadius: radii.pill
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }]
  }
});


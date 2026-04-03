import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { palette, radii, spacing, typography } from "@/constants/theme";

type FilterChipsProps = {
  filters: string[];
  activeFilter: string;
  onChange: (filter: string) => void;
};

export const FilterChips = ({
  filters,
  activeFilter,
  onChange
}: FilterChipsProps) => (
  <ScrollView
    horizontal
    contentContainerStyle={styles.content}
    showsHorizontalScrollIndicator={false}
  >
    {filters.map((filter) => {
      const isActive = filter === activeFilter;

      return (
        <Pressable
          accessibilityRole="button"
          key={filter}
          onPress={() => onChange(filter)}
          style={({ pressed }) => [
            styles.chip,
            isActive && styles.activeChip,
            pressed && styles.pressed
          ]}
        >
          <Text style={[styles.label, isActive && styles.activeLabel]}>
            {filter}
          </Text>
        </Pressable>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
    paddingVertical: spacing.sm
  },
  chip: {
    minHeight: 42,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface
  },
  activeChip: {
    borderColor: palette.primary,
    backgroundColor: palette.primarySoft
  },
  label: {
    fontFamily: typography.body,
    fontSize: 13,
    color: palette.textSecondary
  },
  activeLabel: {
    color: palette.primary,
    fontWeight: "700"
  },
  pressed: {
    opacity: 0.82
  }
});


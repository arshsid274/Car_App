import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ChevronDown, MapPin, Search } from "lucide-react-native";

import { palette, radii, spacing, typography } from "@/constants/theme";
import type { SectionConfig } from "@/types/app";

type AppHeaderProps = {
  section: SectionConfig;
  location: string;
  searchValue: string;
  onChangeSearch: (value: string) => void;
};

export const AppHeader = ({
  section,
  location,
  searchValue,
  onChangeSearch
}: AppHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.locationRow}>
      <View style={styles.locationCard}>
        <MapPin color={section.color} size={18} />
        <View style={styles.locationText}>
          <Text style={styles.locationLabel}>Delivering in</Text>
          <Text style={styles.locationValue}>{location}</Text>
        </View>
        <ChevronDown color={palette.textSecondary} size={16} />
      </View>
    </View>

    <View style={styles.searchBar}>
      <Search color={palette.textMuted} size={18} />
      <TextInput
        value={searchValue}
        onChangeText={onChangeSearch}
        placeholder={section.searchPlaceholder}
        placeholderTextColor={palette.textMuted}
        style={styles.input}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: palette.background
  },
  locationRow: {
    flexDirection: "row"
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg
  },
  locationText: {
    flex: 1
  },
  locationLabel: {
    fontFamily: typography.body,
    fontSize: 12,
    color: palette.textMuted
  },
  locationValue: {
    fontFamily: typography.heading,
    fontSize: 15,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  searchBar: {
    minHeight: 52,
    borderRadius: radii.lg,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  input: {
    flex: 1,
    color: palette.textPrimary,
    fontFamily: typography.body,
    fontSize: 15
  }
});


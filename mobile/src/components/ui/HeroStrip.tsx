import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { palette, radii, spacing, typography } from "@/constants/theme";
import type { SectionConfig } from "@/types/app";

type HeroStripProps = {
  section: SectionConfig;
};

export const HeroStrip = ({ section }: HeroStripProps) => {
  const Icon = section.icon;

  return (
    <LinearGradient
      colors={[section.color, "#102A43"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.headerRow}>
        <View style={styles.iconWrap}>
          <Icon color={palette.surface} size={24} strokeWidth={2.3} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.subtitle}>{section.subtitle}</Text>
        </View>
      </View>

      <View style={styles.statRow}>
        {section.heroStats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.highlight}>{section.highlight}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.lg
  },
  headerRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start"
  },
  iconWrap: {
    height: 52,
    width: 52,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  headerText: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    color: palette.surface,
    fontFamily: typography.heading,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700"
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20
  },
  statRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: "rgba(255,255,255,0.14)"
  },
  statValue: {
    color: palette.surface,
    fontFamily: typography.heading,
    fontSize: 16,
    fontWeight: "700"
  },
  statLabel: {
    color: "rgba(255,255,255,0.72)",
    fontFamily: typography.body,
    fontSize: 12
  },
  highlight: {
    color: palette.surface,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: 18
  }
});

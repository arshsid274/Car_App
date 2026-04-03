import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { palette, radii, spacing, typography } from "@/constants/theme";
import { PrimaryButton } from "./PrimaryButton";

type SectionCardProps = {
  title: string;
  subtitle: string;
  amount?: string;
  badge?: string;
  meta?: string[];
  ctaLabel?: string;
  onPress?: () => void;
  children?: ReactNode;
};

export const SectionCard = ({
  title,
  subtitle,
  amount,
  badge,
  meta,
  ctaLabel,
  onPress,
  children
}: SectionCardProps) => (
  <Pressable
    disabled={!onPress}
    onPress={onPress}
    style={({ pressed }) => [styles.card, pressed && onPress && styles.pressed]}
  >
    <View style={styles.headerRow}>
      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </View>

    {children}

    {meta?.length ? (
      <View style={styles.metaRow}>
        {meta.map((item) => (
          <Text key={item} style={styles.meta}>
            {item}
          </Text>
        ))}
      </View>
    ) : null}

    {(amount || ctaLabel) && (
      <View style={styles.footer}>
        <View>
          <Text style={styles.amountLabel}>Price</Text>
          <Text style={styles.amount}>{amount ?? "On request"}</Text>
        </View>
        {ctaLabel && onPress ? (
          <PrimaryButton label={ctaLabel} onPress={onPress} />
        ) : null}
      </View>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2
  },
  pressed: {
    opacity: 0.92
  },
  headerRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  headerText: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 17,
    lineHeight: 22,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  subtitle: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
    color: palette.textSecondary
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    backgroundColor: palette.accentSoft
  },
  badgeText: {
    fontFamily: typography.heading,
    color: "#9A6700",
    fontSize: 12,
    fontWeight: "700"
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  meta: {
    fontFamily: typography.body,
    fontSize: 13,
    color: palette.textMuted
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md
  },
  amountLabel: {
    fontFamily: typography.body,
    color: palette.textMuted,
    fontSize: 12
  },
  amount: {
    fontFamily: typography.heading,
    fontSize: 20,
    color: palette.textPrimary,
    fontWeight: "700"
  }
});


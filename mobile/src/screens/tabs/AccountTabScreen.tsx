import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CarFront, UserRound } from "lucide-react-native";

import { palette, radii, spacing, typography } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";

export const AccountTabScreen = () => {
  const user = useAppStore((state) => state.user);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <UserRound color={palette.surface} size={22} />
        <Text style={styles.heroTitle}>{user?.name ?? "Guest user"}</Text>
        <Text style={styles.heroText}>
          {user?.email ?? "Sign in to sync across devices"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Primary location</Text>
        <Text style={styles.cardText}>{user?.location ?? "Dubai"}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <CarFront color={palette.primary} size={18} />
          <Text style={styles.cardTitle}>Saved vehicles</Text>
        </View>
        <Text style={styles.cardText}>
          Connect this screen to `/users/vehicles` to manage saved plates, trims, and preferred fitment.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg
  },
  hero: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    backgroundColor: "#0F766E",
    gap: spacing.sm
  },
  heroTitle: {
    color: palette.surface,
    fontFamily: typography.heading,
    fontSize: 24,
    fontWeight: "700"
  },
  heroText: {
    color: "rgba(255,255,255,0.84)",
    fontFamily: typography.body,
    lineHeight: 20
  },
  card: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  cardTitle: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  cardText: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    lineHeight: 20
  }
});


import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CarFront, ShoppingBag } from "lucide-react-native";

import { sectionLookup } from "@/constants/sections";
import { palette, radii, spacing, typography } from "@/constants/theme";
import type { MainTabParamList } from "@/navigation/types";
import { useAppStore } from "@/store/appStore";

type MarketTabScreenProps = BottomTabScreenProps<MainTabParamList, "Market">;

export const MarketTabScreen = ({ navigation }: MarketTabScreenProps) => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const cartCount = useAppStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  const sections = ["spareParts", "buyCar", "sellCar", "merchant"] as const;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <ShoppingBag color={palette.surface} size={22} />
        <Text style={styles.heroTitle}>Market & Commerce</Text>
        <Text style={styles.heroText}>
          Browse cars, buy parts, sell inventory, and onboard merchants from one flow.
        </Text>
      </View>

      <View style={styles.summary}>
        <CarFront color={palette.primary} size={18} />
        <Text style={styles.summaryText}>
          {cartCount} items are currently waiting in your spare-parts cart.
        </Text>
      </View>

      <View style={styles.list}>
        {sections.map((key) => {
          const section = sectionLookup[key];
          const Icon = section.icon;

          return (
            <Pressable
              key={key}
              onPress={() => {
                setActiveSection(key);
                navigation.navigate("Home");
              }}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed
              ]}
            >
              <Icon color={section.color} size={20} />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{section.label}</Text>
                <Text style={styles.cardSubtitle}>{section.highlight}</Text>
              </View>
            </Pressable>
          );
        })}
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
    backgroundColor: "#1D4ED8",
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
  summary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg
  },
  summaryText: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    flex: 1,
    lineHeight: 20
  },
  list: {
    gap: spacing.md
  },
  card: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center"
  },
  cardText: {
    flex: 1,
    gap: 4
  },
  cardTitle: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  cardSubtitle: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    lineHeight: 20
  },
  pressed: {
    opacity: 0.9
  }
});

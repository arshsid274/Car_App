import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CalendarCheck2, Wrench } from "lucide-react-native";

import { sectionLookup } from "@/constants/sections";
import { palette, radii, spacing, typography } from "@/constants/theme";
import type { MainTabParamList } from "@/navigation/types";
import { useAppStore } from "@/store/appStore";

type ServicesTabScreenProps = BottomTabScreenProps<
  MainTabParamList,
  "Services"
>;

export const ServicesTabScreen = ({ navigation }: ServicesTabScreenProps) => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const bookings = useAppStore((state) => state.bookings);

  const serviceSections = ["carWash", "repairs", "parking", "rentals"] as const;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <CalendarCheck2 color={palette.surface} size={22} />
        <Text style={styles.heroTitle}>Service Hub</Text>
        <Text style={styles.heroText}>
          Jump back into your most-used bookings and service categories.
        </Text>
      </View>

      <View style={styles.list}>
        {serviceSections.map((key) => {
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

      <View style={styles.sectionHeader}>
        <Wrench color={palette.primary} size={18} />
        <Text style={styles.sectionTitle}>Upcoming bookings</Text>
      </View>

      <View style={styles.list}>
        {bookings.length ? (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.card}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{booking.title}</Text>
                <Text style={styles.cardSubtitle}>
                  {new Date(booking.scheduledFor).toLocaleString()}
                </Text>
              </View>
              <Text style={styles.status}>{booking.status}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.cardTitle}>No bookings yet</Text>
            <Text style={styles.cardSubtitle}>
              Reserve a wash, repair, rental, or parking slot from Home.
            </Text>
          </View>
        )}
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
    backgroundColor: palette.primary,
    gap: spacing.sm
  },
  heroTitle: {
    color: palette.surface,
    fontFamily: typography.heading,
    fontSize: 24,
    fontWeight: "700"
  },
  heroText: {
    color: "rgba(255,255,255,0.82)",
    fontFamily: typography.body,
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  sectionTitle: {
    fontFamily: typography.heading,
    fontSize: 18,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  emptyCard: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs
  },
  status: {
    fontFamily: typography.heading,
    color: palette.primary,
    textTransform: "capitalize"
  },
  pressed: {
    opacity: 0.9
  }
});


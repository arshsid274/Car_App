import React, { memo, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { carWashServices } from "@/constants/mockData";
import { sectionLookup } from "@/constants/sections";
import { palette, radii, spacing, typography } from "@/constants/theme";
import { servicesApi } from "@/services/api";
import { useAppStore } from "@/store/appStore";
import { formatAED } from "@/utils/currency";
import { FilterChips } from "../ui/FilterChips";
import { HeroStrip } from "../ui/HeroStrip";
import { SectionCard } from "../ui/SectionCard";

type CarWashSectionProps = {
  searchValue: string;
};

export const CarWashSection = memo(({ searchValue }: CarWashSectionProps) => {
  const section = sectionLookup.carWash;
  const [activeFilter, setActiveFilter] = useState(section.filters[0]);
  const addBooking = useAppStore((state) => state.addBooking);

  const filteredServices = useMemo(() => {
    return carWashServices.filter((service) => {
      const matchesFilter =
        activeFilter === "Popular"
          ? true
          : service.category.toLowerCase() === activeFilter.toLowerCase();
      const query = searchValue.trim().toLowerCase();
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.subtitle.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchValue]);

  const handleBook = async (serviceId: string) => {
    const selectedService = carWashServices.find((service) => service.id === serviceId);

    if (!selectedService) {
      return;
    }

    const scheduledFor = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

    try {
      await servicesApi.createBooking({
        type: "car-wash",
        serviceName: selectedService.title,
        scheduledFor,
        price: selectedService.price
      });
    } catch {
      // Keep the flow responsive in demo mode when the backend is offline.
    }

    addBooking({
      id: `booking-${selectedService.id}-${Date.now()}`,
      title: selectedService.title,
      section: "carWash",
      status: "confirmed",
      scheduledFor,
      amount: selectedService.price
    });

    Alert.alert(
      "Booking saved",
      `${selectedService.title} has been added to your bookings.`
    );
  };

  return (
    <View style={styles.container}>
      <HeroStrip section={section} />
      <FilterChips
        filters={section.filters}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      <View style={styles.highlightCard}>
        <Text style={styles.highlightTitle}>Best time to book</Text>
        <Text style={styles.highlightText}>
          Early evening slots between 5:00 PM and 7:00 PM have the fastest crew response today.
        </Text>
      </View>

      <View style={styles.list}>
        {filteredServices.map((service) => (
          <SectionCard
            key={service.id}
            title={service.title}
            subtitle={service.subtitle}
            badge={service.badge}
            amount={formatAED(service.price)}
            meta={[
              `${service.duration} min`,
              `${service.rating?.toFixed(1)} rating`,
              service.category
            ]}
            ctaLabel="Book now"
            onPress={() => handleBook(service.id)}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  highlightCard: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    backgroundColor: "#E0F2FE",
    gap: spacing.xs
  },
  highlightTitle: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  highlightText: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    lineHeight: 20
  },
  list: {
    gap: spacing.md
  }
});


import React, { memo, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { buyCarListings } from "@/constants/mockData";
import { sectionLookup } from "@/constants/sections";
import { palette, radii, spacing, typography } from "@/constants/theme";
import { estimateMonthlyFinance, formatAED } from "@/utils/currency";
import { FilterChips } from "../ui/FilterChips";
import { HeroStrip } from "../ui/HeroStrip";
import { SectionCard } from "../ui/SectionCard";

type BuyCarSectionProps = {
  searchValue: string;
};

export const BuyCarSection = memo(({ searchValue }: BuyCarSectionProps) => {
  const section = sectionLookup.buyCar;
  const [activeFilter, setActiveFilter] = useState(section.filters[0]);

  const filteredCars = useMemo(() => {
    return buyCarListings.filter((car) => {
      const matchesFilter = activeFilter ? car.category === activeFilter : true;
      const query = searchValue.trim().toLowerCase();
      const matchesSearch =
        !query ||
        car.title.toLowerCase().includes(query) ||
        car.location.toLowerCase().includes(query) ||
        car.fuel.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchValue]);

  const showEstimate = (carId: string) => {
    const car = buyCarListings.find((item) => item.id === carId);

    if (!car) {
      return;
    }

    Alert.alert(
      "Estimated finance",
      `${car.title} can start from ${formatAED(estimateMonthlyFinance(car.price))} per month.`
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

      <View style={styles.financeBanner}>
        <Text style={styles.financeTitle}>Finance-ready inventory</Text>
        <Text style={styles.financeText}>
          All cars below include estimated installments and verified condition notes.
        </Text>
      </View>

      <View style={styles.list}>
        {filteredCars.map((car) => (
          <SectionCard
            key={car.id}
            title={car.title}
            subtitle={`${car.year} • ${car.location}`}
            amount={formatAED(car.price)}
            meta={[
              `${car.mileage.toLocaleString()} km`,
              car.fuel,
              car.transmission
            ]}
            badge={car.category}
            ctaLabel="Finance estimate"
            onPress={() => showEstimate(car.id)}
          >
            <View style={styles.financeChip}>
              <Text style={styles.financeChipText}>
                From {formatAED(estimateMonthlyFinance(car.price))}/month
              </Text>
            </View>
          </SectionCard>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  financeBanner: {
    borderRadius: radii.lg,
    backgroundColor: "#DBEAFE",
    padding: spacing.lg,
    gap: spacing.xs
  },
  financeTitle: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  financeText: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    lineHeight: 20
  },
  list: {
    gap: spacing.md
  },
  financeChip: {
    alignSelf: "flex-start",
    backgroundColor: palette.primarySoft,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8
  },
  financeChipText: {
    fontFamily: typography.heading,
    color: palette.primary,
    fontSize: 13,
    fontWeight: "700"
  }
});


import React, { memo, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { sparePartProducts } from "@/constants/mockData";
import { sectionLookup } from "@/constants/sections";
import { palette, radii, spacing, typography } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";
import { formatAED } from "@/utils/currency";
import { FilterChips } from "../ui/FilterChips";
import { HeroStrip } from "../ui/HeroStrip";
import { SectionCard } from "../ui/SectionCard";

type SparePartsSectionProps = {
  searchValue: string;
};

export const SparePartsSection = memo(
  ({ searchValue }: SparePartsSectionProps) => {
    const section = sectionLookup.spareParts;
    const [activeFilter, setActiveFilter] = useState(section.filters[0]);
    const addToCart = useAppStore((state) => state.addToCart);

    const filteredProducts = useMemo(() => {
      return sparePartProducts.filter((product) => {
        const matchesFilter =
          activeFilter === "Engine"
            ? product.category === "Engine"
            : activeFilter === "Brakes"
              ? product.category === "Brakes"
              : activeFilter === "Battery"
                ? product.category === "Battery"
                : activeFilter === "Accessories"
                  ? product.category === "Accessories"
                  : true;

        const query = searchValue.trim().toLowerCase();
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.fitment.toLowerCase().includes(query);

        return matchesFilter && matchesSearch;
      });
    }, [activeFilter, searchValue]);

    const handleAddToCart = (productId: string) => {
      const product = sparePartProducts.find((item) => item.id === productId);

      if (!product) {
        return;
      }

      addToCart({
        id: product.id,
        title: product.name,
        subtitle: product.fitment,
        price: product.price,
        category: product.category
      });

      Alert.alert("Added to cart", `${product.name} is now in your cart.`);
    };

    return (
      <View style={styles.container}>
        <HeroStrip section={section} />
        <FilterChips
          filters={section.filters}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />

        <View style={styles.flashSale}>
          <Text style={styles.flashSaleTitle}>Today’s fitment spotlight</Text>
          <Text style={styles.flashSaleText}>
            Save on high-turnover OEM brake and battery SKUs with doorstep delivery.
          </Text>
        </View>

        <View style={styles.list}>
          {filteredProducts.map((product) => (
            <SectionCard
              key={product.id}
              title={product.name}
              subtitle={`${product.brand} • ${product.fitment}`}
              amount={formatAED(product.price)}
              meta={[`${product.stock} in stock`, product.category]}
              ctaLabel="Add to cart"
              onPress={() => handleAddToCart(product.id)}
            >
              <View
                style={[
                  styles.productAccent,
                  { backgroundColor: product.accentColor }
                ]}
              >
                <Text style={styles.productAccentText}>
                  Fitment checked for UAE spec vehicles
                </Text>
              </View>
            </SectionCard>
          ))}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  flashSale: {
    borderRadius: radii.lg,
    backgroundColor: palette.surfaceAlt,
    padding: spacing.lg,
    gap: spacing.xs
  },
  flashSaleTitle: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  flashSaleText: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    lineHeight: 20
  },
  list: {
    gap: spacing.md
  },
  productAccent: {
    borderRadius: radii.md,
    padding: spacing.md
  },
  productAccentText: {
    fontFamily: typography.body,
    color: palette.textPrimary,
    fontSize: 13
  }
});


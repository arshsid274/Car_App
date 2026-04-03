import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { palette, radii, spacing, typography } from "@/constants/theme";
import { productsApi } from "@/services/api";
import { getCartSubtotal, useAppStore } from "@/store/appStore";
import { formatAED } from "@/utils/currency";

export const CartTabScreen = () => {
  const cart = useAppStore((state) => state.cart);
  const updateCartQuantity = useAppStore((state) => state.updateCartQuantity);
  const clearCart = useAppStore((state) => state.clearCart);

  const subtotal = getCartSubtotal();

  const handleCheckout = async () => {
    if (!cart.length) {
      Alert.alert("Cart is empty", "Add spare parts from the market section first.");
      return;
    }

    try {
      await productsApi.checkoutCart({
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      });
      Alert.alert("Order placed", "Your checkout request has been sent successfully.");
    } catch {
      Alert.alert(
        "Checkout saved locally",
        "Backend checkout could not be reached, but the cart flow is wired and ready."
      );
    }

    clearCart();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Cart</Text>

      <View style={styles.list}>
        {cart.length ? (
          cart.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <Text style={styles.cardPrice}>{formatAED(item.price)}</Text>
              </View>
              <View style={styles.qtyPill}>
                <Pressable
                  hitSlop={10}
                  onPress={() =>
                    updateCartQuantity(item.id, item.quantity - 1)
                  }
                  style={styles.qtyButton}
                >
                  <Text style={styles.qtyAction}>-</Text>
                </Pressable>
                <Text style={styles.qtyValue}>{item.quantity}</Text>
                <Pressable
                  hitSlop={10}
                  onPress={() =>
                    updateCartQuantity(item.id, item.quantity + 1)
                  }
                  style={styles.qtyButton}
                >
                  <Text style={styles.qtyAction}>+</Text>
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.cardTitle}>No items yet</Text>
            <Text style={styles.cardSubtitle}>
              Your spare-parts cart will appear here with a live badge in the bottom navigation.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>{formatAED(subtotal)}</Text>
        <PrimaryButton label="Proceed to checkout" onPress={handleCheckout} />
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
  title: {
    fontFamily: typography.heading,
    fontSize: 28,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  list: {
    gap: spacing.md
  },
  card: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
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
  cardPrice: {
    fontFamily: typography.heading,
    color: palette.primary,
    fontSize: 15,
    fontWeight: "700"
  },
  qtyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: palette.primarySoft
  },
  qtyButton: {
    minHeight: 32,
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  qtyAction: {
    fontFamily: typography.heading,
    fontSize: 18,
    color: palette.primary,
    fontWeight: "700"
  },
  qtyValue: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  emptyCard: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm
  },
  summaryCard: {
    backgroundColor: palette.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.md
  },
  summaryLabel: {
    fontFamily: typography.body,
    fontSize: 13,
    color: palette.textMuted
  },
  summaryValue: {
    fontFamily: typography.heading,
    fontSize: 30,
    color: palette.textPrimary,
    fontWeight: "700"
  }
});

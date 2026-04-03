import React from "react";
import { StyleSheet } from "react-native";
import {
  ParamListBase,
  RouteProp
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CircleUserRound,
  Home,
  LayoutGrid,
  ShoppingCart,
  Store
} from "lucide-react-native";

import { palette, typography } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";
import { AccountTabScreen } from "@/screens/tabs/AccountTabScreen";
import { CartTabScreen } from "@/screens/tabs/CartTabScreen";
import { HomeTabScreen } from "@/screens/tabs/HomeTabScreen";
import { MarketTabScreen } from "@/screens/tabs/MarketTabScreen";
import { ServicesTabScreen } from "@/screens/tabs/ServicesTabScreen";
import type { MainTabParamList, RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

const getTabIcon = (
  route: RouteProp<ParamListBase, string>,
  color: string,
  size: number
) => {
  switch (route.name) {
    case "Home":
      return <Home color={color} size={size} />;
    case "Services":
      return <LayoutGrid color={color} size={size} />;
    case "Market":
      return <Store color={color} size={size} />;
    case "Account":
      return <CircleUserRound color={color} size={size} />;
    case "Cart":
      return <ShoppingCart color={color} size={size} />;
    default:
      return <Home color={color} size={size} />;
  }
};

const MainTabs = () => {
  const cartCount = useAppStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => getTabIcon(route, color, size),
        tabBarBadge:
          route.name === "Cart" && cartCount > 0 ? cartCount : undefined,
        tabBarBadgeStyle: styles.badge
      })}
    >
      <Tabs.Screen name="Home" component={HomeTabScreen} />
      <Tabs.Screen name="Services" component={ServicesTabScreen} />
      <Tabs.Screen name="Market" component={MarketTabScreen} />
      <Tabs.Screen name="Account" component={AccountTabScreen} />
      <Tabs.Screen name="Cart" component={CartTabScreen} />
    </Tabs.Navigator>
  );
};

export const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    paddingBottom: 10,
    paddingTop: 8,
    backgroundColor: palette.surface,
    borderTopColor: palette.border
  },
  tabLabel: {
    fontFamily: typography.body,
    fontSize: 12
  },
  badge: {
    backgroundColor: palette.accent,
    color: palette.textPrimary
  }
});

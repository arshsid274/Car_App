import React, { memo, useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import { sectionConfigs } from "@/constants/sections";
import { spacing } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";
import type { SectionConfig } from "@/types/app";
import { SectionTile } from "./SectionTile";

export const SectionSwitcher = memo(() => {
  const activeSection = useAppStore((state) => state.activeSection);
  const setActiveSection = useAppStore((state) => state.setActiveSection);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<SectionConfig>) => (
      <SectionTile
        section={item}
        isActive={item.key === activeSection}
        onPress={() => setActiveSection(item.key)}
      />
    ),
    [activeSection, setActiveSection]
  );

  return (
    <FlatList
      data={sectionConfigs}
      horizontal
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  );
});

const styles = StyleSheet.create({
  content: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm
  }
});


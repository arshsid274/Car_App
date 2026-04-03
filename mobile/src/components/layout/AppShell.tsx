import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { sectionLookup } from "@/constants/sections";
import { palette, spacing } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { AppHeader } from "./AppHeader";
import { SectionSwitcher } from "../navigation/SectionSwitcher";

export const AppShell = () => {
  const activeSection = useAppStore((state) => state.activeSection);
  const userLocation = useAppStore((state) => state.user?.location ?? "Dubai");
  const section = useMemo(
    () => sectionLookup[activeSection],
    [activeSection]
  );
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue("");
  }, [activeSection]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <AppHeader
          section={section}
          location={userLocation}
          searchValue={searchValue}
          onChangeSearch={setSearchValue}
        />
        <SectionSwitcher />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <SectionRenderer searchValue={searchValue} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background
  },
  container: {
    flex: 1,
    backgroundColor: palette.background
  },
  scroll: {
    flex: 1
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.sm
  }
});

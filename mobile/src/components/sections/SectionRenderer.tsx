import React, { useMemo } from "react";
import { View } from "react-native";

import { useAppStore } from "@/store/appStore";
import { BuyCarSection } from "./BuyCarSection";
import { CarWashSection } from "./CarWashSection";
import {
  CarGoSection,
  MerchantSection,
  ParkingSection,
  RentalsSection,
  RepairsSection,
  SellCarSection
} from "./OtherSections";
import { SparePartsSection } from "./SparePartsSection";

type SectionRendererProps = {
  searchValue: string;
};

export const SectionRenderer = ({ searchValue }: SectionRendererProps) => {
  const activeSection = useAppStore((state) => state.activeSection);

  const content = useMemo(() => {
    switch (activeSection) {
      case "cargo":
        return <CarGoSection />;
      case "carWash":
        return <CarWashSection searchValue={searchValue} />;
      case "spareParts":
        return <SparePartsSection searchValue={searchValue} />;
      case "repairs":
        return <RepairsSection searchValue={searchValue} />;
      case "parking":
        return <ParkingSection searchValue={searchValue} />;
      case "sellCar":
        return <SellCarSection />;
      case "buyCar":
        return <BuyCarSection searchValue={searchValue} />;
      case "rentals":
        return <RentalsSection searchValue={searchValue} />;
      case "merchant":
        return <MerchantSection />;
      default:
        return <CarGoSection />;
    }
  }, [activeSection, searchValue]);

  return (
    <View key={activeSection} style={{ gap: 16 }}>
      {content}
    </View>
  );
};

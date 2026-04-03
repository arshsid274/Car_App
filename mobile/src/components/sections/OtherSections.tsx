import React, { memo, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { CalendarClock, MapPinned, Store, Wrench } from "lucide-react-native";

import {
  cargoHighlights,
  parkingSpots,
  quickActionSections,
  rentalOffers,
  repairGarages
} from "@/constants/mockData";
import { sectionLookup } from "@/constants/sections";
import { palette, radii, spacing, typography } from "@/constants/theme";
import {
  carsApi,
  merchantApi,
  parkingApi,
  rentalsApi,
  servicesApi
} from "@/services/api";
import { useAppStore } from "@/store/appStore";
import { formatAED } from "@/utils/currency";
import type { MerchantDraft } from "@/types/app";
import { FilterChips } from "../ui/FilterChips";
import { HeroStrip } from "../ui/HeroStrip";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SectionCard } from "../ui/SectionCard";
import { TextField } from "../ui/TextField";

type SearchProps = {
  searchValue: string;
};

export const CarGoSection = memo(() => {
  const section = sectionLookup.cargo;
  const setActiveSection = useAppStore((state) => state.setActiveSection);

  return (
    <View style={styles.stack}>
      <HeroStrip section={section} />

      <View style={styles.grid}>
        {cargoHighlights.map((highlight) => (
          <Pressable
            key={highlight.id}
            onPress={() => setActiveSection(highlight.targetSection)}
            style={({ pressed }) => [
              styles.highlightCard,
              pressed && styles.pressed
            ]}
          >
            <Text style={styles.highlightCardTitle}>{highlight.title}</Text>
            <Text style={styles.highlightCardText}>{highlight.subtitle}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.quickActions}>
        {quickActionSections.map((item) => {
          const target = sectionLookup[item];
          const Icon = target.icon;

          return (
            <Pressable
              key={item}
              onPress={() => setActiveSection(item)}
              style={({ pressed }) => [
                styles.quickActionCard,
                pressed && styles.pressed
              ]}
            >
              <Icon color={target.color} size={20} />
              <Text style={styles.quickActionTitle}>{target.label}</Text>
              <Text style={styles.quickActionSubtitle}>{target.highlight}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});

export const RepairsSection = memo(({ searchValue }: SearchProps) => {
  const section = sectionLookup.repairs;
  const [activeFilter, setActiveFilter] = useState(section.filters[0]);
  const addBooking = useAppStore((state) => state.addBooking);

  const garages = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return repairGarages.filter((garage) => {
      const matchesSearch =
        !query ||
        garage.name.toLowerCase().includes(query) ||
        garage.specialty.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "Mechanical"
          ? garage.specialty.toLowerCase().includes("mechanical")
          : activeFilter === "Body"
            ? garage.specialty.toLowerCase().includes("body")
            : activeFilter === "AC"
              ? garage.specialty.toLowerCase().includes("ac")
              : activeFilter === "Electrical"
                ? garage.specialty.toLowerCase().includes("coding")
                : true;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, searchValue]);

  const handleBook = async (garageId: string) => {
    const garage = repairGarages.find((item) => item.id === garageId);

    if (!garage) {
      return;
    }

    const scheduledFor = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    try {
      await servicesApi.createBooking({
        type: "repair",
        serviceName: garage.name,
        scheduledFor,
        price: garage.priceFrom
      });
    } catch {
      // Demo fallback.
    }

    addBooking({
      id: `repair-${garage.id}-${Date.now()}`,
      title: garage.name,
      section: "repairs",
      status: "pending",
      scheduledFor,
      amount: garage.priceFrom
    });

    Alert.alert("Repair request sent", `${garage.name} has your booking request.`);
  };

  return (
    <View style={styles.stack}>
      <HeroStrip section={section} />
      <FilterChips
        filters={section.filters}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      <View style={styles.stack}>
        {garages.map((garage) => (
          <SectionCard
            key={garage.id}
            title={garage.name}
            subtitle={garage.specialty}
            amount={`From ${formatAED(garage.priceFrom)}`}
            meta={[`${garage.rating.toFixed(1)} rating`, garage.eta]}
            ctaLabel="Book slot"
            onPress={() => handleBook(garage.id)}
          >
            <View style={styles.inlineTag}>
              <Wrench color={palette.primary} size={16} />
              <Text style={styles.inlineTagText}>Pickup and diagnosis available</Text>
            </View>
          </SectionCard>
        ))}
      </View>
    </View>
  );
});

export const ParkingSection = memo(({ searchValue }: SearchProps) => {
  const section = sectionLookup.parking;
  const [activeFilter, setActiveFilter] = useState(section.filters[0]);
  const addBooking = useAppStore((state) => state.addBooking);

  const spots = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return parkingSpots.filter((spot) => {
      const matchesSearch =
        !query ||
        spot.location.toLowerCase().includes(query) ||
        spot.zone.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "Nearby"
          ? true
          : activeFilter === "Covered"
            ? spot.zone.toLowerCase().includes("covered")
            : activeFilter === "EV"
              ? spot.zone.toLowerCase().includes("ev")
              : activeFilter === "Monthly"
                ? spot.location.toLowerCase().includes("central")
                : true;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, searchValue]);

  const reserveSpot = async (parkingSlotId: string) => {
    const spot = parkingSpots.find((item) => item.id === parkingSlotId);

    if (!spot) {
      return;
    }

    const startsAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    try {
      await parkingApi.reserveSlot({ parkingSlotId, startsAt });
    } catch {
      // Demo fallback.
    }

    addBooking({
      id: `parking-${parkingSlotId}-${Date.now()}`,
      title: `${spot.location} parking`,
      section: "parking",
      status: "confirmed",
      scheduledFor: startsAt,
      amount: spot.hourlyRate
    });

    Alert.alert("Spot reserved", `${spot.location} has been saved for your trip.`);
  };

  return (
    <View style={styles.stack}>
      <HeroStrip section={section} />
      <FilterChips
        filters={section.filters}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      <View style={styles.mapMock}>
        <MapPinned color={palette.surface} size={30} />
        <Text style={styles.mapTitle}>Live map preview</Text>
        <Text style={styles.mapText}>
          Swap this panel with Google Maps or Mapbox once keys are configured.
        </Text>
      </View>

      <View style={styles.stack}>
        {spots.map((spot) => (
          <SectionCard
            key={spot.id}
            title={spot.location}
            subtitle={spot.zone}
            amount={`${formatAED(spot.hourlyRate)}/hr`}
            meta={[spot.availability, spot.distance]}
            ctaLabel="Reserve"
            onPress={() => reserveSpot(spot.id)}
          />
        ))}
      </View>
    </View>
  );
});

export const SellCarSection = memo(() => {
  const section = sectionLookup.sellCar;
  const [plateNumber, setPlateNumber] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [valuation, setValuation] = useState<number | null>(null);

  const getValuation = async () => {
    const yearValue = Number(year);
    const mileageValue = Number(mileage || 0);

    if (!plateNumber || !model || !yearValue) {
      Alert.alert("Missing details", "Please complete plate, model, and year.");
      return;
    }

    try {
      const response = await carsApi.getValuation({
        year: yearValue,
        mileage: mileageValue
      });

      setValuation(response.estimatedValue ?? null);
    } catch {
      const base = Math.max(28000, 130000 - (2026 - yearValue) * 9500 - mileageValue * 0.18);
      setValuation(Math.round(base));
    }
  };

  return (
    <View style={styles.stack}>
      <HeroStrip section={section} />
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Instant valuation</Text>
        <TextField
          label="Plate number"
          placeholder="Dubai A 12345"
          value={plateNumber}
          onChangeText={setPlateNumber}
        />
        <TextField
          label="Vehicle model"
          placeholder="Toyota Prado"
          value={model}
          onChangeText={setModel}
        />
        <TextField
          label="Year"
          placeholder="2021"
          keyboardType="number-pad"
          value={year}
          onChangeText={setYear}
        />
        <TextField
          label="Mileage"
          placeholder="45000"
          keyboardType="number-pad"
          value={mileage}
          onChangeText={setMileage}
        />
        <PrimaryButton label="Get valuation" onPress={getValuation} />

        {valuation ? (
          <View style={styles.valuationBox}>
            <Text style={styles.valuationLabel}>Estimated resale value</Text>
            <Text style={styles.valuationValue}>{formatAED(valuation)}</Text>
            <Text style={styles.valuationHint}>
              Inspection-ready listings typically convert faster when priced within 3% of this range.
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
});

export const RentalsSection = memo(({ searchValue }: SearchProps) => {
  const section = sectionLookup.rentals;
  const [activeFilter, setActiveFilter] = useState(section.filters[0]);
  const [startDate, setStartDate] = useState("2026-04-10");
  const [endDate, setEndDate] = useState("2026-04-13");
  const addBooking = useAppStore((state) => state.addBooking);

  const offers = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return rentalOffers.filter((offer) => {
      const matchesSearch =
        !query ||
        offer.title.toLowerCase().includes(query) ||
        offer.type.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "Daily"
          ? offer.dailyRate <= 200
          : activeFilter === "Weekly"
            ? offer.dailyRate <= 220
            : activeFilter === "Monthly"
              ? offer.dailyRate <= 190
              : activeFilter === "Premium"
                ? offer.type === "Premium"
                : true;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, searchValue]);

  const bookRental = async (rentalId: string) => {
    const offer = rentalOffers.find((item) => item.id === rentalId);

    if (!offer) {
      return;
    }

    try {
      await rentalsApi.createRentalBooking({
        rentalId,
        startDate,
        endDate
      });
    } catch {
      // Demo fallback.
    }

    addBooking({
      id: `rental-${rentalId}-${Date.now()}`,
      title: offer.title,
      section: "rentals",
      status: "confirmed",
      scheduledFor: startDate,
      amount: offer.dailyRate
    });

    Alert.alert("Rental requested", `${offer.title} is reserved from ${startDate}.`);
  };

  return (
    <View style={styles.stack}>
      <HeroStrip section={section} />
      <FilterChips
        filters={section.filters}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Rental search</Text>
        <TextField
          label="Pickup date"
          value={startDate}
          onChangeText={setStartDate}
          placeholder="YYYY-MM-DD"
        />
        <TextField
          label="Return date"
          value={endDate}
          onChangeText={setEndDate}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <View style={styles.stack}>
        {offers.map((offer) => (
          <SectionCard
            key={offer.id}
            title={offer.title}
            subtitle={`${offer.type} - ${offer.seats} seats`}
            amount={`${formatAED(offer.dailyRate)}/day`}
            meta={[offer.transmission, `Deposit ${formatAED(offer.deposit)}`]}
            ctaLabel="Reserve"
            onPress={() => bookRental(offer.id)}
          >
            <View style={styles.inlineTag}>
              <CalendarClock color={palette.primary} size={16} />
              <Text style={styles.inlineTagText}>Instant confirmation available</Text>
            </View>
          </SectionCard>
        ))}
      </View>
    </View>
  );
});

export const MerchantSection = memo(() => {
  const section = sectionLookup.merchant;
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<MerchantDraft>({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    emirate: "Dubai",
    category: "Garage"
  });

  const totalSteps = 3;

  const updateDraft = <K extends keyof MerchantDraft>(
    key: K,
    value: MerchantDraft[K]
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleNext = async () => {
    if (step < totalSteps - 1) {
      setStep((current) => current + 1);
      return;
    }

    try {
      await merchantApi.registerBusiness(draft);
      Alert.alert("Application submitted", "Your merchant onboarding request is now under review.");
    } catch {
      Alert.alert(
        "Draft saved locally",
        "Backend submission was skipped, but the onboarding flow is ready."
      );
    }
  };

  return (
    <View style={styles.stack}>
      <HeroStrip section={section} />

      <View style={styles.formCard}>
        <View style={styles.progressRow}>
          <Store color={palette.primary} size={18} />
          <Text style={styles.formTitle}>
            Merchant onboarding - Step {step + 1} of {totalSteps}
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${((step + 1) / totalSteps) * 100}%` }
            ]}
          />
        </View>

        {step === 0 ? (
          <>
            <TextField
              label="Business name"
              placeholder="Marina Auto Studio"
              value={draft.businessName}
              onChangeText={(value) => updateDraft("businessName", value)}
            />
            <TextField
              label="Owner name"
              placeholder="Ahmed Khalid"
              value={draft.ownerName}
              onChangeText={(value) => updateDraft("ownerName", value)}
            />
          </>
        ) : null}

        {step === 1 ? (
          <>
            <TextField
              label="Email"
              placeholder="ops@marinaauto.ae"
              keyboardType="email-address"
              value={draft.email}
              onChangeText={(value) => updateDraft("email", value)}
            />
            <TextField
              label="Phone"
              placeholder="+971 50 123 4567"
              keyboardType="phone-pad"
              value={draft.phone}
              onChangeText={(value) => updateDraft("phone", value)}
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <TextField
              label="Emirate"
              placeholder="Dubai"
              value={draft.emirate}
              onChangeText={(value) => updateDraft("emirate", value)}
            />
            <TextField
              label="Business category"
              placeholder="Garage / Car Wash / Parts"
              value={draft.category}
              onChangeText={(value) => updateDraft("category", value)}
            />
          </>
        ) : null}

        <View style={styles.buttonRow}>
          {step > 0 ? (
            <PrimaryButton
              label="Back"
              variant="ghost"
              style={styles.flexButton}
              onPress={() => setStep((current) => Math.max(0, current - 1))}
            />
          ) : null}
          <PrimaryButton
            label={step === totalSteps - 1 ? "Submit" : "Continue"}
            style={styles.flexButton}
            onPress={handleNext}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md
  },
  grid: {
    gap: spacing.md
  },
  highlightCard: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs
  },
  highlightCardTitle: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  highlightCardText: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    lineHeight: 20
  },
  quickActions: {
    gap: spacing.md
  },
  quickActionCard: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm
  },
  quickActionTitle: {
    fontFamily: typography.heading,
    fontSize: 16,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  quickActionSubtitle: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    lineHeight: 20
  },
  inlineTag: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: palette.primarySoft,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8
  },
  inlineTagText: {
    fontFamily: typography.heading,
    color: palette.primary,
    fontSize: 13,
    fontWeight: "700"
  },
  mapMock: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#1E3A8A"
  },
  mapTitle: {
    fontFamily: typography.heading,
    color: palette.surface,
    fontSize: 18,
    fontWeight: "700"
  },
  mapText: {
    fontFamily: typography.body,
    color: "rgba(255,255,255,0.82)",
    textAlign: "center",
    lineHeight: 20
  },
  formCard: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md
  },
  formTitle: {
    fontFamily: typography.heading,
    fontSize: 18,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  valuationBox: {
    backgroundColor: palette.primarySoft,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs
  },
  valuationLabel: {
    fontFamily: typography.body,
    fontSize: 12,
    color: palette.primary
  },
  valuationValue: {
    fontFamily: typography.heading,
    fontSize: 24,
    color: palette.textPrimary,
    fontWeight: "700"
  },
  valuationHint: {
    fontFamily: typography.body,
    color: palette.textSecondary,
    lineHeight: 20
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  progressTrack: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: "#E9D5FF",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#9333EA"
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.md
  },
  flexButton: {
    flex: 1
  },
  pressed: {
    opacity: 0.9
  }
});

import {
  BadgeDollarSign,
  CarFront,
  Cog,
  ParkingSquare,
  ShoppingBag,
  Sparkles,
  Store,
  Wrench,
  KeyRound
} from "lucide-react-native";

import type { AppSectionKey, SectionConfig } from "@/types/app";

export const sectionConfigs: SectionConfig[] = [
  {
    key: "cargo",
    label: "CarGo",
    title: "Your all-in-one car companion",
    subtitle: "Book services, buy parts, finance cars, and manage every drive from one place.",
    color: "#126A5A",
    searchPlaceholder: "Search services, garages, parts, or listings",
    filters: ["Trending", "Fast pickup", "Premium", "Family"],
    highlight: "Same-day convenience across Dubai, Abu Dhabi, and Sharjah",
    heroStats: [
      { label: "Live offers", value: "18" },
      { label: "Avg. dispatch", value: "22 min" }
    ],
    icon: CarFront
  },
  {
    key: "carWash",
    label: "Car Wash",
    title: "Mobile washes on your schedule",
    subtitle: "Eco wash, deep clean, and premium detailing with live slot availability.",
    color: "#0EA5E9",
    searchPlaceholder: "Search wash packages or detailing",
    filters: ["Popular", "Exterior", "Interior", "Premium"],
    highlight: "Starting from AED 35 with 60-minute arrival windows",
    heroStats: [
      { label: "Live slots", value: "47" },
      { label: "Best price", value: "AED 35" }
    ],
    icon: Sparkles
  },
  {
    key: "spareParts",
    label: "Spare Parts",
    title: "OEM and aftermarket parts",
    subtitle: "Shop filters, brakes, batteries, and accessories matched to your vehicle.",
    color: "#F59E0B",
    searchPlaceholder: "Search brake pads, batteries, oil filters",
    filters: ["Engine", "Brakes", "Battery", "Accessories"],
    highlight: "Add to cart and checkout with same-day delivery in key emirates",
    heroStats: [
      { label: "In stock", value: "4.2k" },
      { label: "Fast delivery", value: "2 hrs" }
    ],
    icon: Cog
  },
  {
    key: "repairs",
    label: "Repairs",
    title: "Trusted garages with flexible booking",
    subtitle: "Compare specialists, ratings, and diagnostic packages before you book.",
    color: "#EF4444",
    searchPlaceholder: "Search engine repair, AC, body shop",
    filters: ["Mechanical", "Body", "AC", "Electrical"],
    highlight: "Verified garages with upfront diagnostics and pickup options",
    heroStats: [
      { label: "Top rated", value: "4.9" },
      { label: "Garages", value: "96" }
    ],
    icon: Wrench
  },
  {
    key: "parking",
    label: "Parking",
    title: "Reserve parking before you arrive",
    subtitle: "See zone availability, rates, and reserve premium or shaded spots instantly.",
    color: "#6366F1",
    searchPlaceholder: "Search mall, marina, downtown parking",
    filters: ["Nearby", "Covered", "EV", "Monthly"],
    highlight: "Reserve spots near business districts and event zones",
    heroStats: [
      { label: "Open spots", value: "1.3k" },
      { label: "From", value: "AED 8/hr" }
    ],
    icon: ParkingSquare
  },
  {
    key: "sellCar",
    label: "Sell Car",
    title: "Get an instant estimate in minutes",
    subtitle: "Submit your vehicle details, see a valuation range, and schedule an inspection.",
    color: "#14B8A6",
    searchPlaceholder: "Search your make, model, or valuation tips",
    filters: ["Sedan", "SUV", "Luxury", "Fleet"],
    highlight: "Instant valuation engine with dealer and direct-sale routes",
    heroStats: [
      { label: "Avg. payout", value: "24 hrs" },
      { label: "Inspections", value: "Free" }
    ],
    icon: BadgeDollarSign
  },
  {
    key: "buyCar",
    label: "Buy Car",
    title: "Curated used and certified cars",
    subtitle: "Browse verified listings, estimate finance, and compare total ownership value.",
    color: "#1D4ED8",
    searchPlaceholder: "Search SUVs, EVs, sedans, certified cars",
    filters: ["SUV", "Sedan", "EV", "Luxury"],
    highlight: "Bank-ready finance estimates and inspection-backed listings",
    heroStats: [
      { label: "Verified", value: "680" },
      { label: "Finance from", value: "AED 899/mo" }
    ],
    icon: ShoppingBag
  },
  {
    key: "rentals",
    label: "Rentals",
    title: "Short-term and monthly rentals",
    subtitle: "Book compact, SUV, and premium rentals with instant confirmation flows.",
    color: "#F97316",
    searchPlaceholder: "Search rental cars, dates, and pickup zones",
    filters: ["Daily", "Weekly", "Monthly", "Premium"],
    highlight: "Airport pickup, deposit visibility, and same-day approvals",
    heroStats: [
      { label: "Available now", value: "210" },
      { label: "Daily from", value: "AED 119" }
    ],
    icon: KeyRound
  },
  {
    key: "merchant",
    label: "Merchant",
    title: "Grow your car business on CarGo",
    subtitle: "Onboard your workshop, wash team, store, or fleet with a guided setup flow.",
    color: "#9333EA",
    searchPlaceholder: "Search onboarding steps or merchant support",
    filters: ["Wash", "Garage", "Retail", "Fleet"],
    highlight: "Business onboarding with payouts, catalog tools, and operational dashboards",
    heroStats: [
      { label: "Setup time", value: "12 min" },
      { label: "Cities live", value: "7" }
    ],
    icon: Store
  }
];

export const sectionLookup = Object.fromEntries(
  sectionConfigs.map((section) => [section.key, section])
) as Record<AppSectionKey, SectionConfig>;


import type { LucideIcon } from "lucide-react-native";

export type AppSectionKey =
  | "cargo"
  | "carWash"
  | "spareParts"
  | "repairs"
  | "parking"
  | "sellCar"
  | "buyCar"
  | "rentals"
  | "merchant";

export type TransitionDirection = "forward" | "backward";

export interface HeroStat {
  label: string;
  value: string;
}

export interface SectionConfig {
  key: AppSectionKey;
  label: string;
  title: string;
  subtitle: string;
  color: string;
  searchPlaceholder: string;
  filters: string[];
  highlight: string;
  heroStats: HeroStat[];
  icon: LucideIcon;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  token?: string;
}

export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Booking {
  id: string;
  title: string;
  section: AppSectionKey;
  status: "pending" | "confirmed" | "completed";
  scheduledFor: string;
  amount: number;
}

export interface ServiceOffer {
  id: string;
  title: string;
  subtitle: string;
  duration: number;
  price: number;
  category: string;
  rating?: number;
  badge?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  fitment: string;
  price: number;
  stock: number;
  accentColor: string;
}

export interface RepairGarage {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  eta: string;
  priceFrom: number;
}

export interface ParkingSpot {
  id: string;
  location: string;
  zone: string;
  hourlyRate: number;
  availability: string;
  distance: string;
}

export interface CarListing {
  id: string;
  title: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  price: number;
  category: string;
  location: string;
}

export interface RentalOffer {
  id: string;
  title: string;
  type: string;
  seats: number;
  transmission: string;
  dailyRate: number;
  deposit: number;
}

export interface HighlightCard {
  id: string;
  title: string;
  subtitle: string;
  targetSection: AppSectionKey;
}

export interface MerchantDraft {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  emirate: string;
  category: string;
}


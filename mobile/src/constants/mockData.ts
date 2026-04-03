import type {
  AppSectionKey,
  CarListing,
  HighlightCard,
  ParkingSpot,
  ProductItem,
  RentalOffer,
  RepairGarage,
  ServiceOffer
} from "@/types/app";

export const cargoHighlights: HighlightCard[] = [
  {
    id: "highlight-1",
    title: "Wash + wax before sunset",
    subtitle: "Book a premium detailing slot in under 60 minutes.",
    targetSection: "carWash"
  },
  {
    id: "highlight-2",
    title: "Top-rated brake parts sale",
    subtitle: "Engine and braking essentials with same-day delivery.",
    targetSection: "spareParts"
  },
  {
    id: "highlight-3",
    title: "Verified SUV financing",
    subtitle: "Browse finance-ready family cars under AED 95k.",
    targetSection: "buyCar"
  }
];

export const carWashServices: ServiceOffer[] = [
  {
    id: "wash-1",
    title: "Express Exterior Wash",
    subtitle: "Mobile foam wash for apartments, offices, and compounds.",
    duration: 35,
    price: 35,
    category: "Exterior",
    rating: 4.8,
    badge: "Fastest"
  },
  {
    id: "wash-2",
    title: "Interior Refresh",
    subtitle: "Vacuum, dashboard wipe, mats, and odor neutralizer.",
    duration: 55,
    price: 59,
    category: "Interior",
    rating: 4.9,
    badge: "Popular"
  },
  {
    id: "wash-3",
    title: "Premium Detail",
    subtitle: "Clay treatment, hand polish, tire dressing, and cabin steam.",
    duration: 120,
    price: 189,
    category: "Premium",
    rating: 4.9,
    badge: "Best value"
  }
];

export const sparePartProducts: ProductItem[] = [
  {
    id: "part-1",
    name: "Ceramic Brake Pad Kit",
    brand: "Brembo",
    category: "Brakes",
    fitment: "Toyota Land Cruiser 2018+",
    price: 420,
    stock: 24,
    accentColor: "#FDE68A"
  },
  {
    id: "part-2",
    name: "AGM Battery 95Ah",
    brand: "Varta",
    category: "Battery",
    fitment: "BMW X5 / Mercedes GLE",
    price: 699,
    stock: 12,
    accentColor: "#DBEAFE"
  },
  {
    id: "part-3",
    name: "Synthetic Oil Filter Pack",
    brand: "Bosch",
    category: "Engine",
    fitment: "Nissan Patrol 2020+",
    price: 74,
    stock: 73,
    accentColor: "#D1FAE5"
  },
  {
    id: "part-4",
    name: "Wireless CarPlay Adapter",
    brand: "Ottocast",
    category: "Accessories",
    fitment: "Universal",
    price: 269,
    stock: 30,
    accentColor: "#FCE7F3"
  }
];

export const repairGarages: RepairGarage[] = [
  {
    id: "repair-1",
    name: "Al Quoz Auto Lab",
    specialty: "Mechanical diagnostics and AC repairs",
    rating: 4.9,
    eta: "Tomorrow 10:00 AM",
    priceFrom: 149
  },
  {
    id: "repair-2",
    name: "Marina German Garage",
    specialty: "European brands, coding, and scheduled maintenance",
    rating: 4.8,
    eta: "Today 6:30 PM",
    priceFrom: 220
  },
  {
    id: "repair-3",
    name: "Sharjah Body & Paint Hub",
    specialty: "Body work, dent removal, and color matching",
    rating: 4.7,
    eta: "Saturday 12:00 PM",
    priceFrom: 320
  }
];

export const parkingSpots: ParkingSpot[] = [
  {
    id: "park-1",
    location: "Dubai Marina Mall",
    zone: "Covered A2",
    hourlyRate: 12,
    availability: "18 spots left",
    distance: "450 m"
  },
  {
    id: "park-2",
    location: "DIFC Central",
    zone: "Premium B1",
    hourlyRate: 18,
    availability: "6 spots left",
    distance: "230 m"
  },
  {
    id: "park-3",
    location: "Abu Dhabi Corniche",
    zone: "EV Priority",
    hourlyRate: 10,
    availability: "11 spots left",
    distance: "700 m"
  }
];

export const buyCarListings: CarListing[] = [
  {
    id: "car-1",
    title: "Toyota Land Cruiser GXR",
    year: 2022,
    mileage: 32000,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 229000,
    category: "SUV",
    location: "Dubai"
  },
  {
    id: "car-2",
    title: "Tesla Model 3 Performance",
    year: 2023,
    mileage: 18000,
    fuel: "Electric",
    transmission: "Automatic",
    price: 174900,
    category: "EV",
    location: "Abu Dhabi"
  },
  {
    id: "car-3",
    title: "BMW 520i M Sport",
    year: 2021,
    mileage: 44000,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 134500,
    category: "Sedan",
    location: "Sharjah"
  }
];

export const rentalOffers: RentalOffer[] = [
  {
    id: "rent-1",
    title: "Nissan X-Trail",
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    dailyRate: 189,
    deposit: 1200
  },
  {
    id: "rent-2",
    title: "Mazda 6",
    type: "Sedan",
    seats: 5,
    transmission: "Automatic",
    dailyRate: 129,
    deposit: 900
  },
  {
    id: "rent-3",
    title: "Mercedes C200",
    type: "Premium",
    seats: 5,
    transmission: "Automatic",
    dailyRate: 289,
    deposit: 2000
  }
];

export const quickActionSections: AppSectionKey[] = [
  "carWash",
  "spareParts",
  "repairs",
  "parking",
  "buyCar",
  "rentals"
];


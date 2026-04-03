import axios from "axios";

import { useAppStore } from "@/store/appStore";
import type { MerchantDraft } from "@/types/app";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

const baseURL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 12000
});

apiClient.interceptors.request.use((config) => {
  const token = useAppStore.getState().user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  }
);

const unwrap = <T>(response: { data: ApiEnvelope<T> }) => response.data.data;

type CarValuationResponse = {
  estimatedValue: number;
  currency: string;
};

export const authApi = {
  register: (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => apiClient.post("/auth/register", payload).then(unwrap),
  login: (payload: { email: string; password: string }) =>
    apiClient.post("/auth/login", payload).then(unwrap)
};

export const userApi = {
  getProfile: () => apiClient.get("/users/profile").then(unwrap),
  saveVehicle: (payload: {
    plateNumber: string;
    make: string;
    model: string;
    year: number;
  }) => apiClient.post("/users/vehicles", payload).then(unwrap)
};

export const servicesApi = {
  getCatalog: (category?: string) =>
    apiClient
      .get("/services/catalog", { params: { category } })
      .then(unwrap),
  createBooking: (payload: {
    type: "car-wash" | "repair";
    serviceName: string;
    scheduledFor: string;
    price: number;
  }) => apiClient.post("/services/bookings", payload).then(unwrap),
  getBookings: () => apiClient.get("/services/bookings").then(unwrap)
};

export const productsApi = {
  getProducts: (category?: string) =>
    apiClient.get("/products", { params: { category } }).then(unwrap),
  checkoutCart: (payload: {
    items: Array<{ productId: string; quantity: number }>;
  }) => apiClient.post("/products/cart/checkout", payload).then(unwrap),
  getOrders: () => apiClient.get("/products/orders").then(unwrap)
};

export const carsApi = {
  getCars: (listingType = "buy") =>
    apiClient.get("/cars", { params: { listingType } }).then(unwrap),
  createSellListing: (payload: {
    title: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
  }) => apiClient.post("/cars/sell", payload).then(unwrap),
  getValuation: (payload: { year: number; mileage: number }) =>
    apiClient
      .get<ApiEnvelope<CarValuationResponse>>("/cars/valuation", {
        params: payload
      })
      .then(unwrap)
};

export const rentalsApi = {
  getRentals: () => apiClient.get("/rentals").then(unwrap),
  createRentalBooking: (payload: {
    rentalId: string;
    startDate: string;
    endDate: string;
  }) => apiClient.post("/rentals/book", payload).then(unwrap)
};

export const parkingApi = {
  getSlots: () => apiClient.get("/parking").then(unwrap),
  reserveSlot: (payload: { parkingSlotId: string; startsAt: string }) =>
    apiClient.post("/parking/reserve", payload).then(unwrap)
};

export const merchantApi = {
  registerBusiness: (payload: MerchantDraft) =>
    apiClient.post("/merchant/register", payload).then(unwrap)
};

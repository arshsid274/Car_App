import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { sectionConfigs } from "@/constants/sections";
import type {
  AppSectionKey,
  Booking,
  CartItem,
  TransitionDirection,
  UserProfile
} from "@/types/app";

type AppStoreState = {
  activeSection: AppSectionKey;
  transitionDirection: TransitionDirection;
  user: UserProfile | null;
  cart: CartItem[];
  bookings: Booking[];
  setActiveSection: (section: AppSectionKey) => void;
  setUser: (user: UserProfile | null) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  addBooking: (booking: Booking) => void;
  clearBookings: () => void;
};

const getSectionIndex = (section: AppSectionKey) =>
  sectionConfigs.findIndex((item) => item.key === section);

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      activeSection: "cargo",
      transitionDirection: "forward",
      user: {
        id: "demo-user",
        name: "Mohammad Arsh",
        email: "m.arsh@example.com",
        location: "Dubai Marina"
      },
      cart: [],
      bookings: [],
      setActiveSection: (section) =>
        set((state) => {
          const currentIndex = getSectionIndex(state.activeSection);
          const nextIndex = getSectionIndex(section);
          const transitionDirection: TransitionDirection =
            nextIndex >= currentIndex ? "forward" : "backward";

          return {
            activeSection: section,
            transitionDirection
          };
        }),
      setUser: (user) => set({ user }),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            };
          }

          return {
            cart: [...state.cart, { ...item, quantity: 1 }]
          };
        }),
      updateCartQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((item) => (item.id === id ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0)
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id)
        })),
      clearCart: () => set({ cart: [] }),
      addBooking: (booking) =>
        set((state) => ({
          bookings: [booking, ...state.bookings]
        })),
      clearBookings: () => set({ bookings: [] })
    }),
    {
      name: "cargo-super-app-store",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeSection: state.activeSection,
        transitionDirection: state.transitionDirection,
        user: state.user,
        cart: state.cart,
        bookings: state.bookings
      })
    }
  )
);

export const getCartSubtotal = () =>
  useAppStore
    .getState()
    .cart.reduce((total, item) => total + item.price * item.quantity, 0);


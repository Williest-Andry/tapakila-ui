import { create } from "zustand";

interface BookingItem {
  ticketTypeId: string;
  ticketTypeName: string;
  price: number;
  quantity: number;
}

interface BookingStore {
  eventId: string | null;
  items: BookingItem[];

  setEvent: (eventId: string) => void;
  addItem: (item: BookingItem) => void;
  updateQuantity: (ticketTypeId: string, quantity: number) => void;
  clearBooking: () => void;
  total: () => number;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  eventId: null,
  items: [],

  setEvent: (eventId) => set({ eventId, items: [] }),

  addItem: (item) => {
    const existing = get().items.find(
      (i) => i.ticketTypeId === item.ticketTypeId,
    );
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.ticketTypeId === item.ticketTypeId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        ),
      });
    } else {
      set({ items: [...get().items, item] });
    }
  },

  updateQuantity: (ticketTypeId, quantity) => {
    if (quantity <= 0) {
      set({
        items: get().items.filter((i) => i.ticketTypeId !== ticketTypeId),
      });
    } else {
      set({
        items: get().items.map((i) =>
          i.ticketTypeId === ticketTypeId ? { ...i, quantity } : i,
        ),
      });
    }
  },

  clearBooking: () => set({ eventId: null, items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));

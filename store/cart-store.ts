import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  incrementItem: (item: CartItem) => "success" | "max_stock";
  decrementItem: (id: string, color: string) => void;
  removeItem: (id: string, color: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      incrementItem: (product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.id === product.id && item.color === product.color
        );

        const qtyToAdd = Number(product.quantity) || 1;

        if (existingItem) {
          const newQuantity = (existingItem.quantity || 0) + qtyToAdd;
          if (newQuantity > existingItem.stock) {
            return "max_stock";
          }
          set({
            items: items.map((item) =>
              item.id === product.id && item.color === product.color
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
          return "success";
        }

        if (qtyToAdd > product.stock) {
          return "max_stock";
        }
        
        set({ items: [...items, { ...product,quantity: qtyToAdd, }] });
        return "success";
      },

      decrementItem: (id, color) => {
        const { items } = get();
        set({
          items: items.map((item) =>
            item.id === id && item.color === color && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        });
      },

      removeItem: (id, color) => {
        const { items } = get();
        set({
          items: items.filter(
            (item) => !(item.id === id && item.color === color)
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", 
    }
  )
);

export const useTotalItems = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  
export const useTotalPrice = () => 
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity,0)
  )

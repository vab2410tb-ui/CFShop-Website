import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";

type CartActionStatus = "success" | "max_stock";

interface CartState {
    items: CartItem[];
    addItem: (
        product: CartItem,
        quantity?: number
    ) => CartActionStatus;
    incrementItem: (
        item: CartItem
    ) => CartActionStatus;
    decrementItem: (
        id: string,
        color: string
    ) => void;
    removeItem: (
        id: string,
        color: string
    ) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            // ADD ITEM
            addItem: (product, quantity = 1) => {
                const { items } = get();

                const existingItem = items.find(
                    (item) =>
                        item.id === product.id &&
                        item.color === product.color
                );

                const quantityToAdd = Math.max(
                    1,
                    Math.floor(quantity)
                );

                if (existingItem) {
                    const newQuantity =
                        existingItem.quantity + quantityToAdd;

                    if (newQuantity > existingItem.stock) {
                        return "max_stock";
                    }

                    set({
                        items: items.map((item) =>
                            item.id === product.id &&
                            item.color === product.color
                                ? {
                                      ...item,
                                      quantity: newQuantity,
                                  }
                                : item
                        ),
                    });

                    return "success";
                }

                if (quantityToAdd > product.stock) {
                    return "max_stock";
                }

                set({
                    items: [
                        ...items,
                        {
                            ...product,
                            quantity: quantityToAdd,
                        },
                    ],
                });

                return "success";
            },


            // INCREMENT 
            incrementItem: (product) => {
                const { items } = get();

                const existingItem = items.find(
                    (item) =>
                        item.id === product.id &&
                        item.color === product.color
                );

                if (!existingItem) {
                    return "max_stock";
                }

                const newQuantity =
                    existingItem.quantity + 1;

                if (newQuantity > existingItem.stock) {
                    return "max_stock";
                }

                set({
                    items: items.map((item) =>
                        item.id === product.id &&
                        item.color === product.color
                            ? {
                                  ...item,
                                  quantity: newQuantity,
                              }
                            : item
                    ),
                });

                return "success";
            },


            // DECREMENT 
            decrementItem: (id, color) => {
                const { items } = get();

                set({
                    items: items.map((item) =>
                        item.id === id &&
                        item.color === color &&
                        item.quantity > 1
                            ? {
                                  ...item,
                                  quantity: item.quantity - 1,
                              }
                            : item
                    ),
                });
            },

            // REMOVE
            removeItem: (id, color) => {
                const { items } = get();

                set({
                    items: items.filter(
                        (item) =>
                            !(
                                item.id === id &&
                                item.color === color
                            )
                    ),
                });
            },

            // CLEAR 
            clearCart: () => {
                set({ items: [] });
            },
        }),
        {
            name: "cart-storage",
        }
    )
);


// TOTAL ITEMS
export const useTotalItems = () =>
    useCartStore((state) =>
        state.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        )
    );

// TOTAL PRICE
export const useTotalPrice = () =>
    useCartStore((state) =>
        state.items.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        )
    );
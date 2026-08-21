"use client";

import { useCartStore } from "@/store/cart-store";

export default function CartButton() {
  const items = useCartStore((state) => state.items);

  return (
    <button>
      Cart ({items.length})
    </button>
  );
}
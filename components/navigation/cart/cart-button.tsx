"use client";

import { useCartStore } from "@/stores/cart-store";

export default function CartButton() {
  const items = useCartStore((state) => state.items);

  return (
    <button>
      Cart ({items.length})
    </button>
  );
}
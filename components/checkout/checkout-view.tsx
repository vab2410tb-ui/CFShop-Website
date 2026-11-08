import { CartItem } from "@/types/cart";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
interface CheckoutViewProps {
  items: CartItem[];
  openOrder: boolean;
  setOpenOrder: React.Dispatch<React.SetStateAction<boolean>>; // Sửa type chuẩn
  totalItem: number;
  totalPrice: number;
}

export const CheckoutView = ({
  items,
  openOrder,
  setOpenOrder,
  totalItem,
  totalPrice,
}: CheckoutViewProps) => {
  return (
    <div className="mt-[25px]">
      <div className="flex items-center">
        <span className="font-bold text-black text-[18px] lg:hidden">Order overview</span>
        <Button
          variant="outline"
          onClick={() => setOpenOrder((prev) => !prev)}
          className="md:hidden border-none"
        >
          {openOrder ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      <div
        className={`
            grid transition-[grid-template-rows] duration-300 ease-in-out ${
              openOrder ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            } md:grid-rows-[1fr]
        `}
      >
        <div className="overflow-hidden">
          <div className="grid w-full gap-3">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.color || ""}`}
                className="grid grid-cols-[auto_1fr_auto] items-center pt-3"
              >
                <div className="relative border rounded-xl shadow-sm">
                  <Image
                    width={64}
                    height={64}
                    src={item.image}
                    alt={item.name}
                    className="object-contain rounded-xl p-1"
                  />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black flex items-center justify-center rounded-full text-white text-xs font-semibold">
                    {item.quantity}
                  </span>
                </div>

                <div className="pl-3">
                  <p className="text-sm text-black font-medium line-clamp-1">
                    {item.name}
                  </p>
                  {item.color && (
                    <p className="text-xs text-gray-500">Color: {item.color}</p>
                  )}
                </div>

                <div className="pl-3 text-sm font-medium">
                  {item.price.toLocaleString("vi-VN")} ₫
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtotal & Total */}
      <div className="mt-5 border-t pt-2 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotals · {totalItem} items</span>
          <span>{totalPrice.toLocaleString("vi-VN")} ₫</span>
        </div>

        <div className="flex justify-between items-center text-base font-bold text-black pt-2 border-t">
          <span>Total</span>
          <div className="flex gap-1.5 items-center">
            <span className="text-xs font-normal text-gray-500">VND</span>
            <span>{totalPrice.toLocaleString("vi-VN")} ₫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useCartStore } from "@/stores/cart-store";
import { useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCheckoutStore } from "@/stores/checkout-store";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const checkoutInfo = useCheckoutStore((state) => state.checkoutInfo)
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!orderId) return;

    clearCart();
  }, [orderId, clearCart]);


  return (
    <div className="flex flex-col items-center">
      <div className="mb-5">
        <Image
          alt="logo"
          src="/images/logo.png"
          width={80}
          height={80}
        />
      </div>
      <div className="flex">
        {/* Icon Success */}
        <div className="w-15 h-15 mr-2.5 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-xl  font-bold tracking-tight mb-2">
            Order Placed Successfully!
          </h1>

          <p className="text-neutral-600 mb-4 max-w-md">
            Thank you {checkoutInfo?.fullName ?? "Customer"}
          </p>
        </div>
      </div>

      {orderId && (
        <div className="mx-5
        ">
          <div className="border px-4 py-2 rounded-lg text-sm mb-6">
            <h2 className="mb-2 font-bold"> Your order has been confirmed</h2>
            <span className="text-neutral-500">Order ID: </span>
            <span className="font-semibold text-neutral-900">{orderId}</span>
          </div>
          <div className="border px-4 py-2 rounded-lg text-sm mb-6">
            <h2 className="mb-2 font-bold">Order Details</h2>
            <div className="grid grid-cols-2 gap-7">
              <div>
                <h3 className="font-bold">Contact Infomation</h3>
                <p>{checkoutInfo?.email}</p>
              </div>
              <div>
                <h3 className="font-bold">Payment Methods</h3>
                <p>{paymentMethod.toLocaleUpperCase()}</p>
              </div>
              <div>
                <h3 className="font-bold">Shipping Address</h3>
                <p>{checkoutInfo?.fullName} - {checkoutInfo?.address}, {checkoutInfo?.ward}, {checkoutInfo?.province}</p>
              </div>
              <div>
                <h3 className="font-bold">Phone Number</h3>
                <p>{checkoutInfo?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3 mb-[20px]">
        <Link href="/">
          <Button className="bg-black text-white hover:bg-neutral-800 px-4 py-6 rounded-[15px]">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

const CheckoutSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20">Loading order details...</div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

export default CheckoutSuccessPage;


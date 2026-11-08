"use client";

import Image from "next/image";
import Link from "next/link";
import PaymentMethod from "@/components/checkout/payment-method";
import CheckoutInfo from "@/components/checkout/checkout-info";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOrder } from "@/actions/order/create-order";
import { useCheckoutStore } from "@/stores/checkout-store";
import {
  useCartStore,
  useTotalPrice,
  useTotalItems,
} from "@/stores/cart-store";

interface PaymentResponse {
  url?: string;
  error?: string;
}

const paymentMethodMap = {
    cod: "COD",
    bank: "BANK",
    zalopay: "ZALOPAY",
    vnpay: "VNPAY",
} as const;

const CheckoutPage = () => {
  const router = useRouter();

  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Cart Store
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useTotalPrice();
  const totalItem = useTotalItems();

  // Checkout Store
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);
  const checkoutInfo = useCheckoutStore((state) => state.checkoutInfo);
  const updateCheckoutInfo = useCheckoutStore(
    (state) => state.updateCheckoutInfo
  );

  if (!checkoutInfo) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="p-10 text-center text-gray-500">
          No shipping information available. Please go back to the cart and fill in your details.
        </p>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    const prismaPaymentMethod = paymentMethodMap[paymentMethod];

    setErrorMsg("");

    if (loading) return;

    if (items.length === 0) {
      setErrorMsg("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create an order in the database
      const res = await createOrder({
        shippingInfo: checkoutInfo,

        orderItems: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          color: item.color || null,
        })),
        paymentMethod: prismaPaymentMethod,
      });

      if (!res.success || !res.data) {
        setErrorMsg(res.message || "Failed to create order");
        setLoading(false);
        return;
      }

      const createdOrderId = res.data.orderId;

      // 2. Process the selected payment method
      if (paymentMethod === "zalopay" || paymentMethod === "vnpay") {
        const endpoint =
          paymentMethod === "zalopay"
            ? "/api/payment/zalopay"
            : "/api/checkout/vnpay";

        const paymentRes = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: createdOrderId,
            amount: totalPrice,
          }),
        });

        const paymentData: PaymentResponse = await paymentRes.json();

        if (!paymentRes.ok || !paymentData.url) {
          setErrorMsg(paymentData.error || "Failed to initialize payment gateway");
          setLoading(false);
          return;
        }

        // Redirect to the ZaloPay / VNPAY payment gateway
        window.location.href = paymentData.url;
        return;
      }

      clearCart();

      // 3. Redirect to the Success page for COD or Bank Transfer
      router.push(`/checkout/success?orderId=${createdOrderId}`);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      console.error(err);
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 -mt-20 mx-auto">
      {/* LEFT */}
      <div className="flex justify-end">
        <div className="w-full max-w-[1000px] px-[14px] py-[16px] lg:p-10">
          <div className="ml-auto w-full max-w-[550px]">
            <Link href="/" className="flex justify-center">
                <div className="relative w-[100px] h-[60px] mb-[20px] ">
                    <Image
                        src="/images/logo.png"
                        alt="Product"
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {errorMsg}
              </div>
            )}

            {/* FORM CONTENT */}
            <main className="flex flex-col gap-[20px]">
              {/* CHECKOUT INFO */}
              <CheckoutInfo
                checkoutInfo={checkoutInfo}
                updateCheckoutInfo={updateCheckoutInfo}
              />

              {/* PAYMENT METHOD */}
              <PaymentMethod
                isLoading={loading}
                onPlaceOrder={handlePlaceOrder}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              >
                <div className="block md:hidden">
                  <CheckoutView
                    items={items}
                    openOrder={openOrder}
                    setOpenOrder={setOpenOrder}
                    totalItem={totalItem}
                    totalPrice={totalPrice}
                  />
                </div>
              </PaymentMethod>
            </main>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:block mr-auto w-full max-w-[480px] px-[14px] py-[16px] lg:p-10">
            <CheckoutView
              items={items}
              openOrder={openOrder}
              setOpenOrder={setOpenOrder}
              totalItem={totalItem}
              totalPrice={totalPrice}
            />
      </div>
    </div>
  );
}

export default CheckoutPage;

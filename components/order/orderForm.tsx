"use client";

import Image from "next/image";
import Link from "next/link";
import FloatingInput from "@/components/ui/floating-input";
import FloatingTextarea from "@/components/ui/floating-textarea";
import { z } from "zod";
import { useState, useTransition } from "react";
import { OrderSchema } from "@/schemas/order.schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { validateOrder } from "@/actions/order/validate-order"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCheckoutStore } from "@/stores/checkout-store";
import { useCartStore, useTotalPrice } from "@/stores/cart-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export interface UserProfileData {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  ward?: string | null;
  province?: string | null;
  note?: string | null;
}

interface OrderFormProps {
  initialData: UserProfileData | null;
}

type OrderValues = z.infer<typeof OrderSchema>;

const OrderForm = ({ initialData }: OrderFormProps) => {
  const router = useRouter();
  
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const setCheckoutInfo = useCheckoutStore((state) => state.setCheckoutInfo);

  const items = useCartStore((state) => state.items);
  const totalPrice = useTotalPrice();
  const removeItems = useCartStore((state) => state.removeItem);

  const form = useForm<OrderValues>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      fullName: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      ward: initialData?.ward || "",
      province: initialData?.province || "",
      note: initialData?.note ||"",
    },
  });

  const onSubmit: SubmitHandler<OrderValues> = (data) => {
    console.log("Dữ liệu form trước khi gửi:", data);
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await validateOrder(data);

      if (!res.success) {
        setError(res.error);
        return;
      }
      setCheckoutInfo(res.data);
      router.push("/checkout");
    });
  };

  return (
    <>
      {items.length > 0 ? (
        <div className="px-[max(20px,calc(50%-700px))] bg-[#F9F9F9] py-8">
          <header className="mb-[32px]">
            <h1 className="lg:text-[48px] text-[36px] font-bold mb-[16px] lg:mb-[24px]">Payment</h1>
            <div className="max-w-[720px]">
              <p>
                Please fill in all the information so that we can deliver your
                order to the correct address. The next step will be to choose a
                payment method (wire transfer, COD, e-wallet, international
                card).
              </p>
            </div>
          </header>
          <Form {...form}>
            <form
              className="grid grid-cols-1 md:grid-cols-[minmax(0,820px)_540px] gap-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <main className="flex flex-col gap-[16px] max-w-[820px] w-full">
                <h2 className="lg:text-[18px] font-bold">
                  Delivery Information
                </h2>
                <section className="bg-white p-[32px] flex flex-col gap-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingInput
                              id="fullName"
                              label="Full name*"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingInput
                              id="phone"
                              label="Phone Number*"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-[16px] ">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingInput
                              id="email"
                              label="Email*"
                              type="email"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingInput
                              id="address"
                              label="Address*"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] ">
                    <FormField
                      control={form.control}
                      name="ward"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingInput
                              id="ward"
                              label="Ward/Commune*"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingInput
                              id="province"
                              label="Province/City*"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-3 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded">
                      {success}
                    </div>
                  )}
                </section>

                <h2 className="lg:text-[18px] font-bold">Order Notes</h2>
                <section className="bg-white border-1 rounded-md shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingTextarea 
                            id="note" 
                            placeholder="ex: Deliver during business hours, call 30 minutes in advance..." 
                            disabled={isPending}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </main>

              <aside className="flex flex-col gap-[16px] ">
                <h2 className="lg:text-[18px] font-bold">Order Summary</h2>
                <div className="bg-white p-[20px] md:p-[32px] flex flex-col gap-[16px] shadow-sm rounded-[10px] ">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div>
                        <Image
                          width={128}
                          height={128}
                          src={item.image}
                          alt={item.name}
                        />
                      </div>

                      <div className="grid gap-2">
                        <p className="text-[14px] text-black font-bold line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-[14px] text-[#333333B3]">
                          {(item.price || 0).toLocaleString("vi-VN")} đ
                        </p>
                        <p className="text-[#333333B3]">Color: {item.color}</p>
                    

                     
                        <p className="border w-fit px-3 py-1 md:px-5 md:py-2 rounded-[10px] text-center">
                          {item.quantity}
                        </p>
                        <span onClick={() => removeItems(item.id, item.color)} className="cursor-pointer">
                          Remove
                        </span>
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="flex justify-between">
                      <span className="text-[#333333B3]">Total (VND)</span>
                      <span className="font-bold">
                        {(Number(totalPrice) || 0).toLocaleString("vi-VN")}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-[32px] h-[56px] rounded-[60px]"
                    disabled={isPending}
                  >
                    {isPending ? "PROCESSING..." : "Choose a payment method"}
                  </Button>
                </div>
              </aside>
            </form>
          </Form>
        </div>
      ) : (
        <section className="min-h-[100vh]">
          <div className="flex justify-center pt-[60px] px-[32px] pb-[96px] mt-[40px] mx-auto ">
            <div className="bg-white w-full text-[#B3B3B38C]  max-w-[480px] py-[80px] px-[24px] rounded-[20px] shadow-sm">
              <p className="text-center mb-[20px]">Your cart is empty</p>
              <Link href="/collections/all">
                <Button className="mx-[78px] max-w-[280px] w-full h-[56px] rounded-[60px]">
                  Continue shopping
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderForm;
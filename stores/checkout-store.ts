import { create } from "zustand"
import { persist } from "zustand/middleware"
import { TypeCheckoutInfo } from "@/types/checkout-info";


type PaymentMethod = "cod" | "bank" | "zalopay" | "vnpay";



interface CheckoutStore {
    checkoutInfo: TypeCheckoutInfo | null;
    setCheckoutInfo: (data:TypeCheckoutInfo) => void;
    clearCheckout: () => void;
    updateCheckoutInfo: (data: Partial<TypeCheckoutInfo>) => void;
    paymentMethod: PaymentMethod;
    setPaymentMethod: (method: PaymentMethod) => void;
}

export const useCheckoutStore = create<CheckoutStore>() (
    persist(
        (set) => ({
            paymentMethod: "cod",

            setPaymentMethod: (method) =>
                set({
                paymentMethod: method,
                }),
            checkoutInfo: null,

            setCheckoutInfo: (data) => 
                set({
                    checkoutInfo: data,
                }),


            updateCheckoutInfo: (data) =>
                set((state) => ({
                    checkoutInfo: state.checkoutInfo
                        ? {
                            ...state.checkoutInfo,
                            ...data,
                        }
                        : null,
                })),

            clearCheckout:() => 
                set({
                    checkoutInfo: null,
                }),
            }),
            
            {
                name: "checkout-storage"
            }
    )
);


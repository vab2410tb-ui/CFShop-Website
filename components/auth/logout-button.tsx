"use client"

import { logout } from "@/actions/auth/logout";
import { useCheckoutStore } from "@/stores/checkout-store";

interface LogoutButtonPros {
    children?: React.ReactNode;
};

export const LogoutButton = ({children}:LogoutButtonPros) => {
    const clearCheckout = useCheckoutStore((state) => state.clearCheckout);

    const onClick = async () => {
        clearCheckout();
        await logout();
    }

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}

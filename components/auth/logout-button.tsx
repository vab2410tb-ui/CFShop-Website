"use client"

import { logout } from "@/actions/logout";

interface LogoutButtonPros {
    children?: React.ReactNode;
};

export const LogoutButton = ({children}:LogoutButtonPros) => {
    const onClick = () => {
        logout();
    }

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
"use client"

import { FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { useCurrentUser } from "@/hooks/use-current-user";


export const UserButton = () => {
    const user = useCurrentUser();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback className="bg-[#cfcfcf]">
                       <FaUser className="text-white"/>
                    </AvatarFallback>
                    <DropdownMenuContent className="w-40" align="end"> 
                        <LogoutButton>
                            <DropdownMenuItem>
                                <LogOut/>
                                logout
                            </DropdownMenuItem>
                        </LogoutButton>
                    </DropdownMenuContent>
                </Avatar>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
};
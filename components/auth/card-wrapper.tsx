"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({ 
    children, 
    headerLabel, 
    backButtonHref, 
    backButtonLabel, 
    showSocial 
} : CardWrapperProps) => {
    return (
        <Card 
            className="
                w-full h-full min-h-screen rounded-none border-none shadow-none flex flex-col justify-center bg-white px-6 
                md:pt-10 md:w-[420px] md:min-h-0 md:h-auto md:rounded-xl md:shadow-md md:border md:justify-center
                "
        >
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent className="bg-white border-none p-0">
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter className="bg-white border-none pt-4 pb-0 p-0">
                    <Social/>
                </CardFooter>
            )}
            <CardFooter className="bg-white border-none pt-8 pb-0 p-0 mb-2">
                <BackButton 
                    href={backButtonHref}
                    label={backButtonLabel}
                />
            </CardFooter>
        </Card>
    )
}
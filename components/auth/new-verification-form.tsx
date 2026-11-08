"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { newVerification } from "@/actions/auth/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    
    const hasVerified = useRef(false); 

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {
        if (!token) {
            setError("Missing token!");
            return;
        }

        try {
            const data = await newVerification(token);
            setSuccess(data.success);
            setError(data.error);
        } catch {
            setError("Something went wrong!");
        }
    }, [token]);

    useEffect(() => {
        if (hasVerified.current) return;
        hasVerified.current = true;

        onSubmit();
    }, [onSubmit]);

    return(
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                )}

                <FormSuccess message={success}/>
                
                {!success && (<FormError message={error}/>)}
                
            </div>
        </CardWrapper>
    )
}
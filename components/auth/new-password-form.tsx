"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { NewPasswordSchema } from "@/schemas/index";
import { Input } from "../ui/input";
import { newPassword } from "@/actions/auth/new-password"
import { 
    Form, 
    FormControl,
    FormField,
    FormItem, 
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "../ui/button";
import { FormError } from "@/components/form-error"; 
import { FormSuccess } from "@/components/form-success"; 
import { useSearchParams } from "next/navigation";

export const NewPassWordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");


    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>(""); 

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    }) 

    const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
        setError(""); 
        setSuccess("")
        console.log(data)

        startTransition(() => {
            newPassword(data, token)
                .then((res) => {
                    setError(res?.error);
                    // TODO: Add when we  add 2FA 
                    setSuccess(res?.success)
                })
        });
    }

    return (
        <CardWrapper 
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {... form}>
                <form 
                    onSubmit={form.handleSubmit((onSubmit))}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />   
                    </div><div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />   
                    </div>
                    <FormSuccess message={success}/>
                    <FormError message={error}/>
                    <Button 
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
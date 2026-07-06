"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react"; // 1. Bổ sung useState ở đây
import { ResetSchema } from "@/schemas/index";
import { Input } from "../ui/input";
import { reset } from "@/actions/reset"
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

export const ResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>(""); 

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    }) 

    const onSubmit = (data: z.infer<typeof ResetSchema>) => {
        setError(""); 
        setSuccess("")
        console.log(data)

        startTransition(() => {
            reset(data)
                .then((res) => {
                    setError(res?.error);
                    // TODO: Add when we  add 2FA 
                    setSuccess(res?.success)
                })
        });
    }

    return (
        <CardWrapper 
            headerLabel="Forgot your password?"
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
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
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
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
"use client"

import * as z from "zod";
import { useRouter } from "next/navigation";
import Link  from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react"; // 
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/auth/login"
import { LoginSchema } from "@/schemas/auth.schema";
import { Input } from "../ui/input";
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

export const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
        ? "Email already in use with different provider!"
        : "";
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>(""); 

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: ""
        }
    }) 

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        setError(""); 
        setSuccess("")

        startTransition(() => {
            login(data)
                .then((res) => {
                    if(res?.error) {
                        form.reset();
                        setError(res.error);
                    }

                    if (res?.twoFactor) {
                        setShowTwoFactor(true);
                        setSuccess(
                            "A verification code has been sent to your email."
                    );
                        return;
                    }

                    if (res?.redirectPath) {
                        router.replace(res.redirectPath);
                        router.refresh();
                        return;
                    }
                    if(res?.success) {
                        form.reset();
                        setSuccess(res.success);
                    }

                })
                .catch(()=> setError("Something went wrong!"))
        });
    }

    return (
        <CardWrapper 
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {... form}>
                <form 
                    onSubmit={form.handleSubmit((onSubmit))}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Two Factor Code</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="123456"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />   
                            </>
                        )}
                        {!showTwoFactor && (
                            <>
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
                                                    placeholder=""
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />   

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
                                                    placeholder=""
                                                    type="password"
                                                />
                                            </FormControl>
                                            <Button 
                                                size="sm"
                                                variant="link"
                                                type="button"
                                                className="px-0 font-normal cursor-pointer"
                                            >
                                                <Link href="/auth/reset">
                                                    Forgot password
                                                </Link>
                                            </Button>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>

                    <FormError message={error || urlError }/>
                    
                    <FormSuccess message={success}/>
            
                     <Button 
                        type="submit"
                        className="w-full cursor-pointer h-[36px]"
                        disabled={isPending}
                     >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
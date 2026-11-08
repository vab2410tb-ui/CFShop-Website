import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
    return (
        <div className="w-screen min-h-screen flex items-center justify-center align-middle ">
            <Suspense fallback={<div>Loading login form...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    )
}

export default LoginPage;

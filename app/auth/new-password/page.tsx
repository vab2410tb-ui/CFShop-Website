import { Suspense } from "react";
import { NewPassWordForm } from "@/components/auth/new-password-form";

const NewPassWordPage = () => {
    return (
        <Suspense fallback={<div>Loading password form...</div>}>
            <NewPassWordForm />
        </Suspense>
    )
}

export default NewPassWordPage;

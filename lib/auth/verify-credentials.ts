import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export const verifyCredentials = async (
    email: string,
    password: string
) => {
    const user = await getUserByEmail(email);

    if (!user || !user.password) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        return null;
    }

    return user;
};
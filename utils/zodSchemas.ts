import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }).max(28, { message: "Passwords must be less than 28 characters" }),
});

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(28),
});

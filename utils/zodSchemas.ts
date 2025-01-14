import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(28),
});

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(28),
});

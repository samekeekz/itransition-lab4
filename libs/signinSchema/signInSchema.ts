import {z} from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email({message: "Invalid Email"}),
  password: z
    .string()
    .trim()
    .min(1, {message: "Password must be at least 1 character long"}),
});

export type SignInSchema = z.infer<typeof signInSchema>;

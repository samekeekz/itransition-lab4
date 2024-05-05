import {z} from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {message: "Name must be at least 1 character long"}),
  email: z.string().trim().email({message: "Invalid Email"}),
  password: z
    .string()
    .trim()
    .min(1, {message: "Password must be at least 1 character long"}),
});

export type SignupSchema = z.infer<typeof signupSchema>;
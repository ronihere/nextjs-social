import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const SignUpSchema = z.object({
    email: requiredString.email('Invalid email address'),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, - and _ allowed",
      ),
    password: requiredString.min(8,'minimum 8 characters are required')
})

export const LoginSchema = z.object({
    username: requiredString,
    password: requiredString
})

export const createPostSchema = z.object({
    content: requiredString,
});

export const updateUserProfileSchema = z.object({
    displayName: requiredString,
    bio: z.string().max(1000, "Must be at most 1000 characters"),
});
  
export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
export type LoginValues = z.infer<typeof LoginSchema>
export type SignUpValues = z.infer<typeof SignUpSchema>
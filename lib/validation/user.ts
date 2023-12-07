import {z} from "zod";


//registration of user
export const createUserSchema = z.object({
    name: z.string().min(3, {message: "Name must be up to 3 characters"})
        .max(60, {message: "Name must not exceed 60 characters"}),
    username: z.string().min(2, {message: "Username must be greater than 2 characters"})
        .toLowerCase(),
    email: z.string().email({message: "Not a valid email address"}),
    password: z.string().min(6, {message: "Password must be up to 6 characters"})
})

export type CreateUserType = z.infer<typeof createUserSchema>;

//login user
export const loginSchema = z.object({
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(6, {message: "Password must be up to 6 characters"})
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

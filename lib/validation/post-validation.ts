import {z} from "zod";

export const postSchema = z.object({
    userId: z.string(),
    title: z.string().min(1, {message: "Title is required"}),
    content: z.string().min(3, "The description must be up to three characters"),
    selected: z.object({
        label: z.string(),
        value: z.string()
    }),
     image: z.string()
})

export type PostSchemaType = z.infer<typeof postSchema>;
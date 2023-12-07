import {z} from "zod";

export const CreateCategorySchema = z.object({
    title: z.string().min(1, {message: "Title is required"}),
    description: z.string().min(3, "The description must be up to three characters")
});

//type for category
export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;

//extended CreateCategorySchema for update
export const UpdateCategorySchema = CreateCategorySchema.extend({
    id: z.string().min(1)
});

export const DeleteCategorySchema = z.object({
    id: z.string().min(1)
})
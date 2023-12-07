"use server";
import {z} from "zod";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {toast} from "react-toastify";

const CategoryFormSchema = z.object({
    id: z.string(),
    title: z.string().min(1, {message: "Title is required"}),
    description: z.string().min(3, "The description must be up to three characters")
});
//create category type
const CreateCategoryType = CategoryFormSchema.omit({id: true});
//update category type
const UpdateCategoryType = CategoryFormSchema.omit({id:true});

//temp state
// export type CategoryState = {
//     errors?: {
//         title?: string[];
//         description?: string[];
//     };
//     message?: string | null;
// };

//////Create Category/////////////////
export async function CreateCategory(formData: FormData ){
    //validate form fields using zod
    const validatedFields = CreateCategoryType.safeParse({
        title: formData.get("title"),
        description: formData.get("description")
    });

    //if validation fails
    if(!validatedFields.success) {
       console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Category'

        }
    }

    //get data from validatedFields in preparation for insertion into database
    const {title, description} = validatedFields.data;

    //insert into database
    try{
     await prisma.category.create({
            data:{
                title: title,
                description:  description
            }
        });
        toast.success("Category Created Successfully!")
     }catch(error: any){
         console.log("Create Category (ACTION) ERROR: " + error);

     }
    revalidatePath('/user/category');
    redirect('/user/category');

}

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Update Category///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
export async function UpdateCategory(id: string, formData: FormData){
    //validate form fields using zod
    const validatedFields = UpdateCategoryType.safeParse({
        title: formData.get("title"),
        description: formData.get("description")
    });

    //if validation fails
    if(!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        // toast.error("There are errors in the form");
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Category'
        }
    }
    
    ///get validated data
    const {title, description} = validatedFields.data;
    ///update category
    try{
       await prisma.category.update({
           where: {id},
           data: {
               title, description
           }
       });
        toast.success("Category Updated Successfully!")
     }catch(error: any){
         console.log("Update Category ERROR: " + error);
         // return{message: "DATABASE ERROR: failed to update Category."}
     }
    revalidatePath('/user/category');
    redirect('/user/category');
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Delete Category///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
export async function DeleteCategory(id: string){
    const confirmed = confirm("Are you sure you want to delete this category?")

    if(confirmed){
        try{

           await prisma.category.delete({where: {id}});
           revalidatePath("/user/category")
           toast.success("Category deleted successfully!");

     }catch(error: any){
         console.log("ERROR: " + error);
     }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// POSTS/////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////Create Post/////////////////////////////////////////////////////////////
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const PostFormSchema = z.object({
    id: z.string(),
    userId: z.string({
        invalid_type_error: 'Please select a user'
    }),
    title: z.string().min(1, {message: "Title is required"}),
    content: z.string().min(3, "The description must be up to three characters"),
    // image: z.any()
    //     .refine((files) => files?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    //     .refine(
    //         (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
    //         "Only .jpg, .jpeg, .png and .webp formats are supported."),
    image: z.any()
});

const CreatePostType = PostFormSchema.omit({id:true, createdAt: true, updatedAt:true});
const UpdatePostType = PostFormSchema.omit({id:true, createdAt: true, updatedAt:true});

////////////////////////////////////Create Post////////////////
export async function CreatePost(formData: FormData){
    const validatedFields = CreatePostType.safeParse({
        userId: formData.get('userId'),
        title: formData.get('title'),
        content: formData.get('content'),
        image: formData.get('image')
    });

    if(!validatedFields.success){
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Post'
        }
    }

    const {userId, title, content, image} = validatedFields.data

    console.log("title: ")
    console.log(title);
    console.log("Content: ")
    console.log(content);
    console.log("User ID: ")
    console.log(userId)
    console.log("Image: ")
    console.log(image)
    // try{
    //     await prisma.post.create({
    //         data: {
    //             userId, title, content, image
    //         }
    //     });
    //     toast.success("Post Created Successfully!")
    //  }catch(error: any){
    //      console.log("Create POst ERROR: " + error);
    //  }
    //  revalidatePath("/user/posts")
    //  redirect("/user/posts")
}


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////Update post////////////////////////////////////////////////////

export async function UpdatePost(id: string, formData: FormData){
    const validatedFields = UpdatePostType.safeParse({
        userId: formData.get('userId'),
        title: formData.get('title'),
        content: formData.get('content'),
        image: formData.get('image')
    });

    if(!validatedFields.success){
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Post'
        }
    }

    //get validated data for the post
    const {userId, title, content, image} = validatedFields.data;
    //update post
    try{
       await prisma.post.update({
           where:{id},
           data: {
               userId, title, content, image
           }
       });
        toast.success("Update Was Successful!")
     }catch(error: any){
         console.log("Update post(Action.ts)ERROR: " + error);
     }
    revalidatePath("/user/posts")
    redirect("/user/posts")
}

////////////////////////////////////////////Delete Post////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
export async function DeletePost(id: string){
    const confirmed = window.confirm("Are you sure you want to delete this category?")
    try{
        if(confirmed) {
            await prisma.post.delete({where: {id}});
            revalidatePath("/user/posts")
            toast.success("Post deleted successfully!")
        }
     }catch(error: any){
         console.log("ERROR: " + error);
     }
}
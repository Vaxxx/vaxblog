"use server";
import {z} from "zod";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {toast} from "react-toastify";
import {PostSchemaType} from "@/lib/validation/post-validation";
import {Category} from "@/lib/types";

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
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////GET ALL CATEGORY//////////////////////////////////////////////////////
//get all categories
export async function getAllCategories(){
    const response = await fetch(`http://localhost:3000/api/category`, {
        cache: "no-store"
    });
    const data =  await response.json();
    return data.categories;

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// POSTS/////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////Create Post/////////////////////////////////////////////////////////////

function getFields(input:any, field:any){
    let output = [] ;
    for(let i = 0; i < input.length; ++i)
        output.push(input[i][field]);
    return output;
}

export async function CreatePost(data: PostSchemaType){
    // console.log("Form Data:")
   console.log(data)
    console.log("Found data: ")

    //  console.log("label: ")
      let cate = getFields(data.selected, "label");
    // console.log(cate)
    //
    // let cateValue = getFields(data.selected, "value");
    // console.log("Value: ")
    //  console.log(cateValue)
// console.log("STart")
//     cate.map((cat:any) => {
//         console.log(cat);
//     })


console.log("End")
    try{
        await prisma.post.create({
            data: {
                userId:   data.userId,
                title:    data.title,
                content:  data.content,
                image:    data.image,
                categories: {
                    create:
                      cate.map((cat:any) => ({title: cat}))
                }
            }
        });
        console.log("POST created successfully!")
       // toast.success("Post Created Successfully!")
     }catch(error: any){
         console.log("Create Post ERROR: " + error);
      //   toast.error("The post was not created: " + error)
     }
     revalidatePath("/user/posts")
     redirect("/user/posts")
}

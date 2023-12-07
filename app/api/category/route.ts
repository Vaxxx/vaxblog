import {NextRequest, NextResponse} from "next/server";
import {CreateCategorySchema, DeleteCategorySchema, UpdateCategorySchema} from "@/lib/validation/category";
import prisma from "@/lib/prisma";


//create category
export async function POST(request: NextRequest){
    try{
        const body = await request.json();
        const parsedCategory = CreateCategorySchema.safeParse(body);
        if(!parsedCategory.success){
            console.log(parsedCategory.error);
            return NextResponse.json({error: "Invalid Input"}, {status: 400});
        }
        //destructure parsedCategory
        const {title, description} = parsedCategory.data;

        //create category
        const category = await prisma.category.create({
            data: {
                title, description
            }
        });
        return NextResponse.json({category}, {status: 201});
     }catch(error: any){
         console.log("Create Category ERROR: " + error);
         return NextResponse.json({error: "Internal Server Error"}, {status : 500});
     }
}

//display all categories
export async function GET(){
    try{
        const categories = await prisma.category.findMany({
            orderBy: {
                id: "desc"
            }
        });
        return NextResponse.json({categories}, {status: 200});
     }catch(error: any){
         console.log("GET All Category ERROR: " + error);
        return NextResponse.json({error: "Internal Server Error"}, {status : 500});
     }
}

//update a category
export async function PUT(request: NextRequest){
    try{
        const body =  await request.json();
        //parsedCategory
        const parsedCategory = UpdateCategorySchema.safeParse(body);
        if(!parsedCategory.success){
            console.log(parsedCategory.error);
            return NextResponse.json({error: "Invalid Input"}, {status: 400});
        }
        //destructure parsedCategory
        const {id, title, description} = parsedCategory.data;
        //find Category
        const  category = await prisma.category.findUnique({
            where: {
                id: id
            }
        });

        if(!category){
            return NextResponse.json({error: "Note not found"}, {status: 400})
        }

        const updatedCategory = await prisma.category.update({
            where: {id},
            data: {
                title, description
            }
        });
        return NextResponse.json({updatedCategory}, {status: 200});
     }catch(error: any){
         console.log("Update Category ERROR: " + error);
         return NextResponse.json({error: "Internal Server Error"}, {status: 500});
     }
}

//delete a category
export async function DELETE(request: NextRequest){
    try{
        const body = await request.json();
        //parsed Category
        const parsedCategory = DeleteCategorySchema.safeParse(body);
        if(!parsedCategory.success){
            console.log(parsedCategory.error);
            return NextResponse.json({error: "Invalid Input"}, {status: 400});
        }
        // destructure parsedCategory
        const {id} = parsedCategory.data;
        //find category with id
        const category = await prisma.category.findUnique({
            where: {id}
        });

        if(!category){
            return NextResponse.json({error: "Category not found."}, {status: 400});
        }
        //delete category
        await prisma.category.delete({
            where: {id}
        });
        return NextResponse.json({message: "Category deleted Successfully!"}, {status: 200})
     }catch(error: any){
         console.log("Category Delete ERROR: " + error);
         return NextResponse.json({error: "Internal Server Error"}, {status : 500});
     }
}
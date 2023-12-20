
//display all categories
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(){
    try{
        const categories = await prisma.category.findMany({
            orderBy: {
                id: "desc"
            },
            where: {
                description: {not: null}
            }
        });
        return NextResponse.json({categories}, {status: 200});
    }catch(error: any){
        console.log("GET All Category ERROR: " + error);
        return NextResponse.json({error: "Internal Server Error"}, {status : 500});
    }
}
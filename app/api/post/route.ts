//display all posts
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(){
    try{
        const posts = await prisma.post.findMany({
            orderBy: {
                id: "desc"
            }
        });
        return NextResponse.json({posts}, {status: 200});
    }catch(error: any){
        console.log("GET All Post ERROR: " + error);
        return NextResponse.json({error: "Internal Server Error"}, {status : 500});
    }
}
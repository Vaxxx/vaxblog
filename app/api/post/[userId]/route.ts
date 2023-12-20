// get all post by a certain user
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: {params: { userId: string }}){
    try{
        const posts = await prisma.post.findMany({
            where: {
                userId: params.userId
            },
            orderBy:{
               createdAt: 'desc'
            }
        })
        return NextResponse.json({posts}, {status: 200});
    }catch(error: any){
        console.log("GET POST BY USERID ERROR: " + error);
        return NextResponse.json({message: "ERROR: " + error}, {status: 400})
    }
}
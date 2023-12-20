import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, {params} : {params: {id: string}}){
    try{
        const post = await prisma.post.findUnique({
            where: {
                id: params.id
            }
        });
        return NextResponse.json({post}, {status: 200});
     }catch(error: any){
         console.log("ERROR: " + error);
     }
}
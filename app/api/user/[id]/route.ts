

//get user by user id
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, {params} : {params: {id: string}}){
    try{
       const user = await prisma.user.findUnique({
           where: {
               id: params.id
           }
       });
       return NextResponse.json({user}, {status: 200});
     }catch(error: any){
         console.log("GET USER BY ID ERROR: " + error);
         return NextResponse.json({message: "ERROR: " + error}, {status: 400});
     }
}
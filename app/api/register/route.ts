import {NextRequest, NextResponse} from "next/server";
import {createUserSchema} from "@/lib/validation/user";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
    try{
        const body = await request.json();
        // if(!body.name || !body.username || !body.email || !body.password){
        //     return new NextResponse("Missing Fields.")
        // }
        const parsedUser = createUserSchema.safeParse(body);
        if(!parsedUser.success) {
            console.log(parsedUser.error);
            return NextResponse.json({error: "Invalid Input"}, {status: 400});
        }
        //destructure parsedUser
        const {name, username, email, password} = parsedUser.data;

        //create user
        const user = await prisma.user.create({
            data: {
                name:   name,
                username:  username,
                email:    email,
                password: await bcrypt.hash( password, 10)
            }
        });
        // const {password, ...userDetails} = user;
        return NextResponse.json({user}, {status: 201});
     }catch(error: any){
         console.log("CREATE USER API ERROR: " + error);
         return NextResponse.json({error: "Internal Server Error"}, {status: 500});
     }
}

export async function GET(){
    try{
        const users = await prisma.user.findMany();
        return NextResponse.json({users}, {status: 200});
    }catch(error: any){
        console.log("GET All User ERROR: " + error);
        return NextResponse.json({error: "Internal Server Error"}, {status : 500});
    }
}
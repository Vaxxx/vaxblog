import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {MdAddCircle} from "react-icons/md";
import {PostTable} from "@/components/ui/post-table";
import {Post, columns } from "./columns";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

async function getPostsByUser(userId: string): Promise<Post[]>{
    ///no-store ---> means no caching at all
    const res = await fetch(`http://localhost:3000/api/post/${userId}`,
        {cache: "no-store"}
    )
    const data =  await res.json();
    return data.posts
}

const PostsPage = async() => {
     const userDetails = await getServerSession(authOptions);
     console.log(userDetails?.user.id)

    console.log("POST PAGE.....")
    const data = await getPostsByUser(userDetails?.user.id as string);
     console.log(data)
     return (
        <>
            <Card className={"w-full"}>
                <CardHeader>
                    <CardTitle className={"flex justify-between"}>
                        <h2>Posts</h2>
                        <Link href={"/user/posts/add"} className={"btn inline-flex px-2 text-sm rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-100"}>
                            <MdAddCircle size={20} className={"space-x-2"}/>Add Post</Link>

                    </CardTitle>
                    <CardContent>
                         <PostTable columns={columns} data={data}/>
                    </CardContent>
                </CardHeader>
            </Card>
        </>
    );
};

export default PostsPage;
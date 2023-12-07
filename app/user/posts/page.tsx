import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {MdAddCircle} from "react-icons/md";

const PostsPage = () => {
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

                    </CardContent>
                </CardHeader>
            </Card>
        </>
    );
};

export default PostsPage;
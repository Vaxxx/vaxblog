import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {IoArrowBackCircleOutline} from "react-icons/io5";

const AddPostPage = () => {
    return (
        <>
            <Card className={"w-full"}>
                <CardHeader>
                    <CardTitle className={"flex justify-between"}>
                        <h2>Add a Post</h2>
                        <Link href={"/user/posts/"} className={"btn inline-flex px-2 text-sm rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-100"}>
                            <IoArrowBackCircleOutline size={20} className={"space-x-2"}/>Posts</Link>
                    </CardTitle>
                    <CardContent>

                    </CardContent>
                </CardHeader>
            </Card>
        </>
    );
};

export default AddPostPage;
import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {CreateCategory} from "@/lib/action";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {MdDataSaverOn} from "react-icons/md";
import ProgressButton from "@/components/ui/progress-button";
const AddCategoryPage = () => {


    return (
        <>
            <Card className={"w-full"}>
                <CardHeader>
                    <CardTitle className={"flex justify-between"}>
                        <h2>Add a Category</h2>
                        <Link href={"/user/category/"} className={"btn inline-flex px-2 text-sm rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-100"}>
                            <IoArrowBackCircleOutline size={20} className={"space-x-2"}/>Categories</Link>
                    </CardTitle>
                    <CardContent>
                        <form action={CreateCategory}>
                            <div className={"my-2"}>
                                <Label htmlFor="title">Enter Title</Label>
                                <Input type="text" name={"title"} id={"title"} placeholder="Title..." />
                            </div>
                            <div className={"my-4"}>
                                <Label htmlFor="description">Enter Description</Label>
                                <Textarea id="description" placeholder={"Description...."} name={"description"}/>
                            </div>
                            <div>
                                {/*<Button variant={"outline"} type={"submit"} className={"px-3"}>*/}
                                {/*    <MdDataSaverOn size={20}/>*/}
                                {/*    Save Category</Button>*/}
                                <ProgressButton  props={"Save Category"}/>
                            </div>
                        </form>
                    </CardContent>
                </CardHeader>
            </Card>
        </>
    );
};

export default AddCategoryPage;
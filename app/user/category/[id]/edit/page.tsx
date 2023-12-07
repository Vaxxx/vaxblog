import React from 'react';
import {UpdateCategory} from "@/lib/action";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import ProgressButton from "@/components/ui/progress-button";
import prisma from "@/lib/prisma";

const UpdateCategoryPage = async({params} : {params: {id: string}}) => {
    const id = params.id;
    console.log(id);
    const data = await prisma.category.findUnique({
        where: {id}
    })
    const updateCategoryWithId = UpdateCategory.bind(null, id);

    return (
       <>
           <Card className={"w-full"}>
               <CardHeader>
                   <CardTitle className={"flex justify-between"}>
                       <h2>Update Category</h2>
                       <Link href={"/user/category/"} className={"btn inline-flex px-2 text-sm rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-100"}>
                           <IoArrowBackCircleOutline size={20} className={"space-x-2"}/>Categories</Link>
                   </CardTitle>
                   <CardContent>
                       <form action={updateCategoryWithId}>
                           <div className={"my-2"}>
                               <Label htmlFor="title">Enter Title</Label>
                               <Input type={"text"} name={"title"} id={"title"} placeholder={"title..."} defaultValue={data?.title!} />
                           </div>
                           <div className={"my-4"}>
                               <Label htmlFor="description">Enter Description</Label>
                               <Textarea placeholder={"description"} name={"description"} defaultValue={data?.description!} />
                           </div>
                           <div>
                               {/*<Button variant={"outline"} type={"submit"} className={"px-3"}>*/}
                               {/*    <MdDataSaverOn size={20}/>*/}
                               {/*    Save Category</Button>*/}
                               <ProgressButton  props={"Update Category"}/>
                           </div>
                       </form>
                   </CardContent>
               </CardHeader>
           </Card>
       </>
    );
};

export default UpdateCategoryPage;
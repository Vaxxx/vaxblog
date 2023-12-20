import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {MdAddCircle} from "react-icons/md";
import {Category, columns } from "./columns"
import {CategoryTable} from "@/components/ui/category-table"


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea";
import {CreateCategory} from "@/lib/action";
import LoadingButton from "@/components/ui/loading-button";

async function getCategories(): Promise<Category[]>{
    ///no-store ---> means no caching at all
    const res = await fetch("http://localhost:3000/api/category/desc",
        {cache: "no-store"}
        )
    const data =  await res.json();
    return data.categories
}
const CategoryPage = async () => {
    const data = await getCategories();

    return (
        <Card className={"w-full"}>
            <CardHeader>
                <CardTitle className={"flex justify-between"}>
                    <h2>Categories</h2>
                    <Link href={"/user/category/add"} className={"btn inline-flex px-2 text-sm rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-100"}>
                        <MdAddCircle size={20} className={"space-x-2"}/>Add Category</Link>

                </CardTitle>
                <CardContent> 
                    <CategoryTable columns={columns} data={data} />
                </CardContent>
            </CardHeader>
        </Card>
    );
};

export default CategoryPage;
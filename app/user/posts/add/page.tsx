"use client";
import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import ProgressButton from "@/components/ui/progress-button";
import Image from "next/image";
import {UploadButton, UploadDropzone, Uploader} from "@/lib/uploadthing";
import {useForm} from "react-hook-form";
import {Pencil} from "lucide-react";
import {CreatePost, getAllCategories} from "@/lib/action";
import {zodResolver} from "@hookform/resolvers/zod";
import {postSchema, PostSchemaType} from "@/lib/validation/post-validation";
import {useSession} from "next-auth/react";
import {MultiSelect} from "react-multi-select-component";
import {toast} from "react-toastify";
import useMount from "@/hooks/useMount";


const AddPostPage = () => {
    const {data: session} = useSession();
    // console.log(session?.user )
     //console.log("id:")
     console.log(session?.user.id)



    const [imageUrl, setImageUrl] = useState("");
    const {handleSubmit, register, reset} = useForm();
//  combo box details
    const [selected, setSelected] = useState([]);
    const [catOptions, setCatOptions] = useState<any>();
    //initialize mount
    const mount = useMount();

    //get categories
    useEffect(() => {
        (async() => {
           const response = await fetch("/api/category",{
               cache: "no-store"
           });
           let {categories} = await response.json();

           let parsedCats = categories.map((cat:any) => {
               return{
                   value: cat.id,
                   label: cat.title
               }
           })
            setCatOptions(parsedCats);
        })()
    },[])



    //default values for the form
    const form = useForm<PostSchemaType>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
             image: "",
             userId: "",
            selected: {
                label: "",
                value: ""
            }
        }
    })


    const PostSubmit = async(data: PostSchemaType) => {
        console.log("Good byeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
         data.image = imageUrl as string;
        data.userId = session?.user.id as string;
        data.selected =  selected  as any;
        if(data.image === '') {
            toast.error("Please upload an image.")
        }else if(Object.keys(data.selected).length === 0 ){
                toast.error("Please select at least one category.")
        }
        else{
            await CreatePost(data);
            setTimeout(function(){
                toast.success("Post added successfully!")
            }, 2000);
        }
    }

 if(!mount) return null;

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

                        <form onSubmit={form.handleSubmit((data) => PostSubmit(data))}>
                           {/*title details*/}
                            <div className={"my-2"}>
                                <Label htmlFor="title">Enter Title</Label>
                                <Input {...form.register("title")} type="text" name={"title"} id={"title"} placeholder="Title..." />
                            </div>

                            {/*Content details*/}
                            <div className={"my-4"}>
                                <Label htmlFor="content">Enter Post Content</Label>
                                <Textarea {...form.register("content")} id="content" placeholder={"Content...."} name={"content"}/>
                            </div>

                            {/*Image details*/}
                            <div className="sm:col-span-2">
                                <label htmlFor={"courseImage"}>
                                    Choose an  Image
                                </label>
                                {imageUrl && (
                                    <button onClick={() => setImageUrl("")}
                                            type={"button"} className={"flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"}>
                                        <Pencil className={"w-5 h-5"}/><span>Change Image</span>
                                    </button>
                                )}
                                {imageUrl ? (
                                    <Image src={imageUrl} alt={"Course Image"} width={"1000"} height={"667"}
                                           className={"w-full h-100 object-cover"}/>
                                ): (
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res: any) => {
                                            // Do something with the response
                                            console.log("Files: ", res[0].url);
                                            setImageUrl(res[0].url)
                                            alert("Upload Completed");
                                        }}
                                        onUploadError={(error: Error) => {
                                            // Do something with the error.
                                            console.log (`ERROR! ${error.message}`);
                                        }}
                                    />
                                )}
                            </div>

                            {/*Categories details*/}
                            <div className={"my-3"}>
                                <Label htmlFor={"Select"}>Select one or more Category
                                </Label>
                                {/*<pre>{JSON.stringify(selected)}</pre>*/}
                                {catOptions ?
                                    <MultiSelect className={"text-gray-700 hover:bg-gray-900"}
                                                 options={catOptions} value={selected}
                                                 labelledBy={"Select"} onChange={setSelected}/>
                                    : null}
                            </div>

                            {/*Submit details*/}
                            <div className={"my-3"}>
                                <ProgressButton  props={"Save Category"}/>
                            </div>
                        </form>
                    </CardContent>
                </CardHeader>
            </Card>
        </>
    );
};

export default AddPostPage;
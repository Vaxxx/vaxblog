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


const options:any = [];
const populateCombo = () => {
    try{

        getAllCategories()
            .then((category: any) => {
                    category.map((val: any, i: number) => {
                        // console.log("Val: ",val.id)
                        options.push({"label" : val.title, "value": val.id })
                    })
                }
            )

    }catch(error: any){
        console.log("Category UseEffect ERROR: " + error);
    }
}


const AddPostPage = () => {
    const {data: session} = useSession();
    // console.log(session?.user )
     console.log("id:")
     console.log(session?.user.id)



    const [imageUrl, setImageUrl] = useState("");
    const {handleSubmit, register, reset} = useForm();
//  combo box details
    const [selected, setSelected] = useState([]);

    const form = useForm<PostSchemaType>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
             image: "",
             userId: "",
            selected: ""
        }
    })


    const PostSubmit = async(data: PostSchemaType) => {
        console.log("Good byeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        data.image = imageUrl as string;
        data.userId = session?.user.id as string;
        data.selected = JSON.stringify(selected);
          await CreatePost(data);
    }


    ///combo box features
    //populate all categories into the combo box
    /*
    useEffect(() => {
        console.log("got here")
        try{
            setIsLoading(true);
            getAllCategories()
                .then((category: any) => {
                        console.log("Category details")
                        console.log(category)
                        // setValues(category)
                    category.map((val: any, i: number) => {
                        // console.log("Val: ",val)
                        console.log("Val: ",val.id)
                        // console.log("i: ",i)
                        // console.log("underline")
                        // console.log(i)
                        // console.log("VAL[i].title", val[i].title);
                        // console.log("VAL[i]", val[i]);


                        options.push({"label" : val.title, "value": val.id })
                    })
                    }
                   )

         }catch(error: any){
             console.log("Category UseEffect ERROR: " + error);
         }finally {
             setIsLoading(false);
        }
        console.log("Then ened")
    },[]);
  */

    useEffect(() => {
        populateCombo();
    })

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
                            <div className={"my-2"}>
                                <Label htmlFor="title">Enter Title</Label>
                                <Input {...form.register("title")} type="text" name={"title"} id={"title"} placeholder="Title..." />
                            </div>

                            <div className={"my-3"}>
                                <Label htmlFor={"Select"}>Select one or more Category
                                </Label>
                                {/*<pre>{JSON.stringify(selected)}</pre>*/}
                                <MultiSelect className={"text-gray-700 hover:bg-gray-900"}
                                   options={options}  value={selected}
                                             labelledBy={"Select"} onChange={setSelected}/>
                            </div>


                            <div className={"my-4"}>
                                <Label htmlFor="content">Enter Post Content</Label>
                                <Textarea {...form.register("content")} id="content" placeholder={"Content...."} name={"content"}/>
                            </div>
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
                                    <UploadDropzone
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
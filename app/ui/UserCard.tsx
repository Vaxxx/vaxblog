"use client"
import React, {useEffect} from 'react';
import {User} from "@prisma/client";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {createUserSchema, CreateUserType} from "@/lib/validation/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button";
import Link from "next/link";

// const UserCard = ({user}: User) => {
const UserCard = () => {
    const router = useRouter();
    const session = useSession();
    const form = useForm<CreateUserType>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: '',
            username: "",
            email: "",
            password: ""
        }
    });

    //redirect to dashboard
    useEffect(() => {

        if(session?.status === 'authenticated'){
            router.push("/dashboard")
        }
    })

    async function handleSubmit(values: CreateUserType){
        //console.log(values.name);
        // alert(JSON.stringify(values));
        try{
           fetch("/api/register", {
               method: "POST",
               body: JSON.stringify(values),
               cache: "no-store",
               headers: {
                   "Content-Type" : "application/json"
               }
           })
               .then((callback) => {
                   if(callback?.ok){
                       router.refresh();
                       toast.success("Registration is successful!")
                   }
                   if(!callback?.ok) throw new Error("Registration failed");
               })
            router.push("/login");
         }catch(error: any){
             console.log("USER CARD ERROR: " + error);
         }
    }

    return (
        <>
            <div className="grid grid-cols-7 gap-4">
                <div className="col-start-3 col-span-4 my-2">
                     <Card>
                         <CardHeader>
                             <CardTitle className={"text-center text-2xl"}>Register User</CardTitle>
                         </CardHeader>
                         <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">

                                        <FormField control={form.control} name={"name"} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Enter Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={"John Doe"} {...field}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name={"username"} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Enter Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={"doe"} {...field}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name={"email"} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Enter Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type={"email"} placeholder={"johndoe@mail.com"} {...field}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name={"password"} render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Enter Password</FormLabel>
                                                <FormControl>
                                                    <Input type={"password"} placeholder={"**********"} {...field}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                        />
                                        <LoadingButton type={"submit"} loading={form.formState.isSubmitting}>
                                            Register User
                                        </LoadingButton>
                                    </form>
                                </Form>
                         </CardContent>
                         <CardFooter className="flex justify-end">
                             <Link href={"/login"}>Already have an account? Sign In here</Link>

                         </CardFooter>
                     </Card>
                </div>
            </div>
        </>
    );
};

export default UserCard;
"use client";
import React, {useEffect} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {CreateUserType, loginSchema, LoginSchemaType} from "@/lib/validation/user";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {toast} from "react-toastify";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa6";

const LoginPage = () => {

    const router = useRouter();
    const session  = useSession();

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    useEffect(() => {

        if(session?.status === 'authenticated'){
            router.push("/user/dashboard")
        }
    })

    async function handleSubmit(values: LoginSchemaType) {
        // console.log(values);
        // alert(JSON.stringify(values));
        try{
           await signIn("credentials", {
               ...values,
               redirect: false
           }).then((callback) => {
               if(callback?.error){
                   console.log("Something is wrong: " + callback.error);
                   toast.error("Something went wrong! " + callback.error);
               }else if(callback?.ok && !callback?.error){

                   router.refresh();
                   toast.success("Login is Successful!");
                   router.push("/user/dashboard");
               }
           })
         }catch(error: any){
             console.log("Login page ERROR: " + error);
         }

    }

    return (
        <div className="grid grid-cols-7 gap-4">
            <div className="col-start-3 col-span-4 my-3 rounded-md">
                <Card>
                    <CardHeader>
                        <CardTitle className={"text-center text-lg"}>Login Here &darr; </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">

                                <FormField control={form.control} name={"email"} render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Enter Email Address</FormLabel>
                                        <FormControl>
                                            <Input type={"email"} placeholder={"john@mail.com"} {...field}/>
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
                                    Sign In
                                </LoadingButton>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="grid grid-rows-2 place-items-center ">
                        <Button onClick={() => signIn("google", {callbackUrl: "/user/dashboard"}) }
                                className={"gap-2 bg-white text-gray-800 hover:text-gray-100 hover:bg-red-700 my-2 border border:bg-red-700"}>
                            <FcGoogle size={25}/> Sign In With Google
                        </Button>
                        {/*<Button onClick={() => signIn("github", {callbackUrl: "/user/dashboard"}) }*/}
                        {/*        className={"bg-slate-800 dark:bg-slate-600 dark:text-gray-900 hover:bg-slate-950 dark:hover:bg-slate-700 gap-2 my-2"}>*/}
                        {/*    <FaGithub size={25}/> Sign In With Github*/}
                        {/*</Button>*/}
                        <Link href={"/register"} className={"hover:underline dark:hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"}>Don't have an account? Sign Up here</Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
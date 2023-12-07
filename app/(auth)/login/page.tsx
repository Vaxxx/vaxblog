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
                    <CardFooter className="flex justify-end hover:underline">
                        <Link href={"/register"}>Don't have an account? Sign Up here</Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
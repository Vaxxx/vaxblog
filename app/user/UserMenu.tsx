"use client"
import React, {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {MdLogout, MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import {signOut, useSession} from "next-auth/react";
import useMount from "@/hooks/useMount";
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
import {GiHamburgerMenu} from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import {menuItems} from "@/app/user/UserSidebar";
import {IoCloseCircleSharp} from "react-icons/io5";



const UserMenu = () => {
    const pathname = usePathname();
    const mount = useMount();
    const router = useRouter();
    const session = useSession();

    console.log(session.data?.user.role)


    useEffect(() => {

        if(session.data?.user.role !== 'basic'){
            router.push("/")
        }
    })
    if(!mount) return null
    else {
    return (
       <>
           <div className={"p-1 bg-gray-300 flex justify-start"}>

               <div className={"flex justify-between -mt-20  rounded "}>
                   <h3 className={"text-bold text-2xl capitalize underline py-3"}>{pathname.split("/").pop()}</h3>


                   {/*<div className={"flex align-center gap-20"}>*/}
                   {/*    <div className={"flex justify-end justify-items-end align-end gap-5 ml-[100px] p-3 rounded relative float-right"}>*/}
                   {/*        <MdSearch className={"absolute mt-3"} size={18}/>*/}
                   {/*        <Input placeholder={"Search..."} className={"transparent border"}/>*/}
                   {/*    </div>*/}
                   {/*</div>*/}
               </div>
           </div>
           <div className={"p-1 bg-gray-300 flex justify-start block md:hidden"}>
               <div className={"flex items-center flex-col gap-2"}>
                   <Image className={"rounded-2xl object-cover w-full"}
                          src={session?.data?.user?.image === null ? "/images/placeholder.jpg": session.data?.user.image!}
                          alt={"user"} width={"50"} height={"30"}/>
                   <span className={"font-bold text-lg text-slate-500"}> {session?.data?.user?.name}</span>
                   <span className={"text-sm text-slate-500"}>{session?.data?.user?.email}</span>
               </div>
               <ul className={"text-slate-700 my-2"}>
                   <li className={"text-lg underline text-bold mt-2"}>Menu</li>
                   {menuItems.map((cat) => (
                       <Link href={cat.path} key={cat.title}>
                           <span className={"flex flex-row gap-2 hover:underline"}><span>{cat.icon}</span>{cat.title}</span>
                       </Link>
                   ))}
               </ul>
           </div>
       </>
    );
    }
};

export default UserMenu;
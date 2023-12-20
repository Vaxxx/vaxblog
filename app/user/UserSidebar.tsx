"use client";
import React from 'react';
import {AiFillDashboard} from "react-icons/ai";
import {MdCategory, MdLogout} from "react-icons/md";
import {BsFilePost} from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";


export const menuItems = [
    {
        title: "Dashboard",
        path:  "/user/dashboard",
        icon:  <AiFillDashboard/>
    },
    {
        title: "Categories",
        path: "/user/category",
        icon: <MdCategory/>
    },
    {
        title:"My Posts",
        path: "/user/posts",
        icon: <BsFilePost/>
    }
]
const UserSidebar = () => {
    const session = useSession();
    console.log("SESSSION:")
    console.log(session.data?.user.image)
    return (
           <div className={"top-[40px] h-screen"}>
               <div className={"flex items-center flex-col gap-2"}>
                   <Image className={"rounded-2xl object-cover w-full"} src={session?.data?.user?.image === null ? "/images/placeholder.jpg": session.data?.user.image!}
                          alt={"user"} width={"100"} height={"50"}/>
                       <span className={"font-bold text-lg text-slate-500"}>{session?.data?.user?.name}</span>
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
               <button onClick={()=>signOut()}
                   className={"btn bg-red-600 hover:bg-red-400 p-2 mt-10 cursor-pointer rounded-lg w-full bottom-0"}>
                   <MdLogout size={20}/>Logout
               </button>
           </div>
    );
};

export default UserSidebar;
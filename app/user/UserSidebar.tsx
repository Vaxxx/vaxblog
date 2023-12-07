import React from 'react';
import {AiFillDashboard} from "react-icons/ai";
import {MdCategory, MdLogout} from "react-icons/md";
import {BsFilePost} from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";


const menuItems = [
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
    return (
        <>

           <div className={"sticky top-[40px]"}>
               <div className={"flex items-center flex-col gap-2"}>
                   <Image className={"rounded-2xl object-cover w-full"} src={"/images/placeholder.jpg"}
                          alt={"user"} width={"100"} height={"50"}/>
                       <span className={"font-bold text-lg text-slate-500"}>Simon Cowell</span>
                       <span className={"text-sm text-slate-500"}>simon@mail.com</span>

               </div>
               <ul className={"text-slate-700 my-2"}>
                   <li className={"text-lg underline text-bold mt-2"}>Menu</li>
                   {menuItems.map((cat) => (
                       <Link href={cat.path} key={cat.title}>
                           <span className={"flex flex-row gap-2 hover:underline"}><span>{cat.icon}</span>{cat.title}</span>
                       </Link>
                   ))}
               </ul>
               <button className={"btn bg-red-600 hover:bg-red-400 p-2 mt-10 cursor-pointer rounded-lg w-full"}>
                   <MdLogout size={20}/>Logout
               </button>
           </div>
        </>
    );
};

export default UserSidebar;
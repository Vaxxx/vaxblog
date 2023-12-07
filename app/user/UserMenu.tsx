"use client"
import React, {useEffect} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import {useSession} from "next-auth/react";

const UserMenu = () => {
    const pathname = usePathname();

    const router = useRouter();
    const session = useSession();
    console.log(session.data?.user.role)
    useEffect(() => {

        if(session.data?.user.role !== 'basic'){
            router.push("/")
        }
    })

    return (
        <div className={"p-1 bg-gray-300"}>
          <div className={"flex justify-between -mt-20  rounded "}>
              <h3 className={"text-bold capitalize underline py-3"}>{pathname.split("/").pop()}</h3>


              <div className={"flex align-center gap-20"}>
                  <div className={"flex justify-end justify-items-end align-end gap-5 ml-[100px] p-3 rounded relative float-right"}>
                      <MdSearch className={"absolute mt-3"} size={18}/>
                      <Input placeholder={"Search..."} className={"transparent border"}/>
                  </div>
              </div>
          </div>
        </div>
    );
};

export default UserMenu;
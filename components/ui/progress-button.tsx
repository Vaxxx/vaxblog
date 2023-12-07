"use client"
import React from 'react';
import { useFormStatus } from "react-dom";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const ProgressButton = ({props}: {props: string}) => {

    const {pending} = useFormStatus();
    return (
        <>
           <Button disabled={pending}>
               {pending ?
                   <Image src={"/loading.gif"} alt={"loading..."} width={"15"} height={"15"} className={"w-10 h-10 shadow"}/>
                   : props}
           </Button>
        </>
    );
};

export default ProgressButton;
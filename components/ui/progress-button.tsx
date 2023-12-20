"use client"
import React from 'react';
import { useFormStatus } from "react-dom";
import {Button} from "@/components/ui/button";
import Image from "next/image";
interface ProgressButtonProps {
    props: string;
    clickFunction?: () => void;
}
const ProgressButton = ({props, clickFunction}: ProgressButtonProps) => {

    const {pending} = useFormStatus();
    return (
        <>
           <Button disabled={pending} type={"submit"} onClick={clickFunction}>
               {pending ?
                   <Image src={"/loading.gif"} alt={"loading..."} width={"15"} height={"15"} className={"w-10 h-10 shadow"}/>
                   : props}
           </Button>
        </>
    );
};

export default ProgressButton;
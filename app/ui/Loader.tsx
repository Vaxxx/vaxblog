import React from 'react';
import Image from "next/image";

const Loader = () => {
    return (
        <>
          <Image src={"/loader.gif"} alt={"loading..."} className={"w-10 h-10 shadow"} width={"10"} height={"10"}/>
        </>
    );
};

export default Loader;
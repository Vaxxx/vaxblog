import React from 'react';
import Link from "next/link";
import {Home} from "lucide-react";

const NotFound = () => {
    return (
        <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter center md:text-4xl">
                   OOPS! Page not found
                </h1>
            </div>
            <div className="flex gap-4">
                <Link
                    href={"/"}
                >
                   <Home size={25}/> Back to Home
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
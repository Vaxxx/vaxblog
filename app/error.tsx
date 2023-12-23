"use client";
import React from 'react';
import Link from "next/link";
import {Home} from "lucide-react";

const Error = () => {
    return (
        <main  className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                <div className="flex max-w-[980px] flex-col items-start gap-2">
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tighter center md:text-4xl">
                        OOPS! Sorry... An error has occurred.
                    </h1>
                    <p className="max-w-[700px] text-lg text-muted-foreground">
                        It could be our fault. We are looking for approaches to avoid this in the
                        future.
                    </p>
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

export default Error;
"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {BiSolidDashboard} from "react-icons/bi";
import {MdClose} from "react-icons/md";
import ThemeButton from "@/components/ui/ThemeButton";
import {signOut, useSession} from "next-auth/react";
const Navbar = () => {
    const {data: session} = useSession();
    return (
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/*Mobile menu button */}
                            <button type="button"
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                {/*Icon when menu is closed.*/}

                                {/*Menu open: "hidden", Menu closed: "block"*/}

                                <BiSolidDashboard className={"block h-6 w-6"} size={30} aria-hidden={"true"}/>
                                {/*Icon when menu is open.*/}

                                {/*Menu open: "block", Menu closed: "hidden"*/}
                                <MdClose size={30} className={"hidden h-6 w-6"} aria-hidden={"true"}/>

                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href={"/"} className={"flex flex-row"}>
                                    <Image className="h-8 w-auto"
                                           src="/whiteLogo.svg" width={"60"} height={"60"}
                                           alt="CSI"/>
                                    <span className={"pl-1 transition duration-500 ease-in-out text-gray-100 hover:text-gray-200 transform hover:-translate-y-1 hover:scale-110"}>VAX Blog</span>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {/*Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"  */}

                                    <Link href="/about"
                                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</Link>
                                    <Link href="/posts"
                                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Posts</Link>
                                    <Link href="/category"
                                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Category</Link>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/*Start Theme*/}
                            <ThemeButton/>
                            {/*End Theme*/}
                            {/*Profile dropdown */}
                            <div className="relative ml-3">
                                {!session?.user ? (
                                    <>
                                        {/*no authentication*/}
                                        <div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Image
                                                        className={"h-10 w-10 rounded-full"}
                                                        src={"/images/placeholder.jpg"} alt={"user"} width={"40"} height={"40"}/>
                                                </PopoverTrigger>
                                                <PopoverContent className={"w-100"}>
                                                    <div className={"grid gap-4"}>
                                                        <Link href="/login" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                                                              tabIndex={-1} id="user-menu-item-1">Sign In</Link>
                                                        <Link href="/register" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                                                              tabIndex={-1} id="user-menu-item-2">Sign Up</Link>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        {/*/////no authentication*/}
                                    </>
                                ): (
                                    <>
                                        {/*authenticated user*/}
                                        <div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    {
                                                        !session?.user?.image ?
                                                            <button className={"p-2 bg-gray-500 hover:bg-slate-700 border border-slate-800 rounded-full"}>
                                                                {session?.user?.name?.split(' ').map(name => name[0]).join('').toUpperCase()}
                                                            </button>

                                                            :
                                                            <Image
                                                                className={"h-10 w-10 rounded-full"}
                                                                src={session?.user?.image!} alt={session.user.name!} width={"40"} height={"40"}/>
                                                    }
                                                </PopoverTrigger>
                                                <PopoverContent className={"w-100"}>
                                                    <div className={"grid gap-4"}>
                                                        <Link href="/user/dashboard" className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-500 hover:text-slate-800" role="menuitem"
                                                              tabIndex={-1} id="user-menu-item-1">Dashboard</Link>
                                                        <button onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-50 bg-red-800" role="menuitem"
                                                                tabIndex={-1} id="user-menu-item-2">Sign out</button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        {/*///authenticated user*/}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/*Mobile menu, show/hide based on menu state */}
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {/*Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"*/}

                        <Link href="/about"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">About</Link>
                        <Link href="/posts"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Posts</Link>
                        <a href="/category"
                           className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Category</a>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;

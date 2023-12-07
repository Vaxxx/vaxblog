import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {FcAbout} from "react-icons/fc";
import {BsFilePost} from "react-icons/bs";
import {BiSolidCategory} from "react-icons/bi";
import {TbLogin2} from "react-icons/tb";
import {GrLogin} from "react-icons/gr";
import SocialNetwork from "@/app/ui/social-network";

const Footer = () => {
    return (
        <>
            <div className="bg-gray-800 text-white">
                <h2 className={"text-center text-lg text-bold"}> Create Software International</h2>
                <footer className={"footer p-10 bottom-0 bg-neutral text-neutral-content mt-1"}>
                    <div className="grid md:grid-cols-3 gap-3">
                        <aside >
                            <Image src={"/whiteLogo.svg"} alt={"CSI"} width={"50"} height={"50"} className={"fill-current place-items-center align-center"}/>
                            <h2 className={"text-2xl underline transition duration-500 ease-in-out text-gray-100 hover:text-gray-200 transform hover:-translate-y-1 hover:scale-110"}>Vax Blog</h2>
                            <p>We provide latest information trending in the Information Technology sphere.</p>
                            <p>Always stay in touch to get all the juicy IT gist.</p>
                        </aside>
                        <ul className="flex flex-col gap-2">
                            <li className="mr-6 flex flex-row gap-3">
                                <FcAbout size={20}/>
                                <Link className="text-blue-500 hover:text-blue-800" href="/about">About</Link>
                            </li>
                            <li className="mr-6 flex flex-row gap-3">
                                <BsFilePost size={20}/>
                                <Link className="text-blue-500 hover:text-blue-800" href="/posts">Posts</Link>
                            </li>
                            <li className="mr-6 flex flex-row gap-3">
                                <BiSolidCategory size={20}/>
                                <Link className="text-blue-500 hover:text-blue-800" href="/category">Category</Link>
                            </li>
                            <hr className={"text-gray-50 text-xs w-[150px]"} />
                            <li className="mr-6 flex flex-row gap-3">
                                <GrLogin size={20}/>
                                <Link className="text-blue-500 hover:text-blue-800" href="/login">
                                   Login
                                </Link>
                            </li>
                            <li className="mr-6 flex flex-row gap-3">
                                <TbLogin2 size={20}/>
                                <Link className="text-blue-500 hover:text-blue-800" href="/register">
                                   Register
                                </Link>
                            </li>
                        </ul>
                        <nav>
                        <header className={"footer-title"}>Social</header>
                        <div>
                             <SocialNetwork/>
                        </div>
                    </nav>
                    </div>
                </footer>
                <h2 className={"text-center text-sm text-bold mt-1 pb-1"}>Copyright © 2023 - All right reserved</h2>
            </div>
        </>
    );
};

export default Footer;
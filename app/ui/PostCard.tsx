import React from 'react';
import Image from "next/image";
import {Button, buttonVariants} from "@/components/ui/button";
import {RiMore2Fill, RiMoreFill} from "react-icons/ri";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Post} from "@prisma/client";
import Link from "next/link";

interface PostProps{
    post: Post;
}

const PostCard = ({post}: PostProps) => {
    return (
        <>
           <Link href={`/post/${post.id}`}>
               <div className="max-w-5xl m-3 p-2 rounded-lg shadow-lg mb-3">
                   <Image src={post.image ?? "/images/blank.jpg"} className="w-full rounded-lg"
                          width={"400"} height={"150"} alt={post.title}/>
                   <div className="px-6 py-4">
                       <div className="font-bold text-xl mb-2 hover:underline">{post.title}</div>
                       <p className="text-gray-700 text-base hover:underline">

                           {post.content.length < 300 ?  post.content : post.content.slice(0,300) + " ..."}
                       </p>
                       <Link href={`/post/${post.id}`}
                          className={buttonVariants({
                              variant: "outline", className: "navLink float-right mb-2 rounded-lg", size: "lg"
                          })}
                       >Read More</Link>
                   </div>
                   {/*<div className={"flex justify-between flex-row px-6"}>*/}
                   {/*    <Button variant={"secondary"} className={"text-sm"}>Read More<RiMoreFill size={15}/></Button>*/}
                   {/*    <Avatar className={"bg-none"}>*/}
                   {/*        <AvatarImage src="/images/placeholder.jpg" />*/}
                   {/*        <AvatarFallback>CN</AvatarFallback>*/}
                   {/*    </Avatar>*/}
                   {/*</div>*/}
                   {/*<div className="px-6 py-4">*/}
                   {/*    {post?.categories! === '' ?*/}
                   {/*        <span*/}
                   {/*            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>*/}

                   {/*        :*/}
                   {/*        <span*/}
                   {/*            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>*/}

                   {/*    }*/}
                   {/*     <span*/}
                   {/*        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>*/}
                   {/*    <span*/}
                   {/*        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>*/}
                   {/*</div>*/}
               </div>
           </Link>
        </>
    );
};

export default PostCard;
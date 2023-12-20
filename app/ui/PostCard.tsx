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
                       <Button
                          className={buttonVariants({
                              variant: "outline", className: "navLink float-right mb-2 rounded-lg", size: "lg"
                          })}
                       >Read More</Button>
                   </div>

               </div>
           </Link>
        </>
    );
};

export default PostCard;
import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getAllCommentsByPost, getPostById, getUserDetails, postCommentsCount} from "@/lib/action";
import CommentCard from "@/app/ui/CommentCard";
import {getServerSession} from "next-auth";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {authOptions} from "@/auth";

const SinglePostPage = async ({params} : {params: {id: string}}) => {
    const id = params.id;
   // console.log("USERID: ", id);
    // console.log("USER: ", user)
    const post = await getPostById(id);
    // console.log("Post page id: ")
    // console.log(post.userId)
    //  console.log(post)
  const userDetails = await getUserDetails(post.userId);
//     console.log(userDetails)
//    console.log("Inside our shop")
   // console.log(getUserDetails("clp9gme5b0000w1shdupe2ep3"))

    //get all comments
    const comments = await getAllCommentsByPost(id);
    console.log("All comments: ")
    console.log(comments);
    //get all comments count
    const commentCount = await  postCommentsCount(id);

    //get current user status
    const currentUser = await getServerSession(authOptions);
    console.log("current user")
    console.log(currentUser)
    console.log("current user ID")
    console.log(currentUser?.user.id)





    // @ts-ignore
    return (
        <div className="container mx-auto">
                {/*place post content*/}
                <div className={"my-1"}>
                    <Card className="w-full">
                         <CardHeader>
                             <CardTitle>
                                 {post.title}
                             </CardTitle>
                         </CardHeader>
                        <CardContent>
                            <Image src={post.image ?? "/images/placeholder.jpg"} alt={post.title}
                                   width={"1000"} height={"600"}/>
                            <p className={"mt-2"}>
                                {post.content}
                            </p>
                            <p className={"block"}></p>
                            <p className={"float-right"}>
                                {userDetails.image !== "" ?
                                    <div className={"grid grid-cols-2 float-right"}>
                                        <div>
                                            <Image src={userDetails.image} alt="User" width="50" height="50" className="rounded-full" />
                                        </div>
                                        <div>
                                            <div className={"grid grid-rows-3 gap-2"}>
                                                <div><h2 className={"text-sm block"}>Written by: </h2></div>
                                                <div><p className={"text-xs font-italic"}>{new Date(userDetails.updatedAt).toISOString().substring(0,10)}</p></div>
                                                <div><h2 className={"text-lg"}>{userDetails.name}</h2></div>
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    <div className={"grid grid-cols-2 float-right"}>
                                        <div>
                                            <Image src={"/images/placeholder.jpg"} alt="User" width="50" height="50" className="rounded-full" />
                                        </div>
                                        <div>
                                            <div className={"grid grid-rows-3 gap-2"}>
                                                <div><h2 className={"text-sm block"}>Written by: </h2></div>
                                                <div><p className={"text-xs"}>{new Date(userDetails.updatedAt).toISOString().substring(0,10)}</p></div>
                                                <div><h2 className={"text-lg"}>{userDetails.name}</h2></div>
                                            </div>
                                        </div>
                                    </div>

                                   }
                                {/*      ' <Image*/}
                                {/*      src={"/images/placeholder.jpg"} alt={"User Details"} width={"50"} height={"50"}/>}*/}
                                {/*{getUserDetails(post.userId) === null ? 'Empty' : "is not empty" }*/}
                            </p>
                        </CardContent>
                        <hr className={"text-white h-3"}/>
                        <CardFooter className={"my-4 mt-5 grid grid-rows-4 gap-3"}>
                            {
                                currentUser?.user.id !== undefined ?
                                    <CommentCard post={post} userId={currentUser?.user?.id as string} commentLength={Number(commentCount)}/>
                                    :
                                    <Link href={"/login"}> <Button type={"button"}>You must be signed in to drop a comment.  <span> Click to Login</span></Button></Link>
                            }

                        </CardFooter>
                    </Card>
                    <div className={"p-2 rounded-lg w-full"}>
                        {
                            comments?.map(async (comment) => {
                                const commentUser = await getUserDetails(comment.userId);

                                return (
                                    <div className={"border m-1 p-2 rounded-lg w-full"}>
                                        <div className={"justify-between gap-2 space-y-3"}>
                                            {
                                                commentUser.image !== ''?
                                                    <Avatar className={"bg-none"}>
                                                        <AvatarImage src={commentUser.image}/>
                                                    </Avatar>
                                                    :
                                                    <Avatar className={"bg-none"}>
                                                        <AvatarImage src="/images/placeholder.jpg"/>
                                                        <AvatarFallback>{commentUser?.name.split(' ').map((name:any)=> name[0]).join('').toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                            }

                                            <div className={"grid grid-rows-2"}>
                                                <p className={"italic text-sm text-gray-600 antialiased"}>
                                                    comment posted
                                                    on: <span>{comment.updatedAt.toISOString().substring(0, 10)}</span>
                                                </p>
                                                <p>
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        </div>
                                        <p className={"pr-2 float-right"}>By Jackie Chan</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
        </div>
    );
};

export default SinglePostPage;
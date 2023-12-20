"use client";
import React from 'react';
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {CreateComment} from "@/lib/action";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import ProgressButton from "@/components/ui/progress-button";
import {Post} from "@prisma/client";

interface CommentCardProps{
    post: Post;
    userId: string;
    commentLength: number;
}

function cleanInput(){

    setTimeout(() => {
        // @ts-ignore
        document.getElementById("commentBox").value= ''
        // router.push(`/post/${id}`);
    })
}
const CommentCard = ({post, commentLength, userId}: CommentCardProps) => {
    const showCommentCard = () => {
        // @ts-ignore
        document.getElementById("commentCard").style.display = 'block';
    }

    return (
        <>
            <div>
                <Button onClick={showCommentCard}
                        title={"Click to add your comment"} className={"gap-4 p-2 rounded-lg bg-red-600 text-white"}>
                    Add your comment<Badge>{commentLength}</Badge>
                </Button>
            </div>
            <div id={"commentCard"} className={""} style={{ display: "none"}}>
                <form action={CreateComment}>
                    <div>
                        <Input type={"hidden"} placeholder={"User ID"} name={"userId"} value={post.userId} />
                    </div>
                    <div>
                        <Input type={"hidden"} placeholder={"User ID"} name={"postId"} value={userId} />
                    </div>
                    <div>
                        <Textarea id={"commentBox"} placeholder={"Write your comment here"} name={"comment"}/>
                    </div>
                    <div  className={"mt-2"}>
                        <ProgressButton clickFunction={cleanInput}  props={"Save Comment"}/>
                        {/*<button*/}
                        {/*   onclick="this.form.reset()"*/}
                        {/*    type={"submit"}>Save Comment</button>*/}
                    </div>
                </form>
            </div>

        </>
    );
};

export default CommentCard;
import PostCard from "@/app/ui/PostCard";
import Image from "next/image";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {BiSolidSkipNextCircle, BiSolidSkipPreviousCircle} from "react-icons/bi";
import {getAllPaginatedPosts} from "@/lib/action";

export default async function Home({searchParams}: {searchParams: {[key:string]:string | string[] | undefined}}) {
    ///pagination
    // const totalItemCount:number = await prisma.post.count();
    const pageSize = 2;
    const page = typeof  searchParams.page === 'string' ? Number(searchParams.page) : 1;
    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 2;

    const posts = await getAllPaginatedPosts(page, limit, pageSize)


    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
                    <div className="col-span-2">
                        {
                            posts?.map((post) => (
                                <PostCard key={post.id} post={post}/>
                            ))
                        }
                        {
                            posts?.length === 0 && (
                                <div className={"col-span-full text-center text-3xl"}>
                                    {"There is currently no posts available."}
                                </div>
                            )
                        }
                        {/*pagination button*/}
                        <div className={"place-self-center items-center float-right space-x-6 my-3 mt-2"}>
                            <Link href={`/?page=${page > 1 ? page - 1 : 1}`}
                                  className={buttonVariants({
                                      variant: "ghost",
                                      className: "navLink rounded",
                                      size: "lg"
                                  })}
                            >
                                <h2><BiSolidSkipPreviousCircle size={30}/>Prev</h2>
                            </Link>
                            <Link href={`/?page=${page + 1}`}
                                  className={buttonVariants({
                                      variant: "ghost",
                                      className: "navLink rounded",
                                      size: "lg"
                                  })}
                            >
                                <h2><BiSolidSkipNextCircle size={30}/>Next</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-1">
                        column of advert
                        <div className="grid grid-row-1 gap-3 mt-5">
                            <div><Image src={"/images/blank.jpg"} alt={"advert"} width={400} height={200}/></div>
                            <div><Image src={"/images/blank.jpg"} alt={"advert"} width={400} height={200}/></div>
                            <div><Image src={"/images/blank.jpg"} alt={"advert"} width={400} height={200}/></div>
                        </div>
                        latest posts
                        <div className={"mt-2 py-2"}>
                            <h2 className={"text-lg antialiased text-center underline"}>Latest Posts</h2>
                            <ul className={"space-y-4"}>
                                <li>This is post 1</li>
                                <li>This is post 2</li>
                                <li>This is post 3</li>
                                <li>This is post 4</li>
                                <li>This is post 5</li>
                            </ul>
                        </div>
                        latest users
                        <div className={"mt-2 py-2"}>
                            <h2 className={"text-lg antialiased text-center underline"}>Latest Users</h2>
                            <ul className={"space-y-4"}>
                                <li>This is User 1</li>
                                <li>This is User 2</li>
                                <li>This is User 3</li>
                                <li>This is User 4</li>
                                <li>This is User 5</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

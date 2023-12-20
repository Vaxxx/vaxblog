import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


const PostPage = async ({length, page}: {length: number, page: number}) => {

    let postLength = length;
    let perPage = 2;
    let totalPage  = Math.ceil(postLength/perPage);

    let generatePaginationNumbers = (page:number, totalPage:number) => {
        let paginationArray = [] ;

        for(let i = +page - 2; i <= +page + 2; i++){
            if(i < 1) continue;
            if(i > totalPage) break;
            paginationArray.push(i);
        }
        return paginationArray;
    };
let generatedNumbers = generatePaginationNumbers(page, totalPage);
    return (
        <>
          <div className="text-center">
              <div className="flex-items justify-center gap-2">
                  {
                      +page - 1 >= 1 && (
                          <Link href={`${process.env.NEXTAUTH_URL}/page=${+page - 1}`}
                                className={"text-2xl text-blue-500 bg-white inline-block gap-1 p-1 rounded-lg border"}
                                >
                              <MdKeyboardArrowLeft size={25}/>
                          </Link>
                  )}

                  {generatedNumbers.map((number)=> (
                      <Link className={`${page==number ? "bg-blue-500 text-white" : "text-blue-500 bg-white"} inline-block py-1 px-3 rounded-lg border hover:border-blue-500`}
                       href={`${process.env.NEXTAUTH_URL}/?page=${number}`}
                      >{number}</Link>
                  ))}

                  {
                      +page + 1 <= totalPage && (
                          <Link href={`${process.env.NEXTAUTH_URL}/?page=${+page + 1}`}
                                className={"text-2xl text-blue-500 bg-white inline-block gap-1 p-1 rounded-lg border"}
                                > <MdKeyboardArrowRight/>  </Link>
                      )
                  }
              </div>
          </div>
        </>
    );
};

export default PostPage;
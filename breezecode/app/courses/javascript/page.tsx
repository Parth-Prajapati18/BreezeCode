"use client"
import CodeEditorWindow from "@/app/Components/CodeEditorWindow";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type pageInfo = {
  totalPages: number,
  currentPage: number,
  previousPage: number
}

const JavaScriptPage: React.FC = () => {

  const [pageInfo, setPageInfo] = useState<pageInfo>({
    totalPages: 10,
    currentPage: 0,
    previousPage: -1
  });

  const [content, setContent] = useState<any>(null);

  let pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      router.push(`${pathname}?chapNumber=${pageInfo.currentPage}`);
      try {
        const response = await axios.get(`/api/courses/Javascript?chapNumber=${pageInfo.currentPage}`);
        const data = response.data;

        setContent(data.chapter);
        setPageInfo(data.pagination);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [pageInfo.currentPage]);

  const handelNext = () => {
    if (pageInfo.currentPage < pageInfo.totalPages) {
      const newPage = Number(pageInfo.currentPage) + 1;
      setPageInfo({
        ...pageInfo,
        currentPage: newPage,
        previousPage: pageInfo.currentPage
      });
    }
  }

  const handelPrevious = () => {
    if (pageInfo.currentPage > 0) {
      const newPage = Number(pageInfo.currentPage) - 1;
      setPageInfo({
        ...pageInfo,
        currentPage: newPage,
        previousPage: pageInfo.currentPage
      });
    }
  }

  return (
    <>
      <div className='top-16 bottom-0 md:grid md:grid-cols-5'>
        <div className='md:col-span-1'></div>
        <div className='md:col-span-3 px-2'>
          <p className="text-lg font-bold text-center">{content?.title}</p>
          <p>{content?.content}</p>
          <div>
            <CodeEditorWindow
              defaultCode={content?.sampleCode}
              language="javascript"
              languageId={63}
            />
          </div>
        </div>
        <div className='md:col-span-1'></div>
      </div>
      <div className="bottom-0 h-14 bg-black flex justify-center items-center text-white w-full">

        <div className="flex justify-between gap-8 text-base">

          <div className="flex hover:scale-105 hover:cursor-pointer"
            onClick={handelPrevious}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
            Previous
          </div>



          <div className="flex hover:scale-105  hover:cursor-pointer text-base"
            onClick={handelNext}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

      </div>
    </>
  );
};

export default JavaScriptPage;

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";

type FileTypes = {
  cid: string;
  created_at: string;
  group_id: string;
  id: string;
  // keyvalues: {};
  mime_type: string;
  name: string;
  number_of_files: number;
  size: number;
};

export default function App() {
  const [fileList, setFileList] = useState<FileTypes[]>([]);
  const [userName, setUserName] = useState("");
  const navigationRouter = useRouter();

  useEffect(() => {
    const folderName = JSON.parse(localStorage.getItem("folderName"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    GetFilesFromFolder(userData?.Organization_Name, folderName);
    setUserName(userData?.dashboard);
  }, []);

  const GetFilesFromFolder = async (orgId: string, folderName: string) => {
    const apiResponse = await fetch(
      `https://dif-pinatrust.onrender.com/files/${orgId}/${folderName}`
    );

    const filesData = await apiResponse.json();
    setFileList(filesData?.files);
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen">
        {/* Sidebar */}

        <aside className="hidden sm:flex sm:flex-col bg-gray-800 w-full sm:w-20">
          {/* Sidebar content */}
          <a
            href="#"
            className="inline-flex items-center justify-center h-20 w-20 bg-gray-800 hover:bg-blue-500 focus:bg-blue-500"
          >
            <svg fill="none" viewBox="0 0 64 64" className="h-12 w-12">
              <title>Company logo</title>
              <path
                d="M32 14.2c-8 0-12.9 4-14.9 11.9 3-4 6.4-5.6 10.4-4.5 2.3.6 4 2.3 5.7 4 2.9 3 6.3 6.4 13.7 6.4 7.9 0 12.9-4 14.8-11.9-3 4-6.4 5.5-10.3 4.4-2.3-.5-4-2.2-5.7-4-3-3-6.3-6.3-13.7-6.3zM17.1 32C9.2 32 4.2 36 2.3 43.9c3-4 6.4-5.5 10.3-4.4 2.3.5 4 2.2 5.7 4 3 3 6.3 6.3 13.7 6.3 8 0 12.9-4 14.9-11.9-3 4-6.4 5.6-10.4 4.5-2.3-.6-4-2.3-5.7-4-2.9-3-6.3-6.4-13.7-6.4z"
                fill="#fff"
              />
            </svg>
          </a>
          <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-600">
            <nav className="flex flex-col mx-4 my-6 space-y-4">
              <a
                href="#"
                className="inline-flex items-center justify-center py-3 rounded-lg"
              >
                <span className="sr-only">Documents</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="White"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </nav>
            <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
              <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                <span className="sr-only">Settings</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-grow text-gray-800 w-full">
          {/* Header */}
          <header className="flex items-center h-20 px-6 sm:px-10 bg-gray-600">
            <button
              onClick={() => navigationRouter.replace("/login")}
              className="block sm:hidden relative flex-shrink-0 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <span className="sr-only">Menu</span>
              {/* <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg> */}
            </button>

            <div className="relative w-full max-w-md sm:-ml-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                role="search"
                placeholder="Search..."
                className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
              />
            </div>

            <div className="flex flex-shrink-0 items-center ml-auto">
              <button className="inline-flex items-center p-2 hover:bg-gray-500 rounded-lg">
                <span className="sr-only">User Menu</span>
                <div className="hidden md:flex md:flex-col md:items-end">
                  <span className="font-semibold sm:text-2xl font-semibold text-white/80 capitalize-first">
                    {userName}
                  </span>
                  {/* <span className="text-sm text-gray-400">{"Organization"}</span> */}
                </div>
                <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
                    alt="user profile photo"
                    className="h-full w-full object-cover"
                  />
                </span>
              </button>
              <div className="border-l pl-3 ml-3 space-x-1">
                <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                  <span className="sr-only">Log out</span>
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </header>
          {/* Main Content */}
          <main className="">
            <div className="flex flex-col sm:flex-row sm:justify-between"></div>
            <div className="min-h-full bg-gray-800">
              <Card
                isBlurred
                className="w-full h-[850px] border-none bg-gray-800 text-white p-8 overflow-y-auto"
                shadow="sm"
              >
                <CardBody>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-400 border-b border-gray-700">
                        <th className="p-4 text-lg">Name</th>
                        {/* <th className="p-4 text-lg">Owner</th> */}
                        <th className="p-4 text-lg">Date</th>
                        {/* <th className="p-4 text-lg">Size</th> */}
                        <th className="p-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileList &&
                        fileList.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-700 transition rounded-lg mb-2"
                          >
                            <td className="flex items-center p-4 space-x-3">
                              {/* <span className="text-3xl">{item.icon}</span> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                              >
                                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                                <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                              </svg>

                              <span className="text-lg">{item?.name}</span>
                            </td>
                            {/* <td className="p-4 text-lg">{item.owner}</td> */}
                            <td className="p-4 text-lg">
                              {moment(item?.created_at).format("MMMM D, YYYY")}
                            </td>
                            {/* <td className="p-4 text-lg">{item.size}</td> */}
                            <td className="p-4">
                              <Button
                                isIconOnly
                                className="data-[hover]:bg-gray-500 bg-gray-600"
                                radius="full"
                                variant="light"
                              >
                                ⋮
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

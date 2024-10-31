"use client";

import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FolderTypes = {
  created_at: string;
  id: string;
  is_public: boolean;
  name: string;
};
export default function EmployeeDashboard() {
  const navigationRouter = useRouter();
  const [folderList, setFolderList] = useState<FolderTypes[]>([]);
  const [userName, setUserName] = useState("");
  const [organizationName, setOrgName] = useState("");

  useEffect(() => {
    // Fetch and load employee-specific data here if needed
    const folderData = JSON.parse(localStorage.getItem("folderData"));
    console.log("Parsed Folder Data:", folderData);
    setFolderList(folderData);
    const userData = JSON.parse(localStorage.getItem("userData"));
    setOrgName(userData?.Organization_Name);
    setUserName(userData?.dashboard);
  }, []);

  const handleFolderClick = async (folderName: string) => {
    localStorage.setItem("folderName", JSON.stringify(folderName));
    const getAccessParams = {
      orgId: organizationName,
      folderName: folderName,
      firstName: "Tushar",
      lastName: "Bhayani",
      department: "Information Technology",
      organizationName: organizationName,
      connectionId: "3337c84b-4208-472d-b4a4-0beba4874be9",
    };
    const options = {
      method: "POST", // HTTP method
      headers: {
        Accept: "*/*", // Accept header
        "Content-Type": "application/json", // Content-Type header
      },
      body: JSON.stringify(getAccessParams), // Convert the data object to a JSON string
    };
    const apiResponse = await fetch(
      `https://dif-pinatrust.onrender.com/access-folder`,
      options
    );
    const folderData = await apiResponse.json();
    if (folderData?.result) navigationRouter.push("/files-dashboard");
  };

  return (
    <>
      <body className="flex bg-gray-800 min-h-screen">
        <aside className="hidden sm:flex sm:flex-col">
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
        <div className="flex-grow text-gray-800">
          <header className="flex items-center h-20 px-6 sm:px-10 bg-gray-600">
            <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
              <span className="sr-only">Menu</span>
              <svg
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
              </svg>
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
              <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
                <span className="sr-only">User Menu</span>
                <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                  <span className="font-semibold sm:text-2xl font-semibold text-white/80 capitalize-first">
                    {userName}
                  </span>
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
                <button
                  onClick={() => navigationRouter.replace("/")}
                  className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
                >
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
          <main className="p-4 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Folders
              </h1>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
              {folderList &&
                folderList.map((folder, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center bg-white p-3 rounded-lg shadow-lg"
                  >
                    <Card
                      shadow="sm"
                      isPressable
                      onPress={() => {
                        handleFolderClick(folder.name.split("-")[1]);
                      }}
                      className="w-full"
                    >
                      <div className="flex items-center justify-between w-full p-4 bg-gray-600 h-[140px] rounded-lg">
                        <CardBody className="p-0 w-[70%] h-full bg-gray-600 rounded-lg"></CardBody>
                      </div>
                      <div className="flex justify-between w-full mt-5 items-center">
                        <p className="text-gray-800 font-semibold mb-2">
                          {folder.name.split("-")[1]}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
            </section>
          </main>
        </div>
        {/* {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm mx-4 sm:mx-0 transform transition-transform duration-300">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                QR Code for {qrValue}
              </h2>

              <div className="flex justify-center items-center mt-6 mb-4">
                <QRCode
                  value={qrValue}
                  size={160}
                  level={"M"}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "160px",
                  }}
                />
              </div>

              <button
                onClick={closeModal}
                className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )} */}
      </body>
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
// import QRCode from "react-qr-code";

type FolderTypes = {
  created_at: string;
  id: string;
  is_public: boolean;
  name: string;
};
export default function OrganizationDashboard() {
  const navigationRouter = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [folderList, setFolderList] = useState<FolderTypes[]>([]);
  const [useName, setUserName] = useState("");
  const [organizationName, setOrgName] = useState("");
  const [did, setDid] = useState("");
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    // Fetch and load employee-specific data here if needed
    const folderData = JSON.parse(localStorage.getItem("folderData"));
    setFolderList(folderData);
    const userData = JSON.parse(localStorage.getItem("userData"));
    setOrgName(userData.Organization_Name);
    setUserName(userData?.dashboard);
  }, []);

  const GiveFolderAccessAccess = async () => {
    const giveAccessParams = {
      orgId: organizationName,
      folderName: folderName,
      email: did,
      firstName: "Tushar",
      lastName: "Bhayani",
      department: "Information Technology",
      organizationName: organizationName,
      expires: new Date(),
      admin: "true",
    };
    const options = {
      method: "POST", // HTTP method
      headers: {
        Accept: "*/*", // Accept header
        "Content-Type": "application/json", // Content-Type header
      },
      body: JSON.stringify(giveAccessParams), // Convert the data object to a JSON string
    };
    const apiResponse = await fetch(
      `https://dif-pinatrust.onrender.com/access`,
      options
    );
    const folderData = await apiResponse.json();
    alert(folderData?.status);
  };

  const handleFolderClick = (folderName: string) => {
    setFolderName(folderName);
    onOpen();
  };

  const handleSubmit = () => {
    GiveFolderAccessAccess();
  };

  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}

      <aside className="hidden sm:flex sm:flex-col bg-gray-800 w-full sm:w-20">
        {/* Sidebar content */}
        <a
          href="#"
          className="inline-flex items-center p-3 justify-center h-20 w-20 bg-gray-600 hover:bg-gray-500 focus:bg-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
        </a>
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <a
              href="#"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Dashboard</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
              onClick={() => {
                navigationRouter.replace("/invoice");
              }}
            >
              <span className="sr-only">Folders</span>
            </a>
          </nav>
          <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
            <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
              <span className="sr-only">Settings</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-grow text-gray-800 w-full">
        {/* Header */}
        <header className="flex items-center h-20 px-6 sm:px-10 bg-gray-800">
          <button
            onClick={() => navigationRouter.replace("/login")}
            className="block sm:hidden relative flex-shrink-0 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <span className="sr-only">Menu</span>
          </button>

          <h1 className="text-xl sm:text-3xl font-semibold text-white/80 capitalize-first">
            {useName}
          </h1>

          <div className="flex flex-shrink-0 items-center ml-auto">
            <button className="inline-flex items-center p-2 hover:bg-gray-500 rounded-lg">
              <span className="sr-only">User Menu</span>
              <div className="hidden md:flex md:flex-col md:items-end">
                <span className="font-semibold text-white/80">
                  {organizationName}
                </span>
                <span className="text-sm text-gray-400 capitalize-first">
                  {useName}
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
                className="relative p-2 text-gray-400 rounded-full"
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
              My Folders
            </h1>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {folderList &&
              folderList.map((folder, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-gray-800 p-3 rounded-lg"
                >
                  <Card
                    shadow="sm"
                    // isPressable

                    // className="w-full"
                  >
                    <div
                      onClick={() => {
                        localStorage.setItem("folderName", JSON.stringify(folder.name.split("-")[1]));
                        navigationRouter.push("/files-dashboard")
                      }}
                      className="flex items-center justify-between w-full h-[140px] rounded-lg"
                    >
                      <CardBody className="p-0 bg-white h-[140px] w-[292px] rounded-lg"></CardBody>
                    </div>
                    <div className="flex justify-between w-full mt-5 items-center">
                      <p className="text-white font-semibold mt-3">
                        {folder.name.split("-")[1]}
                      </p>
                      <div
                        className="cursor-pointer inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to the parent Card
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-600"
                          onClick={() => {
                            handleFolderClick(folder.name.split("-")[1]);
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
          </section>
        </main>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center" // Centering the modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px", // Padding around the modal
          color: "white",
        }}
      >
        <ModalContent
          style={{
            width: "400px", // Set a specific width for better appearance
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            backgroundColor: "#1F2937",
            color: "white",
          }}
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h2 className="text-lg font-bold">Email Address</h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <div></div>
                    // <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  // label="DID"
                  placeholder="Enter your email"
                  // variant="bordered"
                  onChange={(e) => setDid(e.target.value)}
                  className="text-black mt-5 placeholder-gray-400"
                  fullWidth
                />
              </ModalBody>
              <ModalFooter className="flex mt-5 justify-center">
                <Button
                  color="primary"
                  onPress={() => {
                    handleSubmit();
                    onClose();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

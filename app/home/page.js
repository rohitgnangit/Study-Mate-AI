'use client'

import LogoutPopUp from "@/components/LogoutPopUp";
import CustomFileInput from "@/components/CustomFileInput";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation'
import { useState, useEffect } from "react";
import { getFileAction } from "@/actions/getFileAction";


export default function Home() {
  const { data: session } = useSession();
  const [isLogout, setIsLogout] = useState(false)

  const [files, setFiles] = useState([])

  const email = session?.user?.email || "User";
  const user = email.split("@")[0].match(/^[a-zA-Z]+/)[0];
  const name = user.charAt(0).toUpperCase() + user.slice(1);

  if (!session) {
    redirect("/")
  }

  useEffect(() => {
    const fetchFiles = async () => {
      const fileData = await getFileAction();
      setFiles(fileData);
      console.log("Fetched files:", fileData);
    }
    fetchFiles();
  }, [])

  

  return (
    <>
      {isLogout && <LogoutPopUp isLogout={isLogout} setIsLogout={setIsLogout} />}

      <div className="home bg-gray-950 min-h-screen flex">
        {/* Left Container */}
        <div className="left flex flex-col justify-between text-white bg-gray-900 w-1/4 float-left p-5">
          <div className="dashboard py-5 px-2 mt-30">
            <h2 className="py-1.5 px-2 text-gray-400">Saved Files</h2>
            <div className="files flex flex-col gap-1 my-1 py-2 text-gray-200">
              {files.map((file) => (
                <span className="px-2.5 py-2 rounded-lg hover:bg-gray-800 cursor-pointer" key={file._id}>
                  <p className="text-sm" >{file.fileName}</p>
                </span>
              ))}
            </div>
          </div>
          <div className="logout">
            <button onClick={() => { setIsLogout(true) }} className="relative inline-flex items-center justify-center p-[1.5px] overflow-hidden text-xs text-gray-400 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 dark:focus:ring-cyan-800 cursor-pointer my-5">
              <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Logout
              </span>
            </button>
          </div>
        </div>

        {/* Right Container */}
        <div className="right w-full">
          <div className="QA mx-auto w-[70%] min-h-screen flex flex-col justify-center items-center">
            <div className="head border">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                Hello {name}
              </h1>
            </div>
            <div className="inputField flex justify-between items-center h-15 w-full my-10 rounded-2xl border border-slate-500 shadow-sm shadow-blue-200">
              {/* Chat Input */}
              <input type="text" className="outline-none h-full w-[95%] rounded-2xl px-4 text-white" placeholder="ask something ?" />
              {/* Send Button */}
              <div className="send h-10 w-10 flex justify-center items-center rounded-full mr-3">
                <button className="w-full h-full flex justify-center items-center rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700"><Image src="/send.png" alt="send icon" height={19} width={19}></Image></button>
              </div>
            </div>
            <CustomFileInput/>
          </div>
        </div>

      </div>
    </>
  );
}

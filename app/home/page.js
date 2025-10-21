'use client'

import LogoutPopUp from "@/components/LogoutPopUp";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation'
import { useState } from "react";


export default function Home() {
  const { data: session } = useSession();
  const [isLogout, setIsLogout] = useState(false)

  const email = session?.user?.email || "User";
  const user = email.split("@")[0].match(/^[a-zA-Z]+/)[0];
  const name = user.charAt(0).toUpperCase() + user.slice(1);

  if (!session) {
    redirect("/")
  }

  return (
    <>
    {isLogout && <LogoutPopUp isLogout = {isLogout} setIsLogout = {setIsLogout}/>}

      <div className="home bg-gray-950 min-h-screen flex">
        {/* Left Container */}
        <div className="left flex flex-col justify-between text-white bg-gray-900 w-1/4 float-left p-5">
          <div className="history py-5 px-2 mt-30">
            <h2 className="pb-5">History</h2>
            <div className="chats text-gray-400">
              <p className="">chat 1</p>
              <p className="">chat 2</p>
              <p className="">chat 3</p>
              <p className="">chat 4</p>
              <p className="">chat 5</p>
            </div>
          </div>
          <div className="logout">
            <button onClick={() => { setIsLogout(true) }} className="relative inline-flex items-center justify-center p-[1.4px] overflow-hidden text-xs text-gray-400 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 dark:focus:ring-cyan-800 cursor-pointer my-5">
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
            <div className="fileUpload">
              <button type="button" className="text-gray-900 bg-white border border-gray-900 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-7 py-2.5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-600 dark:focus:ring-gray-800 cursor-pointer"><span className="flex justify-between items-center gap-4"><Image src="/FileUpload.png" alt="Upload File" width={20} height={20}></Image>Upload File</span></button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

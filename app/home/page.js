'use client'

import LogoutPopUp from "@/components/LogoutPopUp";
import CustomFileInput from "@/components/CustomFileInput";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation'
import { useState, useEffect } from "react";
import { getFileAction } from "@/actions/getFileAction";
import { useRouter } from "next/navigation";


export default function Home() {

  const { data: session } = useSession();
  const [isLogout, setIsLogout] = useState(false)

  const [files, setFiles] = useState([])

  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');

  const email = session?.user?.email || "User";
  const user = email.split("@")[0].match(/^[a-zA-Z]+/)[0];
  const name = user.charAt(0).toUpperCase() + user.slice(1);

  const router = useRouter();
  
  useEffect(() => {
    if (session === undefined) return; // Wait for session to be defined
    if (!session) {
      router.push("/");
    }
  }, [session]);


  useEffect(() => {
    const fetchFiles = async () => {
      if(!session?.user?.email) return;
      const fileData = await getFileAction(session.user.email);
      setFiles(fileData);
      // console.log("Fetched files:", fileData);
    }
    fetchFiles();
  }, [session])

  // Getting question from input field
  const handleQuestion = (e) => {
    setInput(e.target.value)
  }
  // Submitting Question after button click
  const submitQuestion = async () => {
    const userQuestion = input
    setQuestion(userQuestion)
    setInput('')
    // Sending Question to API
    const res = await fetch("/api/get-embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: userQuestion }),
    })

    const { embeddings } = await res.json();
    console.log("Question Embeddings:", embeddings);
   
  }


  return (
    <>
      {isLogout && <LogoutPopUp isLogout={isLogout} setIsLogout={setIsLogout} />}

      <div className="home bg-gray-950 min-h-screen flex">
        {/* Left Container */}
        <div className="left flex flex-col justify-between text-white bg-gray-900 w-1/4 float-left py-5">
          <div className="dashboard py-5 mt-20 w-full">
            <h2 className="py-1.5 px-5 text-gray-400">Saved Files</h2>
            <div className="files flex flex-col gap-1 mt-1 py-2 px-3 text-gray-200 w-full overflow-y-auto h-[62vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full">
              {files.map((file) => (
                <span className="px-2.5 py-2.5 rounded-lg hover:bg-gray-800 cursor-pointer" key={file._id}>
                  <p className="text-xs" >{file.fileName}</p>
                </span>
              ))}
            </div>
          </div>
          <div className="logout">
            <button onClick={() => { setIsLogout(true) }} className="relative inline-flex items-center justify-center p-[1.5px] overflow-hidden text-xs text-gray-400 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 dark:focus:ring-cyan-800 cursor-pointer my-5 ml-5">
              <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Logout
              </span>
            </button>
          </div>
        </div>

        {/* Right Container */}
        <div className="right w-full">

          {/* User Question Enterred then show this Chat UI */}
          {question ? 
          <div className="QA mx-auto w-[70%] min-h-screen flex flex-col justify-center items-center border border-white relative">
            <div className="question py-2 px-5 bg-gray-700 rounded-2xl absolute right-5">
              <p className="text-gray-200">{question}</p>
            </div>
             <div className="inputField flex justify-between items-center h-15 w-full my-10 rounded-2xl border border-slate-500 shadow-sm shadow-blue-200 absolute bottom-[3px]">
                {/* Chat Input */}
                <input onChange={handleQuestion} onKeyDown={(e)=>{e.key === "Enter" && submitQuestion()}} value={input} type="text" className="outline-none h-full w-[95%] rounded-2xl px-4 text-white" placeholder="ask something ?" />
                {/* Send Button */}
                <div className="send h-10 w-10 flex justify-center items-center rounded-full mr-3">
                  <button onClick={submitQuestion} className="w-full h-full flex justify-center items-center rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700"><Image src="/send.png" alt="send icon" height={19} width={19}></Image></button>
                </div>
              </div>
              <span className="text-gray-200 text-xs absolute bottom-3">Lernova can make mistakes. so double check it</span>
          </div> 

          :
          // If no question enterred then show this UI
            <div className="QA mx-auto w-[70%] min-h-screen flex flex-col justify-center items-center border border-white">
              <div className="head border">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  Hello {name}
                </h1>
              </div>
              <div className="inputField flex justify-between items-center h-15 w-full my-10 rounded-2xl border border-slate-500 shadow-sm shadow-blue-200">
                {/* Chat Input */}
                <input onChange={handleQuestion} onKeyDown={(e)=>{e.key === "Enter" && submitQuestion()}} value={input} type="text" className="outline-none h-full w-[95%] rounded-2xl px-4 text-white" placeholder="ask something ?" />
                {/* Send Button */}
                <div className="send h-10 w-10 flex justify-center items-center rounded-full mr-3">
                  <button onClick={submitQuestion} className="w-full h-full flex justify-center items-center rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700"><Image src="/send.png" alt="send icon" height={19} width={19}></Image></button>
                </div>
              </div>
              <CustomFileInput />
            </div>
          }
        </div>

      </div>
    </>
  );
}

'use client'

import LogoutPopUp from "@/components/LogoutPopUp";
import CustomFileInput from "@/components/CustomFileInput";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation'
import { useState, useEffect, useRef } from "react";
import { getFileAction } from "@/actions/getFileAction";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import DeleteButton from "@/components/DeleteButton";
import Dashboard from "@/components/Dashboard";


export default function Home() {

  const { data: session } = useSession();
  const [isLogout, setIsLogout] = useState(false)

  const [files, setFiles] = useState([])

  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');

  // Store selected fileId for vector search
  const [selectedFileId, setSelectedFileId] = useState(null);
  // Storing the Generated Answer
  const [answer, setAnswer] = useState('');
  // Storing chat history messages
  const [messages, setMessages] = useState([]);
  // useRef for auto-scroll of the chat after getting answer
  const messageEndRef = useRef(null);

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


    const fetchFiles = async () => {
      if (!session?.user?.email) return;
      const fileData = await getFileAction(session.user.email);
      setFiles(fileData);
      // console.log("Fetched files:", fileData);
    }
  useEffect(() => {
    fetchFiles();
  }, [session]);

  // Getting question from input field
  const handleQuestion = (e) => {
    setInput(e.target.value)
  }
  // Submitting Question after button click
  const submitQuestion = async () => {
    if( input === '') return;
    const userQuestion = input
    setQuestion(userQuestion)
    setInput('')

    // Sending Question to API to get Embeddings
    const res = await fetch("/api/get-embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: userQuestion }),
    })

    const { embeddings } = await res.json();
    console.log("Question Embeddings:", embeddings);

    // Sending questionEmbeddings to vector-search API
    const searchRes = await fetch("/api/vector-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionEmbedding: embeddings,  // Embedding array from above API
        fileId: selectedFileId,
        userId: session.user.email,  // Doing this for saftey
      })
    });
    const { results } = await searchRes.json();
    console.log("Relavant Chunks", results)

    // Sending the relavant chunks to generate answer API
    const answerRes = await fetch("/api/generate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: userQuestion,
        chunks: results,
      })
    });

    const { answer } = await answerRes.json();
    setAnswer(answer);
    console.log("Final Answer:", answer);

    console.log("File", selectedFileId)

    // Saving the user message using API
    await fetch("/api/save-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.email,
        fileId: selectedFileId,
        sender: "user",
        text: userQuestion,
      })
    });

    // Saving the AI message using API
    await fetch("/api/save-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.email,
        fileId: selectedFileId,
        sender: "ai",
        text: answer,
      })
    });

    await loadChat(selectedFileId);
  }

  // Function to load chat history when file is selected
  const loadChat = async (fileId) => {
    setSelectedFileId(fileId);

    const res = await fetch("/api/get-chat?fileId=" + fileId + "&userId=" + session.user.email);
    const { messages } = await res.json();
    setMessages(messages);
    console.log("Chat History:", messages);

  }
  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

   const refreshFiles = () => fetchFiles();

  console.log("MESSAGES:", messages);


  return (
    <>
      {isLogout && <LogoutPopUp isLogout={isLogout} setIsLogout={setIsLogout} />}

      <div className="home bg-[#202123] min-h-screen flex">
        {/* Left Container */}
        <Dashboard refreshFiles={refreshFiles} files={files} loadChat={loadChat} selectedFileId={selectedFileId} DeleteButton={DeleteButton} setIsLogout={setIsLogout} />

        {/* Right Container */}
        <div className="right w-full">

          {/* User Question Enterred then show this Chat UI */}
          {selectedFileId ?
            <div className="QA mx-auto w-[60%] h-screen flex flex-col justify-center items-center">
              
              {messages.length < 1 ? <div className="container mx-auto my-77 "><p className="text-gray-300 text-sm text-center">There are no messages yet !</p></div> :
              <div className="ansContainer text-gray-300 text-sm py-5 px-5 mt-5 space-y-4 font-sans-serif overflow-y-auto h-[88vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#202123] [&::-webkit-scrollbar-thumb]:bg-[#343541] [&::-webkit-scrollbar-thumb]:rounded-full">
                {messages.map((msg, i) => (
                  <div key={i} className="w-full mb-5">
                    <div className={msg.sender === "user"
      ? "ml-auto text-3xl font-semi-bold text-white prose prose-invert"
      : "mr-auto  text-gray-100  prose prose-invert"}>
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    <div className="line border-b border-gray-700 my-4 opacity-40"></div>
                  </div>
                ))}
                <div ref={messageEndRef}></div>
              </div>
              }

              <div className="inputField flex justify-between items-center w-full h-15 rounded-2xl border-1 border-slate-900 bg-[#26272b] shadow-[0_0_12px_3px_rgba(0,0,0,0.25)]">
                {/* Chat Input */}
                <input onChange={handleQuestion} onKeyDown={(e) => { e.key === "Enter" && submitQuestion() }} value={input} type="text" className="outline-none h-full w-[95%] rounded-2xl px-4 text-white" placeholder="ask something ?" />
                {/* Send Button */}
                <div className="send h-10 w-10 flex justify-center items-center rounded-full mr-3">
                  <button onClick={submitQuestion} className="w-full h-full flex justify-center items-center rounded-full cursor-pointer bg-[#222226] hover:bg-gray-700"><Image src="/send.png" alt="send icon" height={19} width={19}></Image></button>
                </div>
              </div>
              <span className="text-gray-200 text-xs my-2">Lernova can make mistakes. so double check it</span>
            </div>

            :
            // If no question enterred then show this UI
            <div className="QA mx-auto w-[60%] min-h-screen flex flex-col justify-center items-center gap-5">
              <div className="head">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  Hello {name}
                </h1>
              </div>
              <span className="text-gray-400 text-xs">Please upload a file, or select a file.</span>
              <div className="inputField flex justify-between items-center mb-10 h-15 w-full rounded-2xl bg-[#26272b]  border-1 border-slate-900 shadow-[0_0_12px_3px_rgba(0,0,0,0.25)]">
                {/* Chat Input */}
                <input onChange={handleQuestion} onKeyDown={(e) => { e.key === "Enter" && submitQuestion() }} value={input} type="text" className="outline-none h-full w-[95%] rounded-2xl px-4 text-white" placeholder="ask something ?" />
                {/* Send Button */}
                <div className="send h-10 w-10 flex justify-center items-center rounded-full mr-3">
                  <button onClick={submitQuestion} className="w-full h-full flex justify-center items-center rounded-full cursor-pointer bg-[#222226] hover:bg-gray-700"><Image src="/send.png" alt="send icon" height={19} width={19}></Image></button>
                </div>
              </div>
              <CustomFileInput refreshFiles={refreshFiles} />
            </div>
          }
        </div>

      </div>
    </>
  );
}

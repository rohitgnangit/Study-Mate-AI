"use client";
import React from "react";


const Dashboard = ({refreshFiles, files, loadChat, selectedFileId, DeleteButton, setIsLogout }) => {

    return (

        <div className="left flex flex-col justify-between text-white bg-[#18191c] w-1/4 float-left py-5">
            <div className="dashboard py-5 mt-20 w-full">
                <h2 className="py-1.5 px-5 text-gray-400">Saved Files</h2>
                <div className="files flex flex-col gap-1 mt-1 py-2 px-3 text-gray-200 w-full overflow-y-auto h-[62vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {files.map((file) => (
                        <span key={file._id} onClick={() => loadChat(file._id)} className={`px-2.5 py-2 flex items-center justify-between rounded-lg hover:bg-[#2d2e33] ${<DeleteButton />} cursor-pointer ${selectedFileId === file._id ? 'bg-[#2d2e33]' : ''}`}>
                            <p className="text-xs" >{file.fileName}</p>
                            <DeleteButton refreshFiles={refreshFiles} fileId={file._id} fileName={file.fileName} />
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
    )
}

export default Dashboard;
"use client"

import React from 'react'
import { deleteFileAction } from '@/actions/deleteFileAction';
import { useTransition } from 'react';

const DeletePopUp = ({ setIsLoading, refreshFiles, fileId, setIsDelete, fileName }) => {
     const [isPending, startTransition] = useTransition();
    
     const handleCancel = () => {
         setIsDelete(false);
        }
        
        const handleDelete = () => {
                setIsLoading(true);
                 startTransition(async() => {
                const formData = new FormData();
                formData.append("fileId", fileId);
                await deleteFileAction(formData);
                await refreshFiles();
                setIsLoading(false);
            })
            setIsDelete(false);
            }

  return (
     <div className=" h-screen w-screen bg-transparent backdrop-blur-sm fixed left-0 top-0 z-50  flex justify-center items-center">
            <div className="h-[20%] w-[80%] md:h-[25%] md:w-[30%] flex flex-col justify-center gap-7 items-center rounded-lg text-gray-200 bg-[#2d2e33]">
                <div className="head w-full flex flex-col items-center gap-2">
                    <h1 className="text-lg font-bold">Are you really want to Delete this file ?</h1>
                    <p className="">Delete {fileName} ?</p>
                </div>
                <div className="btns w-full flex justify-end gap-5 px-5">
                    <button onClick={ ()=>{ handleCancel() }} className="px-3 py-2 text-sm font-medium bg-gray-700 rounded-lg hover:bg-gray-800 cursor-pointer">Cancel</button>
                    <button onClick={ ()=>{ handleDelete() }} className="px-3 py-2 text-sm font-medium bg-red-700 rounded-lg hover:bg-red-600 cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
  )
}

export default DeletePopUp

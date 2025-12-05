"use client"

import React from 'react'
import DeletePopUp from './DeletePopUp';
import Image from 'next/image'
import { useState } from 'react';

const DeleteButton = ({ refreshFiles, fileId, fileName }) => {
    const [isDelete, setIsDelete] = useState(false);
    

  return (
    <div className="">
            <button onClick={() => {setIsDelete(true)}} className="cursor-pointer">
                <Image src="/delete.png" alt="delete" width={16} height={16}></Image>
            </button>
            {isDelete && <DeletePopUp refreshFiles={refreshFiles} fileId={fileId} setIsDelete={setIsDelete} fileName={fileName} />}
    </div>
  )
}

export default DeleteButton

import React from 'react'
import { useSession, signOut } from "next-auth/react";


const LogoutPopUp = ( { isLogout, setIsLogout } ) => {
    const { data: session } = useSession();
    const email = session?.user?.email || "User";

    const handleCancel = () => {
      setIsLogout(false);
    }

    const handleLogout = () => {
      signOut();
      setIsLogout(false);
    }
    
    

    return (
        <div className=" h-screen w-screen bg-transparent backdrop-blur-sm fixed left-0 top-0 z-50  flex justify-center items-center">
            <div className="min-h-[25%] min-w-[30%] flex flex-col justify-center gap-7 items-center rounded-lg text-gray-200 bg-gray-800">
                <div className="head w-full flex flex-col items-center gap-2">
                    <h1 className="text-lg font-bold">Are you really want to Log out ?</h1>
                    <p className="">Log out from Lernova as {email} ?</p>
                </div>
                <div className="btns w-full flex justify-end gap-5 px-5">
                    <button onClick={ ()=>{ handleCancel() }} className="px-3 py-2 text-sm font-medium bg-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer">Cancel</button>
                    <button onClick={ ()=>{ handleLogout() }} className="px-3 py-2 text-sm font-medium bg-gray-900 rounded-lg hover:bg-gray-700 cursor-pointer">Log out</button>
                </div>
            </div>
        </div>
    )
}

export default LogoutPopUp

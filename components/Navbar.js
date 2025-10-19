import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-transparent fixed w-full top-0 left-0 z-50 py-5 px-10 flex justify-between items-center">
      <Link href="/">
        <div className="logo font-semi-bold text-white px-3 text-lg"><Image src="/LernovA.png" alt="logo" width={130} height={130} /></div>
      </Link>
      <div className="btns">
        <Link href="/signup">
        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-gray-200 focus:ring-1 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-4.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent cursor-pointer">
            Sign in
          </span>
        </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

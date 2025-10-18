import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-transparent fixed w-full top-0 left-0 z-50 py-5 px-10 flex justify-between items-center">
      <Link href="/">
        <div className="logo font-semi-bold text-white px-3 text-lg"><Image src="/LernovA.png" alt="logo" width={130} height={130} /></div>
      </Link>
    </nav>
  )
}

export default Navbar

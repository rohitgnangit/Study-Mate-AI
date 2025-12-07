import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#110e14] h-20 flex justify-center items-center">
        <div className="text-gray-400 text-sm">
             © {new Date().getFullYear()} Lernova. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer

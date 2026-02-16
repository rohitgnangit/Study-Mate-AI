import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.div className='h-100 w-full bg-[url("/lernova-footer.jpg")] bg-cover bg-center mt-20 flex flex-col justify-between items-center gap-10 '
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
          <div className="top flex flex-col md:flex-row justify-center gap-20 w-full">
          <span className="logo ml-10 md:ml-0 mt-10">
            <Image src="/lernova-logo.png" alt="Lernova Logo" width={200} height={200}/>
          </span>
            <div className="flex justify-center gap-10 md:gap-20 md:mt-10">
                <motion.div className="flex flex-col gap-2"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-gray-300">Quick Links</h2>
                    <a href="" className="block text-gray-300 hover:text-gray-400">About Us</a>
                    <a href="" className="block text-gray-300 hover:text-gray-400">Contact Us</a>
                    <a href="/signup" className="block text-gray-300 hover:text-gray-400">Signup</a>
                    <a href="/signup" className="block text-gray-300 hover:text-gray-400">Login</a>
                </motion.div>
                <motion.div className="flex flex-col gap-2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-gray-300">Company</h2>
                    <a href="" className="block text-gray-300 hover:text-gray-400">Privacy Policy</a>
                    <a href="" className="block text-gray-300 hover:text-gray-400">Cookies Policy</a>
                    <a href="" className="block text-gray-300 hover:text-gray-400">Terms & Conditions</a>
                </motion.div>
            </div>
            </div>
            <motion.div className="bottom px-7 md:px-0 flex flex-col justify-center items-center gap-1 mb-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <p className="text-sm text-gray-300">© 2026 Lernova | All rights reserved.</p>
                <p className="text-xs text-gray-400 mt-3">Lernova — Capture, organize, and unlock your knowledge with AI-powered intelligence.Built to help you think better,</p>
                <p className="text-xs text-gray-400">remember more, and learn faster every day.</p>
            </motion.div>
        </motion.div>
    )
}

export default Footer
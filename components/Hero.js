"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Hero = () => {
    return (
        <section className="Hero relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center">
            <motion.video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <source src="/lernova-video1.mp4" type="video/mp4" />
            </motion.video>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="content relative z-10 flex flex-col items-center gap-10 text-center px-6">
                <motion.div className="text-center tracking-wider"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-5xl font-semibold text-gray-200 pt-20 text-center tracking-wider">YOUR SMART <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">STUDY</span> COMPANION</h1>
                    <h1 className="text-5xl font-semibold text-gray-200 pt-2 pb-8 text-center tracking-wider">WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">AI</span></h1>
                    <p className="text-lg tracking-wider font text-gray-300 text-center">Upload your notes or PDFs, ask questions, and get </p>
                    <p className="text-lg tracking-wider font text-gray-300 text-center">instant explanations. Study smarter, not harder, with AI that</p>
                    <p className="text-lg tracking-wider font text-gray-300 text-center">understands your learning material.</p>
                    <Link href="/signup">
                        <motion.button className="group relative inline-flex items-center justify-center mt-5 p-[2px] rounded-xl bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="px-6 py-2 rounded-xl bg-black text-white transition-all duration-300 group-hover:bg-transparent">
                                Get Started
                            </span>
                        </motion.button>
                    </Link>
                </motion.div>
                <motion.div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mt-5 text-white max-w-[900px]"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2 }}
                >
                    <HighlightItem title="Smart Study" content="Using AI" />
                    <div className="hidden md:block h-12 w-[2px] bg-white" />
                    <HighlightItem title="Save time" content="Upto 30%" />
                    <div className="hidden md:block h-12 w-[2px] bg-white" />
                    <HighlightItem title="AI-Powered Insights" content="Personalized Learning" />
                    <div className="hidden md:block h-12 w-[2px] bg-white" />
                    <HighlightItem title="Cloud Storage" content="Secure and Accessible" />
                </motion.div>
            </div>
        </section>
    )
};

const HighlightItem = ({ title, content }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <span className='text-xs font-semibold'>{title}</span>
            <p className="">{content}</p>
        </div>
    )
}

export default Hero

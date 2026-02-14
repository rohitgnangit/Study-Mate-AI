"use client"

import Spline from "@splinetool/react-spline";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion } from "framer-motion"
import { Upload, Timer, Shield, Bot } from "lucide-react";


export default function LandingPage() {
  return (
    <>
      <div className="landingPage overflow-x-hidden flex flex-col justify-center items-center min-h-screen text-white h-full w-full bg-black relative"><div className="pointer-events-none absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Hero/>
      {/* Features */}
       <div className="fetures w-full mt-15">
        <motion.h2 className="text-lg font-semibold text-center text-gray-400 tracking-wider"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >Key Features</motion.h2>
        {/* Cards */}
        <motion.div className="cards flex flex-col md:flex-row justify-center items-center gap-10 w-full mt-15"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div className="w-[70%] md:w-[20%] bg-black flex flex-col justify-center items-center gap-5 py-10 px-13 shadow-xs shadow-cyan-900 text-sm text-gray-600 font-semibold rounded-lg border border-slate-950"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <Upload size={20} color="gray" />
            <p className="">Upload notes easily</p>
          </motion.div>
          <motion.div className="w-[70%] md:w-[20%] bg-black flex flex-col justify-center items-center gap-5 py-10 px-13 shadow-xs shadow-cyan-900 text-sm text-gray-600 font-semibold rounded-lg border border-slate-950"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <Bot size={20} color="gray" />
            <p className="">Chat with AI</p>
          </motion.div>
           <motion.div className="w-[70%] md:w-[20%] bg-black flex flex-col justify-center items-center gap-5 py-10 px-13 shadow-xs shadow-cyan-900 text-sm text-gray-600 font-semibold rounded-lg border border-slate-950"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <Timer size={20} color="gray" />
            <p className="">Save your Time</p>
          </motion.div>
          <motion.div className="w-[70%] md:w-[20%] bg-black flex flex-col justify-center items-center gap-5 py-10 px-13 shadow-xs shadow-cyan-900 text-sm text-gray-600 font-semibold rounded-lg border border-slate-950"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <Shield size={20} color="gray" />
            <p className="">Organized Dashboard</p>
          </motion.div>
        </motion.div>
      </div>

      {/* What is Lernova */}
      <div className="whatIs w-full flex flex-col md:flex-row justify-center items-center gap-5 mt-25">
        <motion.div className="w-[90%] md:w-1/2 flex flex-col justify-center items-start gap-5"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl text-slate-600 font-bold ">What is Lernova ?</h2>
          <p className="text-slate-400">Lernova is an AI-powered learning platform where students can upload PDFs or notes and ask questions through a chat interface. It uses embeddings and GPT models to retrieve relevant content and generate accurate, context-aware answers.</p>
          <span className="bg-slate-900 rounded-lg px-5 py-3 mt-5">
            <p className="italic text-sm text-slate-400">“Study materials in, smart answers out — Lernova learns with you.”</p>
          </span>
        </motion.div>
        <motion.div className="mx-5 md:mx-0"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Image className="rounded-lg" src="/lernovainhand.png" width={500} height={500} alt="Lernova in hand" />
        </motion.div>
      </div>

        {/* How it works */}
          <motion.h2 className="text-gray-400 text-xl font-semi-bold my-20 "
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          >
            How Lernova works ?
          </motion.h2>
        <div className="how flex flex-col md:flex-row justify-center items-center gap-17 w-full">

          <motion.div className="one w-[90%] md:w-[25%] flex flex-col items-center justify-center rounded-xl shadow-[0_0_12px_3px_rgba(0,0,0,0.25)]"
           initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          >
            <motion.div className="rounded-xl w-full shadow-[0_0_12px_3px_rgba(0,0,0,0.25)] hover:bg-slate-500"
             whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            >
              <Image className="rounded-xl" src="/login.png" alt="first" width={500} height={400} />
            </motion.div>
              <div className="content w-full px-7 py-2 text-slate-400 text-xs italic">
              <ul className="list-disc">
                <li className="py-1">First click on the Get started button</li>
                <li className="py-1">Then you will navigate to signup page.</li>
                <li className="py-1">Choose one signup method to access Lernova.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div className="two w-[90%] md:w-[25%] flex flex-col justify-center items-center rounded-xl shadow-[0_0_12px_3px_rgba(0,0,0,0.25)]"
           initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          >
            <motion.div className="rounded-xl w-full shadow-[0_0_12px_3px_rgba(0,0,0,0.25)] hover:bg-slate-500"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            >
              <Image className="rounded-xl" src="/home.png" alt="first" width={600} height={600} />
            </motion.div>
            <div className="content w-full px-7 py-2 text-slate-400 text-xs italic">
              <ul className="list-disc">
                <li className="py-1">Upload a pdf file by clicking upload button.</li>
                <li className="py-1">You can see the uploaded pdf in Dashboard on your left.</li>
                <li className="py-1">Please select that file to ask questions to AI.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div className="three w-[90%] md:w-[25%] flex flex-col justify-center items-center rounded-xl shadow-[0_0_12px_3px_rgba(0,0,0,0.25)]"
           initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          >
            <motion.div className="rounded-xl w-full shadow-[0_0_12px_3px_rgba(0,0,0,0.25)] hover:bg-slate-500"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            >
              <Image className="rounded-xl" src="/home2.png" alt="first" width={600} height={600} />
            </motion.div>
            <div className="content w-full px-7 py-2 text-slate-400 text-xs italic">
              <ul className="list-disc">
                <li className="py-1">After selected the file you can chat with AI about that file.</li>
                <li className="py-1">Ask questions to AI, what is in your mind.</li>
                <li className="py-1">Get the structured answer from AI and study.</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Why Lernova */}
         <div className="whatIs w-full flex flex-col md:flex-row justify-center items-center gap-5 mt-35">
        <motion.div className="w-[90%] md:w-1/2 flex flex-col justify-center items-start gap-5"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl text-slate-600 font-bold ">Why Lernova ?</h2>
          <p className="text-slate-400">Lernova was created to solve the problem students face when studying large amounts of material. Instead of manually searching through PDFs and notes, Lernova allows students to upload their content and instantly ask questions, receiving accurate, context-aware answers. This makes learning faster, more interactive, and personalized.</p>
        </motion.div>
        <motion.div className="mx-5 md:mx-0"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Image className="rounded-lg" src="/why-lernova.jpg" width={500} height={500} alt="Book in hand" />
        </motion.div>
      </div>
      </div>
      <Footer />
    </>
  );
}

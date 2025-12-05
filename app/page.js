"use client"

import Spline from "@splinetool/react-spline";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <div className="landingPage flex flex-col justify-center items-center min-h-screen text-white h-full w-full bg-slate-950 relative"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="animation w-full">
          <Spline
            scene="https://prod.spline.design/WxOjLlxJjVnrRXpE/scene.splinecode"
          />
        </div>
        <div className="mx-auto flex flex-col w-[85%] justify-center items-center px-8 py-10 absolute">
          <div className="heading py-5 w-[80%]">
            <h1 className="text-5xl font-semibold text-gray-200 pt-20 text-center">Your Smart Study Companion</h1>
            <h1 className="text-5xl font-semibold text-gray-200 pt-2 pb-8 text-center">with AI</h1>
            <p className="text-xl font text-gray-400 text-center">Upload your notes or PDFs, ask questions, and get </p>
            <p className="text-xl font text-gray-400 text-center">instant explanations. Study smarter, not harder, with AI that</p>
            <p className="text-xl font text-gray-400 text-center">understands your learning material.</p>
          </div>
          <Link href="/signup">
          <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-5 cursor-pointer">Get Started</button>
          </Link>
        </div>



      </div>
    </>
  );
}

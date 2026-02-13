"use client"

import Spline from "@splinetool/react-spline";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <div className="landingPage flex flex-col justify-center items-center min-h-screen text-white h-full w-full bg-slate-950 relative"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <Hero/>

        {/* Bottom */}
        <div className="bottom flex flex-col justify-center items-center py-10 gap-10 w-full bg-[#110e14]">
          <h2 className="text-gray-400 text-xl font-semi-bold">How Lernova works ?</h2>

          <div className="one flex flex-col gap-5 items-center md:flex-row p-5 w-[90%] md:w-[80%] rounded-xl shadow-[0_0_12px_3px_rgba(0,0,0,0.25)] bg-gray-950">
            <div className="rounded-xl w-[98%] md:w-[51%] shadow-[0_0_12px_3px_rgba(0,0,0,0.25)]">
              <Image className="rounded-xl" src="/login.png" alt="first" width={600} height={600} />
            </div>
            <div className="content px-8 w-[95%] md:w-[49%] flex justify-center items-center text-gray-400 text-sm italic">
              <ul className="list-disc">
                <li className="py-2">First click on the Get started button, then you will navigate to signup page.</li>
                <li className="py-2">The small robot will welcome you.</li>
                <li className="py-2">Choose one signup method to access Lernova.</li>
              </ul>
            </div>
          </div>

          <div className="two flex flex-col gap-5 items-center md:flex-row p-5 w-[90%] md:w-[80%] rounded-xl shadow-[0_0_12px_3px_rgba(0,0,0,0.25)] bg-gray-950">
            <div className="content px-8 w-[95%] md:w-[49%] flex justify-center items-center text-gray-400 text-sm italic">
              <ul className="list-disc">
                <li className="py-2">Upload a pdf file by clicking upload button.</li>
                <li className="py-2">You can able to see the uploaded pdf in Dashboard which is on your left side.</li>
                <li className="py-2">Please select that file to ask questions to AI.</li>
              </ul>
            </div>
            <div className="rounded-xl w-[98%] md:w-[51%] shadow-[0_0_12px_3px_rgba(0,0,0,0.25)]">
              <Image className="rounded-xl" src="/home.png" alt="first" width={600} height={600} />
            </div>
          </div>

          <div className="three flex flex-col gap-5 items-center md:flex-row p-5 w-[90%] md:w-[80%] rounded-xl shadow-[0_0_12px_3px_rgba(0,0,0,0.25)] bg-gray-950">
            <div className="rounded-xl w-[98%] md:w-[51%] shadow-[0_0_12px_3px_rgba(0,0,0,0.25)]">
              <Image className="rounded-xl" src="/home2.png" alt="first" width={600} height={600} />
            </div>
            <div className="content px-8 w-[95%] md:w-[49%] flex justify-center items-center text-gray-400 text-sm italic">
              <ul className="list-disc">
                <li className="py-2">After selected the file you can able to chat with AI about that file.</li>
                <li className="py-2">Ask questions to AI, what is in your mind.</li>
                <li className="py-2">Get the structured answer from AI and study.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

"use client"
import Spline from "@splinetool/react-spline";

export default function LandingPage() {
  return (
    <>
      <div className="landingPage min-h-screen text-white relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="mx-auto flex flex-col w-[85%] justify-center items-center px-8 py-10">
          <div className="heading py-5 w-[80%]">
            <h1 className="text-5xl font-semibold text-gray-200 pt-20 text-center">Your Smart Study Companion</h1>
            <h1 className="text-5xl font-semibold text-gray-200 pt-2 pb-8 text-center">with AI</h1>
            <p className="text-xl font text-gray-400 text-center">Upload your notes or PDFs, ask questions, and get </p>
            <p className="text-xl font text-gray-400 text-center">instant explanations. Study smarter, not harder, with AI that</p>
            <p className="text-xl font text-gray-400 text-center">understands your learning material.</p>
          </div>
          <div className="animation w-[85%]">
            <Spline className=""
              scene="https://prod.spline.design/nyiN0IGMkdPj0EA5/scene.splinecode"
            />
          </div>
        </div>

      </div>
    </>
  );
}

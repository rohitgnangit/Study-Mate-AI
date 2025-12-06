"use client"

import React, { useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'

const Signup = () => {
    const { data: session } = useSession();
        if(session) {
            redirect("/home")
        }
    return (
        <div className="flex justify-center items-center min-h-screen text-white relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="roboSignIn w-full h-screen flex items-center relative">
                <div className="robo w-[60%] h-full ml-20">
                <Spline className="w-full h-full"
                    scene="https://prod.spline.design/nyiN0IGMkdPj0EA5/scene.splinecode"
                />
                </div>
                <div className="singIn flex flex-col justify-center items-center w-[30%] absolute right-100 py-5">
                    <h1 className="text-gray-200 pb-8">Sign in to continue your AI Study Companion</h1>
                    <div className=" w-[65%] flex flex-col items-center gap-7 justify-center">
                        <button onClick={() => signIn("google")} type="button" className="hover:bg-gray-300 focus:ring-gray-500 focus:ring-offset-gray-200 w-full transition ease-in duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 min-w-full cursor-pointer shadow-sm shadow-emerald-300 inline-flex justify-center rounded-md bg-white py-1.5 text-sm font-semibold text-gray-900 border-2 border-emerald-300 sm:mt-0 sm:w-auto"><svg aria-label="Google icon" className="amplify-icon w-5 h-5 mr-2" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path>
                        </svg>
                             Sign in with Google
                        </button>

                        <button onClick={() => signIn("github")} type="button" className="shadow-sm shadow-emerald-300 py-1.5 flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base focus:outline-none focus:ring-1 focus:ring-offset-2 rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                         <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                         </svg>
                            Sign in with GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup

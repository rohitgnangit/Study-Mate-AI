// import React from 'react'
// import connectDB from '@/db/connectDB';
// import FileUpload from "@/models/FileUpload";
// import { connect } from 'mongoose';

// export default function Dashboard() {
//     connectDB();
//     const files = FileUpload.find().sort({ createdAt: -1});

//   return (
//     <div>
//        <div className="left flex flex-col justify-between text-white bg-gray-900 w-1/4 float-left p-5">
//           <div className="history py-5 px-2 mt-30">
//             <h2 className="pb-5">History</h2>
//             <div className="chats text-gray-400">
//               <p className="">File 1</p>
//               <p className="">File 2</p>
//               <p className="">File 3</p>
//               <p className="">File 4</p>
//               <p className="">File 5</p>
//             </div>
//           </div>
//           <div className="logout">
//             <button onClick={() => { setIsLogout(true) }} className="relative inline-flex items-center justify-center p-[1.5px] overflow-hidden text-xs text-gray-400 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 dark:focus:ring-cyan-800 cursor-pointer my-5">
//               <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </div>
//     </div>
//   )
// }


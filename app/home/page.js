

export default function Home() {
  return (
    <>
      <div className="home bg-black min-h-[93.5vh] flex">
        <div className="left flex flex-col justify-between text-white bg-gray-950 w-1/4 float-left p-5">
          <div className="history py-10 px-2">
            <h2 className="pb-5">History</h2>
            <div className="chats text-gray-400">
              <p className="">chat 1</p>
              <p className="">chat 2</p>
              <p className="">chat 3</p>
              <p className="">chat 4</p>
              <p className="">chat 5</p>
            </div>
          </div>
          <div className="logout">
            <button className="relative inline-flex items-center justify-center p-[1.4px] overflow-hidden text-xs text-gray-400 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 dark:focus:ring-cyan-800 cursor-pointer my-5">
              <span className="relative px-2.5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Logout
              </span>
            </button>
          </div>
        </div>

        <div className="right h-full flex flex-col w-full">
          <div className="head mx-auto mt-20">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              Hello Rohit
            </h1>
          </div>
          <div className="inputField h-15 w-[50%] my-50 mx-auto rounded-2xl border border-slate-500 shadow-sm shadow-blue-200">
            <input type="text" className="h-full w-full rounded-2xl px-3 text-white" placeholder="ask something ?" />
          </div>
        </div>

      </div>
    </>
  );
}

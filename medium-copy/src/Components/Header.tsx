import React from "react";
import { useNavigate } from "react-router-dom";

export function Header({}) {
  const navigate = useNavigate()
  return (
    <>
    <header className="flex w-full pt-1.5">
      <h1 className="ml-10 mr-8 text-4xl font-bold">Medium</h1>
      <input type="text" 
             className="pl-10 rounded-full 
            bg-light-grey border-none 
              focus:outline-none text-white" placeholder="Search"/>

      <button className="border-none ml-auto hover:cursor-pointer" onClick={()=> navigate("/write")}>      
      <div className="w-21 h-10 flex text-lighter-grey mr-10 hover:cursor-pointer active:text-white">
        <img src="./penWhite-removebg-preview.png" className="w-full h-full mt-1.5" alt="" />
        <p className="mt-3 text-xl">Write</p>
      </div>
      </button>      

    </header>
    <hr className="text-light-grey mt-2"/>
    </>
  )
}
  
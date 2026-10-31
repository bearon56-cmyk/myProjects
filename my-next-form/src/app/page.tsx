"use client"
import Form from "@/Components/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HTMLInputTypeAttribute } from "react";
import { FieldValue, FieldValues } from "react-hook-form";
import z, { email, json } from "zod";

interface fieldsProp{
    name : string
    type : HTMLInputTypeAttribute
    label : string
}



export default function Home() {
  const router = useRouter()

  return (
    <>
    <div className="w-dvw h-dvh flex items-center justify-center gap-5">
      <button onClick={()=>{router.push('/Register')}} 
              className="w-21 bg-violet-600 h-10 rounded-xl hover:bg-violet-500 active:bg-violet-700">Register</button>
      <button onClick={()=>{router.push('/Login')}} 
              className="w-21 bg-violet-600 h-10 rounded-xl hover:bg-violet-500 active:bg-violet-700">Login</button>
    </div>

    </>
  );
}

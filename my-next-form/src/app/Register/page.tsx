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



export default function Register() {
  const router = useRouter()
  const signupFields : fieldsProp[] = [
  { name : "username", label: "Username",  type: "text"},
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  ]

  const signUpSchema = z.object({
    username : z.string("Username must be 8 characters long").min(8),
    email : z.email("Enter a valid email"),
    password : z.string("Password must be 8 characters long").min(8),
  })

  async function onsubmit(values : FieldValues) {
    try {
        const response = await fetch("http://localhost:3001/api/register", {
          method: "POST",
          body: JSON.stringify({username : values.username, email : values.email, password : values.password}),
          headers : {"Content-Type" : "application/json"}
        })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
    <div id="bg-page" className="w-[75%] justify-self-center items-center min-h-dvh shadow-[0px_0px_60px_10px_black] flex flex-row-reverse">
      <div className="w-[50%] h-full flex  flex-col justify-center">
        <h1 className="text-3xl text-white">Create an account</h1>
        <Form fields={signupFields} onSubmit={onsubmit} schema={signUpSchema}></Form>
        <Link href="/Login" className="underline text-violet-500">Already have an account?</Link>
      </div>

      <div className="w-[50%] h-full flex items-center justify-center relative inset-0">
        <img src="/clover2.svg" className="size-90" loading="lazy" alt="" />
        <div className="bg-white w-[35%] absolute inset-0 m-auto aspect-square -z-1 rotate-45 opacity-25"></div>
        <div className="bg-white w-[40%] aspect-square -z-1 absolute inset-0 m-auto blur-[50px] rotate-45 "></div>
      </div>
    </div>
      
    </>
  );
}

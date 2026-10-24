"use client"
import Form from "@/Components/Form";
import Image from "next/image";
import { FieldValue, FieldValues } from "react-hook-form";

export default function Home() {
  const signupFields = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },]
function onsubmit(values : FieldValues) {
  console.log(values)
}
  return (
    <>
    <div id="bg-page" className="w-[75%] h-dvh shadow-[0px_0px_60px_10px_black] flex flex-row-reverse">
      <div className="w-[50%] h-full">
        <h1 className="text-3xl text-white">Create an account</h1>
        <Form fields={signupFields} onSubmit={onsubmit}></Form>
      </div>

      <div className="w-[50%] h-full flex items-center justify-center">
        <img src="/clover2.svg" className="size-120 " alt="" />
      </div>
    </div>
      
    </>
  );
}

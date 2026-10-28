"use client"

import { FieldArrayProps, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Link from "next/link"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
interface fieldsProp{
    name : string
    type : string
    label : string
}



export default function Form({
    fields,
    schema,
    onSubmit,
} : {fields : fieldsProp[], onSubmit : SubmitHandler<FieldValues>, schema : z.ZodType<FieldValues, FieldValues>}){
    const {handleSubmit, register, formState : {errors}} = useForm({
        resolver: zodResolver(schema)
    })

    return(
        <>
            <form className="text-white flex flex-col w-[80%] gap-10" onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field)=>(
                    <div key={field.name} className="flex flex-col">
                        <label>{field.label}</label>
                        <input className="border border-white h-14 rounded-xl pl-5" type={field.type} 
                        {...register(field.name)} placeholder={`Enter in ${field.name} `}/>
                        {errors[field.name] && <p className="text-red-500">{String(errors[field.name]?.message)}</p>}
                    </div>
                ))}
                
                <button type="submit" className="bg-mist-900 border border-black h-14 active:bg-mist-950
                                                rounded-xl font-bold hover:cursor-pointer text-center text-xl">Sign in</button>
            </form>

        </>
    )
}
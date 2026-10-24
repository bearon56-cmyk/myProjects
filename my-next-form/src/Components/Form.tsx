"use client"

import { FieldArrayProps, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { input } from "zod"

interface fieldsProp{
    name : string
    type : string
    label : string
}

export default function Form({
    fields,
    onSubmit
} : {fields : fieldsProp[], onSubmit : SubmitHandler<FieldValues>}){
    const {handleSubmit, register} = useForm()

    return(
        <>
            <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field)=>(
                    <div key={field.name}>
                        <label>{field.label}</label>
                        <input className="border border-white" type={field.type} {...register(field.name)}/>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>

        </>
    )
}
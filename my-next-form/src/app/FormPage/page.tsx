'use client'
import { useSearchParams } from "next/navigation"
import { HTMLInputTypeAttribute, Suspense, useEffect, useState } from "react"
import Form from  "@/Components/Form"
import { FieldValues } from "react-hook-form"
import z from "zod"
function FormContent(){
    const [steps, setSteps] = useState(null)

    interface fieldsProp{
        name : string
        type : HTMLInputTypeAttribute
        label : string
    }

    const signupFields : fieldsProp[] = [
        { name : "full_name", label: "Full Name",  type: "text"},
        { name: "age", label: "Age", type: "number" },
        { name: "address", label: "Address", type: "text" },
    ]

    function onsubmit(values : FieldValues){
        console.log(values)
    }

    const formSchema = z.object({
        full_name : z.string(),
        age : z.number(),
        address : z.string()
    })
    const searchParams = useSearchParams()
    const idParams = searchParams.get("id")
    useEffect(()=>{
        (async ()=>{
            const response = await fetch("http://localhost:3001/api/form", {
                method : "POST",
                body : JSON.stringify({id : idParams, reqType : "Ask value"}),
                headers : {"Content-Type" : "application/json"}
            })
            const data = await response.json()
            console.log(data[0])
        })()
    }, [idParams])

    return(
        <>
            <Form fields={signupFields} onSubmit={onsubmit} schema={formSchema}></Form>
        </>
    )
}

export default function FormPage() {
    return(
        <Suspense>
            <FormContent />
        </Suspense>
    )
}
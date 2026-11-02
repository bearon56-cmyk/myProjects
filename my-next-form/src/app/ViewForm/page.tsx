'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Suspense } from "react"
import FormContent  from "@/app/ViewForm/FormContent"

interface formType{
    age : number
    full_name : string
    address : string
    gender : string
    birthdate : string
    country : string
}


export default function ViewForm(){
    const [formContents, setFormContents] = useState<formType[] | null>(null)
    const searchParams = useSearchParams();
    const idParams = searchParams.get("id");
    useEffect(()=>{
        (async ()=>{
            const response = await fetch("http://localhost:3001/api/form", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    id : idParams,
                    reqType : "Ask value",
                })
            })
            const data = await response.json()
            setFormContents(data)
        })()
    }, [idParams])

    useEffect(()=>{
        console.log(formContents)
    }, [formContents])


    return(
        <>
            <Suspense>
                <FormContent formContents={formContents}></FormContent>
            </Suspense>
        </>
    )
}
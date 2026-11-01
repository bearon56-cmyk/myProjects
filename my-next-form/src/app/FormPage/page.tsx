'use client'
import { useSearchParams } from "next/navigation"
import { HTMLInputTypeAttribute, Suspense, useEffect, useState } from "react"
import Form from  "@/Components/Form"
import { FieldValues } from "react-hook-form"
import z from "zod"
function FormContent(){
    const [steps, setSteps] = useState<number | null>(null)

    interface fieldsProp{
        name : string
        type : HTMLInputTypeAttribute
        label : string
    }


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
            setSteps(data[0].step)
            console.log(steps)
        })()
    }, [idParams])

    const signupFieldsStep1 : fieldsProp[] = [
        { name : "full_name", label: "Full Name",  type: "text"},
        { name: "age", label: "Age", type: "number" },
        { name: "address", label: "Address", type: "text" },
    ]
    const signupFieldsStep2 : fieldsProp[] = [
        { name : "birthdate", label: "Birthdate",  type: "date"},
        { name: "country", label: "Country", type: "text" },
        { name: "gender", label: "Gender", type: "text" },
    ]
    async function onsubmitstep1(values : FieldValues){
        const {age, full_name, address} = values
        try {
            const response = await fetch("http://localhost:3001/api/form", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({reqType : "Update step 1" ,age : age, 
                                                                  full_name : full_name, 
                                                                  address : address,
                                                                  id : idParams}),
            }) 
            setSteps(2)
        } catch (error) {
            console.error(error)
        }

    }
        async function onsubmitstep2(values : FieldValues){
        const {birthdate, gender, country} = values
        
        try {
            const response = await fetch("http://localhost:3001/api/form", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({reqType : "Update step 2",birthdate : birthdate, 
                                                                gender : gender, 
                                                                country : country,
                                                                id : idParams}),
            })
        } catch (error) {
            console.error(error);
        }

    }
    const formSchemaStep1 = z.object({
        full_name : z.string(),
        age : z.coerce.number(),
        address : z.string()
    })
        const formSchemaStep2 = z.object({
        birthdate : z.coerce.date(),
        gender : z.string(),
        country : z.string()
    })

    if(steps === null){
        return(
            <p>Loading...</p>
        )
    }
    return(
        <>
            {steps === 1 && (<Form fields={signupFieldsStep1} onSubmit={onsubmitstep1} schema={formSchemaStep1}></Form>)}
            {steps === 2 && (<Form fields={signupFieldsStep2} onSubmit={onsubmitstep2} schema={formSchemaStep2}></Form>)}
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
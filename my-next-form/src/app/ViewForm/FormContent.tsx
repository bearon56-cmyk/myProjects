import { useEffect } from "react"

interface formType{
    age : number
    full_name : string
    address : string
    gender : string
    birthdate : string
    country : string
}

export default function FormContent({
    formContents 
} : {formContents : formType[] | null }){



    if(formContents === null){
        return(
            <p>Loading...</p>
        )
    }
    const unwrappedContent = formContents[0]
    const formattedDate = new Date(unwrappedContent.birthdate).toLocaleDateString('en-US')
    return (
    <>
    <div className="flex flex-col">
        <p>Name: {unwrappedContent.full_name}</p>
        <p>Gender: {unwrappedContent.gender}</p>
        <p>Address: {unwrappedContent.address}</p>
        <p>Age: {unwrappedContent.age}</p>
        <p>Country: {unwrappedContent.country}</p>
        <p>Birthdate: {formattedDate}</p>
    </div>

    </>
    )

}
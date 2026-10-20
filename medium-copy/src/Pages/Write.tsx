import { UserName } from './../Components/UserName';
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"



export default function Write() {
    const navigate = useNavigate()
    const [titleInput, setTitleInput] = useState("")
    const [storyInput, setStoryInput] = useState("")
    const [userName, setUserName] = useState("")
    const [askUserName, setAskUserName] = useState(false)
    async function onPublish(){
        // titleInput === "" || storyInput === "" 
        if (userName === ""){
            alert("Form empty.")
            return
        }
        try {
            const response = await fetch('http://localhost:3000/api/post', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    titleData : titleInput,
                    storyData : storyInput,
                    userNameData : userName
                })
            })

        } catch (error) {
            console.error(error)
        }
        finally{
            setTitleInput("")
            setStoryInput("")
            setAskUserName(false)
        }
    }

    function askUserNameFunc(){
        setAskUserName(!askUserName)
    }
    {/* <button onClick={()=> navigate("/")} className="hover:cursor-pointer">Press</button> */}

    return(
        <>
        <div className={`bg-white ${askUserName === true ? 'opacity-20' : 'opacity-100'} w-dvw h-dvh text-black flex flex-col`}>
         
            <header className="w-[95%] flex self-center">
                <h1 className="text-5xl ml-16 font-extrabold hover:cursor-pointer" 
                               onClick={ ()=> navigate('/')}>Medium</h1>
                <button className="ml-auto bg-green-600 rounded-full w-18 h-7 
                                   mt-2 text-white hover:cursor-pointer 
                                   hover:bg-green-800 active:bg-green-900" 
                                   onClick={askUserNameFunc}>Publish</button>
            <hr className="opacity-20"/>
            </header>


            <div className="h-full w-full flex justify-center">

                {/* Middle part wrapper */}
                <div className="flex flex-col w-[75%] text-4xl">

                    {/* Input wrapper so line can stand side to side */}
                    <div className="flex">
                        {/* Line */}                        
                        <div className="w-px h-15 bg-black mr-5 mt-3"></div>
                        <input type="text" 
                               className="w-[75%] h-20 focus:outline-none" 
                               placeholder="Title"
                               value={titleInput}
                               onChange={(e)=> setTitleInput(e.target.value)}/>              
                    </div>
                    <input type="text" placeholder="Tell your story..." 
                           className="text-2xl focus:outline-none"
                           onChange={(e)=> setStoryInput(e.target.value)}
                           value={storyInput}/>

                    
                </div>

            </div>
        </div> 
        
        {askUserName === true && <UserName 
        setAskUserName={setAskUserName} 
        setUserName={setUserName} 
        onPublish={onPublish}  />}   
        
        
          
        </>
    )
}
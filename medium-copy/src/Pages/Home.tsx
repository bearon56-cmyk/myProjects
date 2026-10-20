import { Header } from "../Components/Header";
import { Cards } from "../Components/Cards";
import { useEffect, useState } from "react";

export default function Home() {
  const [mediumData, setMediumData] = useState<any[]>([])
  useEffect(()=>{
  const controller = new AbortController
  const signal = controller.signal
  async function fetchSQL() {
    try {
      const response = await fetch("http://localhost:3000/api/get", {signal}) 
      const data = await response.json()
      setMediumData([...data])
    } catch (error) {
      if (signal.aborted){
        return
      }
      console.error(error)
    }
    
  }
  fetchSQL()
  return ()=>controller.abort()
  },[])
  
  return (
    <>
      <Header></Header>
      <div className="w-[75%] self-center h-full flex flex-col">
          {mediumData.map((value, index)=>(
            <Cards title={value.title} 
                   date={value.date} 
                   story={value.story} 
                   username={value.username}
                   key={index}></Cards>
          ))}
      </div>
      <button onClick={()=>console.log(mediumData)}>asdad</button>
    </>
  );
}

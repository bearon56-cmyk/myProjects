import { useState } from "react";
import Box from "./Box";
import Form from "./Form";
import { prescripts } from "./Prescripts";

function App() {
  let [editState, setEditState] = useState(null)
  let [editValue, setEditValue] = useState("")
  let [todos, setTodos] = useState("");
  let [addBox, setBox] = useState([]);

  function randomprescript(){
    let rand = Math.floor(Math.random() * prescripts.length)
    setBox([...addBox, prescripts[rand]])
  }
  
  function onChange(e) {
    let {name, value} = e.target
    setTodos(value)
  }

  function onEditChange(e) {
    let {name, value} = e.target
    setEditValue(value)
    console.log(editValue)
  }


  function oneditclick(indexPassed){
    if(indexPassed === editState){
      setEditState(null)
      return
    }
    setEditValue(addBox[indexPassed])

    setEditState(indexPassed)
  }

  function onsubmitclick(){
    setBox(addBox.map((element, index)=>{
      if(index === editState){
        setEditState(null)
        console.log(element)
        element = ""

        return [...element, editValue]
      }
      return element
    }))

  }

  function onTodosClick(element, index){
    
  }


  function deleteBox(indexPassed){
    setBox(addBox.filter((element, index)=> index !== indexPassed))
  }

  function onClick() {
    if (todos == ""){
      alert("enter something")
      return
    }
    setBox([...addBox, todos]);
    setTodos("")
  }

  return (
    <>
      <header className="flex font-bold w-full h-10 bg-blue-200 items-center text-lg gap-2 pl-3">
      <img src="./disk2.webp" alt="" className="size-8"/>My Todo List</header>

      {/* Main container */}
      <div className="w-[90%] h-[80%] self-center justify-self-center mt-2 overflow-scroll scrollbar-none">
        <Form randomprescript={randomprescript} onchange={onChange} todos={todos} onclick={onClick}></Form>
        

        <div className="my-responsive-grid grid w-full">
          <p className="pl-5 font-extrabold">Task: {addBox.length}</p>
          {addBox.map((element, index)=>{
            return <Box 
            onclick={()=> onTodosClick(element, index)}
            element={element} 
            key={index} 
            onbuttonclick={()=>deleteBox(index)}
            oneditclick={()=>oneditclick(index)}
            edit={index === editState}
            onsubmitclick={onsubmitclick}
            onchange={onEditChange}
            editValue={editValue}>
            </Box>
          })}
        </div>
        
      </div>
    </>
  );
}

export default App;

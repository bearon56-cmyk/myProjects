import { useState } from "react";
import Box from "./Box";
import Form from "./Form";

function App() {
  let [todos, setTodos] = useState({title: ""});
  let [addBox, setBox] = useState([]);

  
  function onChange(e) {
    let {name, value} = e.target
    setTodos({...todos, [name] : value})

    
  }
  function onTodosClick(element, index){
    console.log(element)
    console.log(index)
    console.log(addBox[index])
  }


  function deleteBox(indexPassed){
    setBox(addBox.filter((element, index)=> index !== indexPassed))
  }

  function onClick() {
    if (todos.title == ""){
      alert("enter something")
      return
    }
    setBox([...addBox, todos]);
    setTodos({title: ""})
  }

  return (
    <>
      <header className="flex font-bold w-full h-10 bg-blue-200 items-center text-lg gap-2 pl-3">
      <img src="./disk2.webp" alt="" className="size-8"/>My Todo List</header>

      {/* Main container */}
      <div className="w-[90%] h-[80%] self-center justify-self-center mt-2 overflow-scroll scrollbar-none">
        <Form onchange={onChange} todos={todos} onclick={onClick} ></Form>
        

        <div className="my-responsive-grid grid w-full">
          <p className="pl-5 font-extrabold">Task: {addBox.length}</p>
          {addBox.map((element, index)=>{
            return <Box onclick={()=> onTodosClick(element, index)}
                    element={element} key={index} onbuttonclick={()=>deleteBox(index)}></Box>
          })}
        </div>
        
      </div>
    </>
  );
}

export default App;

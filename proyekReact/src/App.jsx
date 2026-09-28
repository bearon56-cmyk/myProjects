import { useState } from "react";

function App() {
  let [form, setForm] = useState({name: "", email: ""});
  let [addP, setP] = useState([]);
  function onChange(e) {
    let {name, value} = e.target

    setForm({...form, [name] : value})
  }
  function onParagraphClick(element){
    console.log(element)
    
  }



  function onClick() {
    if (form.name == "" || form.email ==""){
      alert("enter something")
      return
    }
    setP([...addP, form]);
    setForm({name: "", email: ""})
  }

  return (
    <>
      <input name="name" type="text" value={form.name} onChange={onChange} />
      <input name="email" type="text" value={form.email} onChange={onChange} />
      <button onClick={onClick}>Submit</button>

      {addP.map((element, index)=>{
        return <p onClick={()=>onParagraphClick(element)} key={index}>{element.name}, {element.email}</p>
      })}
    </>
  );
}

export default App;

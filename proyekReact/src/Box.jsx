function Box({ onclick, element, onbuttonclick,oneditclick, onsubmitclick, onchange, edit, editValue}) {

  if (edit){
      return (
    <div className="flex bg-green-500 p-3 break-all rounded-2xl border"
      onClick={onclick}>
      <input type="text" name="title" onChange={onchange} className="flex-1" value={editValue}/>
      <button className="h-10 w-auto self-end justify-self-end" onClick={onsubmitclick}>Submit</button>      
      <button className="h-10 w-auto self-end justify-self-end" onClick={oneditclick}>Edit</button>
      <button className="h-10 w-auto self-end justify-self-end" onClick={onbuttonclick}>Delete</button>
    </div>
  );
  }

  return (
    <div className="flex bg-green-500 p-3 break-all rounded-2xl border"
      onClick={onclick}>
      <p className="flex-1">{element}</p>
      <button className="h-10 w-auto self-end justify-self-end" onClick={oneditclick}>Edit</button>
      <button className="h-10 w-auto self-end justify-self-end" onClick={onbuttonclick}>Delete</button>

    </div>
  );
}

export default Box;

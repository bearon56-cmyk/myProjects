function Form({onchange, todos, onclick}) {
    return(
        <div className="flex items-center justify-start
                        w-full h-30 gap-4">
            <textarea className="w-[90%] ml-3 h-12 resize-none bg-blue-300 
            border-none rounded-md p-3 whitespace-nowrap" 
            name="title" type="text" value={todos} onChange={onchange} 
            placeholder="Add new task" maxLength={100}></textarea>

            <button className="h-10 text-white bg-blue-600 border-none p-1 w-15 
                    hover:cursor-pointer rounded-sm" onClick={onclick}>Add</button>
        </div>
        
    )
}

export default Form
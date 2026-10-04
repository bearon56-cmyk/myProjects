function Form({onchange, todos, onclick, randomprescript}) {


    return(
        <div className="flex items-center justify-start
                        w-full h-30 gap-4">
            <textarea className="w-[90%] ml-3 h-12 resize-none bg-blue-300 
            border-none rounded-md p-3 whitespace-nowrap" 
            name="title" type="text" value={todos} onChange={onchange} 
            placeholder="Add new task" maxLength={100}></textarea>

            <button className="h-10 text-black bg-blue-600 p-1 w-15 font-extrabold
                               hover:cursor-pointer rounded-sm border-2 border-black 
                               active:text-white hover:bg-blue-500" 
                    onClick={onclick}>Add</button>
            <button className="h-10 w-15 bg-blue-300 border-black border-2 rounded-sm "
            onClick={randomprescript}>Cant Think?</button>
        </div>
        
    )
}

export default Form
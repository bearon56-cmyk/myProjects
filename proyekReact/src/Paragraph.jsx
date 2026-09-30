function Paragraph({element, onclick}){
    return (<p onClick={()=>onclick(element)}>{element.name}, {element.email}</p>)
}

export default Paragraph
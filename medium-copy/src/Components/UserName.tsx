import React, { type Dispatch, type SetStateAction } from "react";

interface props{
  setAskUserName: Dispatch<SetStateAction<boolean>>,
  setUserName : Dispatch<SetStateAction<string>>,
  onPublish : any
}

export function UserName({
  setAskUserName,
  setUserName,
  onPublish
} : props ) {
  return <div className="items-center flex flex-col opacity-100
                                                absolute inset-0 place-self-center ">
            <button className="self-end text-xl" onClick={() => {
      setAskUserName(false);
    }}>X</button>
            <input className="opacity-100 border text-center" type="text" placeholder="Username" 
            onChange={e => setUserName(e.target.value)} />
            <button className="w-[75%] border hover:cursor-pointer" onClick={onPublish}>Publish?</button>
            </div>;
}
  
import React from "react";


export function Cards({
    title,
    story,
    date,
    username
}: {title: string, story : string, date: any, username: string}){

    return(
        <div className="w-full max-h-[300px] border-t-1 border-b-1">
            <p>{username}</p>
            <p>{title}</p>
            <p>{story}</p>
            <p>{new Date(date).toLocaleDateString('en-US')}</p>
        </div>
    )
}
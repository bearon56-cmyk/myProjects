import { password, sql } from "bun";
import z from "zod";

const requestSchema  = z.object({
    username: z.string(),
    email : z.email(),
    password : z.string()
})


const myHeaders = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

Bun.serve({
    port: 3001,
    routes:{
        "/api/register" : {
            OPTIONS : async ()=>{
                return new Response(null, {status : 204, headers : myHeaders})
            },
            GET: async () => {
                try {
                    const serverData = await sql`SELECT * FROM "userDB"`
                    return new Response(JSON.stringify(serverData), {headers: myHeaders} )
                } catch (error) {
                    if (error instanceof Error){
                        return new Response(error.message, {status: 500})
                    }
                    return new Response("Error occured on the server side", {status: 500})
                }
            },
            POST: async (req) => {
                try {
                    const data  = requestSchema.parse(await req.json())
                    const password_hash = await Bun.password.hash(data.password)
                    const email_registered = await sql`SELECT email FROM "userDB" WHERE email = ${data.email}`
                    
                    if(email_registered.length > 0){
                        console.log(email_registered)
                        return new Response("Email already registered", {status : 400})
                    }

                    const query = await sql`INSERT INTO "userDB" (username, email, password) 
                             VALUES (${data.username}, ${data.email}, ${password_hash})
                             RETURNING id;`
                    const formQuery = await sql`INSERT INTO "formDB" (user_id) VALUES (${query[0].id});`
                    return new Response(JSON.stringify(email_registered[0]), {headers: myHeaders})
                } catch (error : unknown) {
                    if(error instanceof Error){
                        return new Response(error.message, {status: 500})
                    }
                    return new Response("Error occured on the server side", {status : 500})
                }
            }
        }
    }
})


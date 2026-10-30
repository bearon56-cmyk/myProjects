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
                    const {username, email, password} = data
                    const password_hash = await Bun.password.hash(password)
                    const email_registered = await sql`SELECT email FROM "userDB" WHERE email = ${email}`
                    
                    if(email_registered.length > 0){
                        console.log(email_registered)
                        return new Response("Email already registered", {status : 400})
                    }

                    const query = await sql`INSERT INTO "userDB" (username, email, password) 
                             VALUES (${username}, ${email}, ${password_hash})
                             RETURNING id;`
                    const formQuery = await sql`INSERT INTO "formDB" (user_id) VALUES (${query[0].id});`
                    return new Response(JSON.stringify({message : "Register successful", id : query[0].id}), {headers: myHeaders})
                } catch (error : unknown) {
                    if(error instanceof Error){
                        return new Response(error.message, {status: 500})
                    }
                    return new Response("Error occured on the server side", {status : 500})
                }
            }
        },
        "/api/login": {
            POST: async (req)=>{
                try {
                    const data = requestSchema.parse(await req.json())
                    const {email, username, password} = data
                    const DBcheck = await sql`SELECT * FROM "userDB" WHERE email = ${email} AND username = ${username};`

                    if (!DBcheck || DBcheck.length === 0){
                        return new Response("Not found", {status : 400})
                    }
                    const passwordMatch = await Bun.password.verify(password, DBcheck[0].password)
                    if (passwordMatch === false){
                        return new Response("Not found", {status : 400})
                    }


                    return new Response(JSON.stringify({message : "Login successful", id: DBcheck[0].id}), {status : 200, headers : myHeaders})
                } catch (error) {


                    if (error instanceof Error){
                        return new Response(error.message, {status: 500})
                    }
                    return new Response("Unknown error", {status : 500})
                }
            }
        }
    }
})


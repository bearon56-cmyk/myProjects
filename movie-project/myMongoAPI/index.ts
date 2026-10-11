import type { HeadersInit } from 'bun';
import type { CorsOptions } from 'cors';
import { json, response } from 'express';
import { Collection, Db, MongoClient, type Document } from 'mongodb';
let db_url = "mongodb://127.0.0.1:27017"
let PORT = Bun.env.PORT || "3000"
const client = new MongoClient(db_url)
let data : Document[] = [];
let moviesPopular : Document[] = [];

async function connectDB() {
    try {
        await client.connect()
        let db : Db = client.db("moviesDB")
        let moviesPopularCollection : Collection = db.collection("moviesPopular")
        let collection : Collection = db.collection("movies")
        data = await collection.find({}).toArray()

        moviesPopular = await moviesPopularCollection.find({}).toArray()
        moviesPopular = moviesPopular[0]?.results

    } catch (error: unknown) {
        console.error(error)
        
    }
}

await connectDB()
const resHeaders = { headers: { "Access-Control-Allow-Origin": "*" } };

Bun.serve({
    port: 3000,
    routes:{
        
        '/api/movies' : ()=>{
            return Response.json(data, resHeaders)
        },
        '/api/moviesPopular': ()=>{
            return Response.json(moviesPopular, resHeaders)
        }

    },
    async fetch(req,server){
        
        const url = new URL(req.url)
        server.upgrade(req)
        return new Response('FAILED',{status: 404})    
    }, websocket: {
        async message(ws, message){
            const data = JSON.parse(message.toString())
            console.log(data)
        }
    }
})

console.log("listening")
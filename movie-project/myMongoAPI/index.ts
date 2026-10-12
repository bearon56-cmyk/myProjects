import { Collection, Db, MongoClient, ObjectId, type Document } from 'mongodb';
let db_url = "mongodb://127.0.0.1:27017"
let PORT = Bun.env.PORT || "3000"
const client = new MongoClient(db_url)
let data : Document[] = [];
let moviesPopular : Document[] = [];
let db : Db = client.db("moviesDB")
let moviesPopularCollection : Collection = db.collection("moviesPopular")
let collection : Collection = db.collection("movies")
async function connectDB() {
    try {
        await client.connect()
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
    port: PORT,
    routes:{
        
        '/api/movies' : async ()=>{
            let upToDateData = await collection.find({}).toArray()
            return Response.json(upToDateData, resHeaders)
        },
        '/api/moviesPopular': ()=>{

            return Response.json(moviesPopular, resHeaders)
        }

    },
    async fetch(req,server){
        
        const url = new URL(req.url)
        if(server.upgrade(req)){
            return
        }
        return new Response('FAILED TO UPGRADE TO A WEBSOCKET SERVER',{status: 404})    
    }, websocket: {
        async message(ws, message){
            const data = JSON.parse(message.toString())
            const  {action, vote_countPassed, id} = data

            await collection.updateOne(
                {_id: new ObjectId(id)},
                {$set : {vote_count : vote_countPassed}}
            )

        }
    }
})

console.log("listening")
import express, { json } from 'express';
import cors from 'cors';
import { Collection, Db, MongoClient, type Document } from 'mongodb';
let db_url = Bun.env.database_url || "mongodb://127.0.0.1:27017/myDatabase"
let PORT = Bun.env.PORT || "3000"
const app = express()
const client = new MongoClient(db_url)
app.use(cors())
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

app.get("/api/movies", async (req , res)=>{
    try {
        res.json(data)
    } catch (error) {
        return res.status(500).json("FAIL")
    }
})

app.get("/api/moviesPopular", async (req , res)=>{
    try {
        res.json(moviesPopular)
    } catch (error) {
        return res.status(500).json("FAIL")
    }
})

app.listen(PORT, ()=>{
    console.log("LISTENED", PORT, db_url)
})
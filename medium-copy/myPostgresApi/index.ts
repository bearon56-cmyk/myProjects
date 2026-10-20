import { serve, sql } from "bun";
interface dataType {
  titleData: string;
  storyData: string;
  userNameData : string
}
const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Headers': 'content-type',
  
};

Bun.serve({
  port: 3000,
  routes: {
    "/api/post": {
      OPTIONS: ()=> new Response(null, {headers: corsHeader}),
      POST: async (req) =>{
        try {
            const {titleData, storyData, userNameData} = await req.json() as dataType

            await sql`INSERT INTO mediumdata (title, story, username) VALUES (${titleData}, ${storyData}, ${userNameData})`
            return Response.json({message : "Success"}, {headers:corsHeader})
        } catch (error) {
            return Response.json({error})
        }
      },
    },
    "/api/get":{
      GET: async (req)=>{
        try {
          const data = await sql`SELECT * FROM mediumdata`
          return Response.json(data, {headers: corsHeader})
        } catch (error) {
          return Response.json({error})
        }
      }
    }
  },
});

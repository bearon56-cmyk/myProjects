import { password, sql, type BodyInit } from "bun";
import z from "zod";

const requestSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
});

function createResponse(body: BodyInit | null, status = 200) {
  return new Response(body, { status, headers: myHeaders });
}

const myHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

//"Error" in the JSON is an error, "Message" is in the JSON specifically is it is a 200 OK

Bun.serve({
  port: 3001,
  routes: {
    "/api/register": {
      OPTIONS: async () => {
        return createResponse(null, 204);
      },
      POST: async (req) => {
        try {
          const data = requestSchema.parse(await req.json());
          const { username, email, password } = data;
          const password_hash = await Bun.password.hash(password);
          const email_registered = await sql`SELECT email FROM "userDB" WHERE email = ${email}`;

          if (email_registered.length > 0) {
            return createResponse(JSON.stringify({ message: "Email already registered" }),400);
          }

          const query =
            await sql`INSERT INTO "userDB" (username, email, password) 
                             VALUES (${username}, ${email}, ${password_hash})
                             RETURNING id;`;
          const formQuery =
            await sql`INSERT INTO "formDB" (user_id) VALUES (${query[0].id});`;
          return createResponse(JSON.stringify({ message: "Account registered", id: query[0].id }),200,
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            return createResponse(error.message, 500);
          }
          return createResponse("Unknown error", 500);
        }
      },
    },
    "/api/login": {
      OPTIONS: async () => {
        return new Response(null, { status: 204, headers: myHeaders });
      },
      POST: async (req) => {
        try {
          const data = requestSchema.parse(await req.json());
          const { email, username, password } = data;
          const DBcheck =
            await sql`SELECT * FROM "userDB" WHERE email = ${email} AND username = ${username};`;
          if (!DBcheck || DBcheck.length === 0) {
            console.log(1);
            return createResponse(JSON.stringify({ message: "Email or password not found" }),400,);
          }
          const passwordMatch = await Bun.password.verify(
            password,
            DBcheck[0].password,
          );
          if (passwordMatch === false) {
            console.log(2);
            return createResponse(
              JSON.stringify({ message: "Email or password not found" }),
              400,
            );
          }

          return new Response(
            JSON.stringify({
              message: "Login successful",
              id: DBcheck[0].id,
              userSubmitted: DBcheck[0].userSubmitted,
              steps: DBcheck[0].steps,
            }),
            { status: 200, headers: myHeaders },
          );
        } catch (error) {
          if (error instanceof Error) {
            return createResponse(error.message, 500);
          }
          return createResponse("Unknown error", 500);
        }
      },
    },
    "/api/form": {
      OPTIONS: async () => {
        return createResponse(null, 200);
      },
      POST: async (req) => {
        try {
          const data: any = await req.json();
          const {id, reqType} = data

          // Ask value
          if(reqType === "Ask value"){
            const query = await sql`SELECT * FROM "formDB" WHERE user_id = ${id}`;
            return createResponse(JSON.stringify(query), 200);
          }

          // Update step 1
          else if(reqType === "Update step 1"){
            try {
            const {full_name, age, address} = data
            console.log(id)
            const query = await sql`UPDATE "formDB" SET full_name = ${full_name}, 
                                                        age = ${age},
                                                        address = ${address} WHERE user_id = ${id}`;
            if(query.length === 0){
              return createResponse("Column not found", 400)
            }
            return createResponse("Query successful", 200);             
            } catch (error) {
              if(error instanceof Error){
                return createResponse(error.message, 500)
              }
              return createResponse("Unknown error", 500)
            }

          }
         // Update step 2
          return createResponse("Success", 200)
        } catch (error) {
          if (error instanceof Error) {
            return createResponse(error.message, 500);
          }
          return createResponse("Unknown error", 500);
        }
      },
    },
  },
});

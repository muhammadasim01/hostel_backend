import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { dbconnection } from "./config/dbConnection";
import {graphqlHTTP} from "express-graphql"
import schema from "./Schema/schema"

dbconnection();
const app=express();
// app.get('/',(req,res)=>{
//     res.send("hwlo waeroh")
// })

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true

}))

app.listen(process.env.PORT,()=>{
    console.log(`server is running on the port ${process.env.PORT}`)
})
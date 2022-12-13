import mongoose from "mongoose"
export const dbconnection=()=>{
let secret=process.env.MONGO_URI as string
    mongoose.connect(secret).then(()=>{
        console.log("connected to the database successfully")
    }).catch((e)=>{
        console.log("connection to the database failed")
    })
}
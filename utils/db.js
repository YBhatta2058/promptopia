import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.set('strictQuery',true)
    try {
        console.log("Connection started")
        const connection = await mongoose.connect(process.env.DB_URI)
        if(connection){
            console.log("Connection successful")
            console.log(connection.connection.host)
        }
    } catch (error) {
        console.log("Error while connecting to the database")
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;
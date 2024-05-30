import { Post } from "@models/posts.models";
import { User } from "@models/user.models";
import connectDB from "@utils/db";
import mongoose from "mongoose";

export const GET = async (req,{params})=>{
    console.log("Request made here")
    await connectDB()
    const userId = params.id;
    if(!userId){
        return new Response({error: "No user id"},{status: 405})
    }
    const posts = await Post.aggregate([
        {
            $match: { user: new mongoose.Types.ObjectId(userId) }
        },
        {
            $project: {
                tag: 1,
                prompt: 1,
            }
        }
    ]);
    console.log(posts)
    return new Response(JSON.stringify(posts))
}
import { Post } from "@models/posts.models"
import connectDB from "@utils/db"

export const POST = async (req)=>{
    const {userId, prompt , tag} = await req.json()
    try{
        await connectDB()
        const newPost = new Post({
            user: userId,
            tag: tag,
            prompt:prompt
        })

        await newPost.save()

        return new Response(JSON.stringify(newPost),{status:200})
    }catch(error){
        return new Response(JSON.stringify({message: "Failed to create prompt"}),{status:500})
    }
}


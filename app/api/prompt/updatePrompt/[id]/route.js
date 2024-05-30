import { Post } from "@models/posts.models";
import connectDB from "@utils/db"

export const PATCH = async (req)=>{
    console.log("Request made to patch")
    const {prompt,tag} = await req.json()
    const postId = req.url.slice(req.url.lastIndexOf('/')).replace('/','')
    if(!prompt || !tag){
        return new Response({error: "Prompt or tag required to update"},{status:410})
    }
    await connectDB();
    const post = await Post.findById(postId)
    if(!post){
        return new Response({error: "Post not found"},{status:410})
    }
    post.prompt = prompt
    post.tag = tag 
    await post.save({validateBeforeSave: false})
    return new Response({message: "Post updated successfully",data: post})
}
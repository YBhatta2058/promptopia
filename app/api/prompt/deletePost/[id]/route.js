import { Post } from "@models/posts.models";
import connectDB from "@utils/db"

export const DELETE = async (req)=>{
    const postId = req.url.slice(req.url.lastIndexOf('/')).replace('/','')
    console.log(postId)
    try{
        await connectDB();
        const post = await Post.findById(postId)
        console.log(post)
        if(!post){
            return new Response({error: "No post to delete"},{status:400})
        }
        const deleteResponse = await Post.deleteOne({_id : post._id});

        return new Response(JSON.stringify(deleteResponse),{status:200})
    }catch(err){
        return new Response({error: "Error while deleting the post"},{status: 520})
    }
}
import { Post } from "@models/posts.models";
import connectDB from "@utils/db";

export const GET = async (req,{params}) => {
    try {
        await connectDB();
        const post = await Post.findById(params.id);
        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(post), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: error }), { status: 500 });
    }
}


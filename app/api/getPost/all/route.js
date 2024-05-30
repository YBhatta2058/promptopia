import { Post } from "@models/posts.models";
import connectDB from "@utils/db";

export const GET = async () => {
    try {
        await connectDB();
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: "users", // Collection name of users
                    localField: "user", // Field in the Posts collection
                    foreignField: "_id", // Field in the Users collection
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 1,
                    tag: 1,
                    prompt: 1,
                    user: {username: "$user.username",userImage: "$user.image",userId: {$toString: "$user._id"}}
                }
            }
        ]);
        console.log(posts)
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error while fetching posts" }), { status: 500 });
    }
};
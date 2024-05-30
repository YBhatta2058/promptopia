import mongoose, { Schema, models } from "mongoose"

const postSchema = new Schema({
    tag: {
        type: String,
        required: [true,"Tag is required"],
    },
    prompt: {
        type: String,
        required: [true,"prompt is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Post = models.Post || mongoose.model("Post",postSchema)
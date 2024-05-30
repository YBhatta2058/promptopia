import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true,"Email already exists"]
    },
    username: {
        type: String,
        required: [true, "Email is required"],
        unique: [true,"Email already exists"]
    },
    image: {
        type: String
    }
})

export const User = models.User || model("User",userSchema)
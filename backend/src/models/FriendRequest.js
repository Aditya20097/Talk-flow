import mongoose, { Schema, Types } from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
     recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type: String,
        enum:["pending", "accepted"],
        default:"pending",
    },

} ,{timestamps:true} )

const FriendRequest = mongoose.model("friendRequest",friendRequestSchema)
export default FriendRequest

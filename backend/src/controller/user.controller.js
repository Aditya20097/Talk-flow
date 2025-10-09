import User from "../models/User.js";
import FriendRequest from '../models/FriendRequest.js'

export async function getRecommendedUsers(req,res) {
    try {
        const currentUserId = req.user.currentUserId
        const currentUser = req.user;

        const recommendedUsers= await User.find({
            $and :[
                {_id:{$ne:currentUserId}},
                {$id:{$nin:currentUser.friends}},
                {isOnboarded:true}
            ]
        })
        res.status(200).json({recommendedUsers})

    } catch (error) {
        console.error("error in get recommended users controlleer", error.message);
        res.status(500).json({message:"internal user"})
        
    }
}

export async function getMyFriends(req,res) {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage")
        res.status(200).json(user.friends)
    } catch (error) {
        console.error("error in getMyFriends controller", error.message);
        res.status(500).json({message: "internal server error"})
        
    }
}

export async function sendFriendRequest(req,res) {
    try {
        // my database id and receipent id
        const myId = req.user.id
        const {idx:recipientId} = req.params

        // prevent sending req to myself

        if (myId === recipientId) {
            return res.status(400).json({message:"you cant send friendrequest to yourself"})
        }

        // receipent not exist
         const receipent = await User.findById(recipientId)
          if (!receipent) {
            return res.status(404).json({message:"receipent not found"})

          } 
            //check yourself to exist friend with receipent

            if (receipent.friends.includes(myId)) {
                return res.status(400).json({message:"you are already friends with the user"})
            }

            // check if a req already exists

            const existingRequest = await FriendRequest.findOne({
                $or:[
                    {sender:myId,recipient:recipientId},
                    {sender:recipientId,recipient: myId}
                ]
            })
            if (existingRequest) {
                return res.status(400).json({message:"a friend request already exist between you and this user"})
            }

            const friendRequest= await FriendRequest.create({
                sender:myId,
                recipient:recipientId,
            })

            res.status(201).json(friendRequest)

    } catch (error) {
        console.error("error in sendRequest controller",error,message)
        res.status(500).json({message:"internal server error"})
    }
    
}
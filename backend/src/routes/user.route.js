import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controller/user.controller.js";

const router = express.Router()

// apply auth middeleware to all routes
router.use(protectRoute)

router.get("/",getRecommendedUsers)
router.get("/friends",getMyFriends)

router.post("/friend-request/:idx",sendFriendRequest)
router.put("/friend-request/:id/accept",acceptFriendRequest)

router.get("/friend-requests", getFriendRequest)
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)



export default router
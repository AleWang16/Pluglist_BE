// vote for plug
// unvote
import express from 'express';
import { plugController } from "../controllers/plugController";
import { trustController } from "../controllers/trustController";
import { deviceId } from "../middleware/deviceId";
import { rateLimit } from "../middleware/rateLimit";
import cookieParser from "cookie-parser";

export default function(router, aut) {
    router.use(cookieParser());
    router.use(deviceId);
    router.use(rateLimit);
    router.post("/createVote", aut, trustController.createVote);
};
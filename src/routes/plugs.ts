// create plug
// fetch plug based on filters
// comment on plug
import express from 'express';
import { plugController } from "../controllers/plugController";
import { trustController } from "../controllers/trustController";
import { deviceId } from "../middleware/deviceId";
import { rateLimit } from "../middleware/rateLimit";
import cookieParser from "cookie-parser";

export default function (router, aut) {
    router.use(cookieParser());
    router.use(deviceId);
    router.use(rateLimit);
    router.post("/createPlug", aut, plugController.createPlug);
    router.get("/getPlug", aut, plugController.getPlugByLocation);
    router.post("/comment", aut, plugController.commentOnPlug);
    router.post("/vote", aut, plugController.voteForPlug);
    router.get("/getTrustScore", aut, plugController.getTrustScore)
};
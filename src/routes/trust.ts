// vote for plug
// unvote
import express from 'express';
import { plugController } from "../controllers/plugController";
import { trustController } from "../controllers/trustController";

export default function(router, aut) {
    router.post("/createVote", aut, trustController.createVote);
};
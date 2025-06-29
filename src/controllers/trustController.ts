import { trustService } from "../services/trustService";

export class TrustController {
    createVote = async (req, res) => {
        try {
            const result = await trustService.createVote(req.body);
            return {
                status: 200,
                msg: "Successully created vote",
                data: result
            }
        } catch (error) {
            return {
                status: 500,
                msg: "Internal Server Error",
                data: error
            }
        }
    }
}

export const trustController = new TrustController();
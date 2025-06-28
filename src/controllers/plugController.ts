
import { plugService } from "../services/plugService"; 

export class PlugController {

    createPlug = async (req, res) => {
        try {
            const result = await plugService.createPlug(req.body);
            return {
                status: 200,
                msg: "Plug created successfully",
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
    getPlug = async (req, res) => {
        try {
            const result = await plugService.getPlug(req.body);
            return {
                status: 200,
                msg: "Successfully retrieved plug",
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

    comment = async (req, res) => {
        try {
            const result = await plugService.comment(req.body);
            return {
                status: 200,
                msg: "Sucessfully commented",
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

    vote = async (req, res) => {
        try {
            const result = await plugService.comment(req.body);
            return {
                status: 200,
                msg: "Suceessfully voted",
                data: result
            }
        } catch (error) {
            return {
                status: 500,
                msg: "Interval Server Error",
                data: error
            }
        }

    }
    getTrustScore = async (req, res) => {
        try {
            const result = await plugService.comment(req.body);
        } catch (error) {
            return {
                status: 500,
                msg: "Internal Server Error",
                data: error
            }
        }
    }
}

export const plugController = new PlugController();
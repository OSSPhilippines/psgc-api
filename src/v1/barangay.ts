import { NextFunction, Request, Response } from "express";
import BarangayRequest from "../models/barangayRequest";
import handleAsync from "../utils/handleAsync";

/**
 * !PATH: /barangay
 */
export const getAllBarangays = handleAsync(
    async (_: Request, res: Response, _next: NextFunction) => {
        const data = await BarangayRequest.find();
        res.json(data);
    }
);

/**
 * !PATH: /barangay/:code
 */
export const getABarangay = handleAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
        const { code } = req.params;
        const [data] = await BarangayRequest.find({ "barangay.code": code });
        if (!data) throw new Error("No Results Found");

        const totalNumOfBarangays = parseInt(data.total);

        for (let i = 0; i < totalNumOfBarangays; i++) {
            let db_code = data.barangay[i]["code"];
            let db_obj = data.barangay[i];
            if (code == db_code) {
                res.json(db_obj);
                break;
            }
        }
    }
);

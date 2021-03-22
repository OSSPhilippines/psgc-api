import { Request, Response } from "express";
import BarangayRequest from "../models/barangayRequest";

/**
 * !PATH: /barangay
 */
export const getAllBarangays = async (_: Request, res: Response) => {
    const data = await BarangayRequest.find();
    res.json(data);
};

/**
 * !PATH: /barangay/:code
 */
export const getABarangay = async (req: Request, res: Response) => {
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
};

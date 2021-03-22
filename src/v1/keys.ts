import { Request, Response } from "express";
import { nanoid } from "nanoid";
import ApiKey from "../models/apiKeys";
import encryptKey from "../utils/encryptKey";

/**
 * !PATH: /key
 */
export const getApiKey = async (_: Request, res: Response) => {
    const randomKey = nanoid();
    const randomKeyEncrypted = encryptKey(randomKey);
    await ApiKey.create({ key: randomKeyEncrypted });
    res.json({ key: randomKey });
};

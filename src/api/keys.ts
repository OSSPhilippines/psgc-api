import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import ApiKey from "../models/apiKeys";
import encryptKey from "../utils/encryptKey";
import handleAsync from "../utils/handleAsync";

/**
 * !PATH: /key
 */
const getApiKey = handleAsync(
    async (_: Request, res: Response, _next: NextFunction) => {
        const randomKey = nanoid();
        const randomKeyEncrypted = encryptKey(randomKey);
        await ApiKey.create({ key: randomKeyEncrypted });
        res.json({ key: randomKey });
    }
);

export default { getApiKey };

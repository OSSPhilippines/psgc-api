import { nanoid } from "nanoid";
import ApiKey from "../models/apiKeys";
import encryptKey from "../utils/encryptKey";
import handleAsync from "../utils/handleAsync";

/**
 * !PATH: /key
 */
export const getApiKey = handleAsync(async (_, res, _next) => {
    const randomKey = nanoid();
    const randomKeyEncrypted = encryptKey(randomKey);
    await ApiKey.create({ key: randomKeyEncrypted });
    res.json({ key: randomKey });
});

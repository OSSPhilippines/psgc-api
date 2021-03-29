import { ErrorRequestHandler } from "express";
import ApiKey from "./models/apiKeys";
import encryptKey from "./utils/encryptKey";
import handleAsync from "./utils/handleAsync";

export const notFound = handleAsync(async (req, res, _next) => {
    res.status(404);
    throw new Error(`Not found - ${req.originalUrl}`);
});

export const errorHandler: ErrorRequestHandler = (error, _, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "☕" : error.stack,
    });
    res.end();
};

export const checkApiKey = handleAsync(async (req, _, _next) => {
    const { key } = req.query; // get APIKEY from request
    if (!key) throw new Error("Please provide a valid API key"); // throw if undefined
    const encryptedKeyQuery = encryptKey(key as string); // hash the key
    const [foundKey] = await ApiKey.find({ key: encryptedKeyQuery }); // see if hashed key is in database
    if (!foundKey) throw new Error("Please provide a valid API key"); // throw if undefined
});

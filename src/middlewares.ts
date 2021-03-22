import { Request, Response } from "express";
import ApiKey from "./models/apiKeys";
import encryptKey from "./utils/encryptKey";

export const notFound = (req: Request, res: Response, next: Function) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (error: Error, _: Request, res: Response) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "☕" : error.stack,
    });
};

export const checkApiKey = async (
    req: Request,
    _: Response,
    next: Function
) => {
    const { key } = req.query; // get APIKEY from request
    if (!key) throw new Error("Please provide a valid API key"); // throw if undefined
    const encryptedKeyQuery = encryptKey(key as string); // hash the key
    const [foundKey] = await ApiKey.find({ key: encryptedKeyQuery }); // see if hashed key is in database
    if (!foundKey) throw new Error("Please provide a valid API key"); // throw if undefined
    next();
};

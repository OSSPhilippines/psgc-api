import crypto from "crypto";

const encryptKey: (text: string) => string = (text: string) => {
    return crypto
        .createHmac("sha256", process.env.API_SECRET!)
        .update(text)
        .digest("hex");
};

export default encryptKey;

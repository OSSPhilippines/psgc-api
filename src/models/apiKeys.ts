import mongoose, { Schema } from "mongoose";

const psgcApiKeys = new Schema(
    {
        key: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ApiKey = mongoose.model("ApiKey", psgcApiKeys, "psgc_keys");
export default ApiKey;

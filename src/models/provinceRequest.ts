import mongoose, { Schema } from "mongoose";

const psgcRequestSchema = new Schema({
    total: Number,
    province: [{}],
});

const ProvinceRequest = mongoose.model(
    "ProvinceRequest",
    psgcRequestSchema,
    "psgc_province"
);

export default ProvinceRequest;

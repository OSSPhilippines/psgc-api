import mongoose, { Schema } from "mongoose";

const psgcRequestSchema = new Schema({
    total: Number,
    region: [{}],
});

const RegionRequest = mongoose.model(
    "RegionRequest",
    psgcRequestSchema,
    "psgc_region"
);

export default RegionRequest;

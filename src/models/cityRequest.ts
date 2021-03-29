import mongoose, { Schema } from "mongoose";

const psgcRequestSchema = new Schema({
    total: Number,
    city: [{}],
});

const CityRequest = mongoose.model(
    "CityRequest",
    psgcRequestSchema,
    "psgc_city"
);

export default CityRequest;

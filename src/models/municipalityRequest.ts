import mongoose, { Schema } from "mongoose";

const psgcRequestSchema = new Schema({
    total: Number,
    municipality: [{}],
});

const MunicipalityRequest = mongoose.model(
    "MunicipalityRequest",
    psgcRequestSchema,
    "psgc_municipality"
);

export default MunicipalityRequest;

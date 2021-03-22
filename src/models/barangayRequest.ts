import mongoose, { Schema } from "mongoose";

const psgcRequestSchema = new Schema({
    total: Number,
    barangay: [{}],
});

const BarangayRequest = mongoose.model(
    "BarangayRequest",
    psgcRequestSchema,
    "psgc_barangay"
);

export default BarangayRequest;

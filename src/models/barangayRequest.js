const mongoose = require('mongoose');
const { Schema } = mongoose;

const psgcRequestSchema = new Schema({
    total: Number,
    barangay: [{}]
});

const BarangayRequest = mongoose.model('BarangayRequest', psgcRequestSchema, 'psgc_barangay');

module.exports = BarangayRequest;
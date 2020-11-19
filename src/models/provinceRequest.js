const mongoose = require('mongoose');
const { Schema } = mongoose;

const psgcRequestSchema = new Schema({
    total: Number,
    province: [{}]
});

const ProvinceRequest = mongoose.model('ProvinceRequest', psgcRequestSchema, 'psgc_province');

module.exports = ProvinceRequest;
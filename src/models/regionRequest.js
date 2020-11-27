const mongoose = require('mongoose');
const { Schema } = mongoose;

const psgcRequestSchema = new Schema({
    total: Number,
    region: [{}]
});

const RegionRequest = mongoose.model('RegionRequest', psgcRequestSchema, 'psgc_region');

module.exports = RegionRequest;
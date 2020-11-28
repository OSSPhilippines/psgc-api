const mongoose = require('mongoose');
const { Schema } = mongoose;

const psgcRequestSchema = new Schema({
    total: Number,
    city: [{}]
});

const CityRequest = mongoose.model('CityRequest', psgcRequestSchema, 'psgc_city');

module.exports = CityRequest;
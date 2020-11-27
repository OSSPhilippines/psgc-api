const mongoose = require('mongoose');
const { Schema } = mongoose;

const psgcRequestSchema = new Schema({
    total: Number,
    municipality: [{}]
});

const MunicipalityRequest = mongoose.model('MunicipalityRequest', psgcRequestSchema, 'psgc_municipality');

module.exports = MunicipalityRequest;
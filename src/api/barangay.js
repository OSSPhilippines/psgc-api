const BarangayRequest = require('../models/barangayRequest');
const handleAsync = require('../utils/handleAsync');



/**
 * !PATH: /barangay
 */
const getAllBarangays = handleAsync(async (req, res, next) => {
    const data = await BarangayRequest.find();
    const len = data[0].total;
    const json_data = [];
    const arr = [];
    for(let i = 0; i < len; i++) {
        const code = data[0].barangay[i].code;
        const name = data[0].barangay[i].name;
        const geographic_level = data[0].barangay[i].geographic_level;
        const population = data[0].barangay[i].population;
        arr.push({
            code: code,
            name: name,
            geographic_level: geographic_level,
            population: population
        });
    }
    json_data.push({
        _id: data[0]._id,
        total: len,
        barangay: arr
    });
    res.json(json_data);
})



/**
 * !PATH: /barangay/:code
 */
const getABarangay = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await BarangayRequest.find({ 'barangay.code': code })
    if (!data) throw new Error('No Results Found');

    const totalNumOfBarangays = parseInt(data.total);
    let json_data = {};
    for (i = 0; i < totalNumOfBarangays; i++) {
        let db_code = data.barangay[i]['code'];
        let db_obj = data.barangay[i];
        if (code == db_code) {
            const code = db_obj.code;
            const name = db_obj.name;
            const geographic_level = db_obj.geographic_level;
            const population = db_obj.population;
            json_data = {
                code: code,
                name: name,
                geographic_level: geographic_level,
                population: population
            };
            res.json(json_data)
            break;
        }
    }

})


module.exports = {
    getAllBarangays,
    getABarangay
};
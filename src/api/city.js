const CityRequest = require('../models/cityRequest');
const BarangayRequest = require('../models/barangayRequest');
const handleAsync = require('../utils/handleAsync');

/**
 * !PATH: /city
 */
const getAllCities = handleAsync(async (req, res, next) => {
    const data = await CityRequest.find();
    res.json(data);
})

/**
 * !PATH: /city/:code
 */
const getACity = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await CityRequest.find({ 'city.code': code });
    if (!data) throw new Error('No Results Found');

    const totalNumOfCities = parseInt(data.total);

    for (i = 0; i < totalNumOfCities; i++) {
        let db_code = data.city[i]['code'];
        let db_obj = data.city[i];
        if (code == db_code) {
            res.json(db_obj)
            break;
        }
    }
})

/**
 * !PATH: /city/:code/barangay
 * barangay (for city)
 */
const getAllBarangaysOfACity = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await BarangayRequest.find();
    if (!data) throw new Error('No Results Found');

    const totalNumOfBarangays = parseInt(data.total);
    const codeArray = code.split('');
    const results = [];

    let new_split_code = 0;
    let split_code = codeArray.length < 9
        ? parseInt(codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3] + codeArray[4] + codeArray[5])
        : parseInt(codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3] + codeArray[4] + codeArray[5] + codeArray[6]);

    for (i = 0; i < totalNumOfBarangays; i++) {
        const db_code = data.barangay[i]['code'];

        db_code.split('').length < 9
            ? new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3] + db_code[4] + db_code[5])
            : new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3] + db_code[4] + db_code[5] + db_code[6])

        split_code === new_split_code
            ? results.push(data.barangay[i])
            : null

    }

    res.json(results)

})

module.exports = {
    getAllCities,
    getACity,
    getAllBarangaysOfACity
};
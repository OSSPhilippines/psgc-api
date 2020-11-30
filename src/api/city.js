const CityRequest = require('../models/cityRequest');
const BarangayRequest = require('../models/barangayRequest');
const handleAsync = require('../utils/handleAsync');


/**
 * !PATH: /city
 */
const getAllCities = handleAsync(async (req, res, next) => {
    const data = await CityRequest.find();
    const len = data[0].total;
    const json_data = [];
    const arr = [];
    for(let i = 0; i < len; i++) {
        const code = data[0].city[i].code;
        const name = data[0].city[i].name;
        const geographic_level = data[0].city[i].geographic_level;
        const population = data[0].city[i].population;
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
        city: arr
    });
    res.json(json_data);
})


/**
 * !PATH: /city/:code
 */
const getACity = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await CityRequest.find({ 'city.code': code });
    if (!data) throw new Error('No Results Found');

    const totalNumOfCities = parseInt(data.total);
    let json_data = {};
    for (i = 0; i < totalNumOfCities; i++) {
        let db_code = data.city[i]['code'];
        let db_obj = data.city[i];
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

        if(split_code === new_split_code) {
            const code = data['barangay'][i].code;
            const name = data['barangay'][i].name;
            const geographic_level = data['barangay'][i].geographic_level;
            const population = data['barangay'][i].population;
            results.push({
                code: code,
                name: name,
                geographic_level: geographic_level,
                population: population
            })
        } else {
            null;
        }

    }

    res.json(results)

})


module.exports = {
    getAllCities,
    getACity,
    getAllBarangaysOfACity
};
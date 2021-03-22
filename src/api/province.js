const ProvinceRequest = require('../models/provinceRequest');
const CityRequest = require('../models/cityRequest');
const MunicipalityRequest = require('../models/municipalityRequest');
const handleAsync = require('../utils/handleAsync');


/**
 * !PATH: /province
 */
const getAllProvinces = handleAsync(async (req, res, next) => {
    const data = await ProvinceRequest.find();
    res.json(data)
})


/**
 * !PATH: /province/:code
 */
const getAProvince = async (req, res, next) => {
    const { code } = req.params;
    const [data] = await ProvinceRequest.find({ 'province.code': code })
    if (!data) throw new Error('No Results Found');

    const totalNumOfProvinces = parseInt(data.total);

    for (i = 0; i < totalNumOfProvinces; i++) {
        let db_code = data.province[i]['code'];
        let db_obj = data.province[i];
        if (code == db_code) {
            res.json(db_obj)
            break;
        }
    }
}


/**
 * !PATH: /province/:code/city
 */
const getAllCitiesOfAProvince = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await CityRequest.find();
    if (!data) throw new Error('No Results Found');

    const codeArray = code.split('');
    const totalNumOfCities = parseInt(data.total);
    const results = [];

    let new_split_code = 0;
    let split_code = codeArray.length < 9
        ? parseInt(codeArray[0] + codeArray[1] + codeArray[2])
        : parseInt(codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3]);

    for (i = 0; i < totalNumOfCities; i++) {
        const db_code = data.city[i]['code'];

        db_code.split('').length < 9
            ? new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2])
            : new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3])

        split_code === new_split_code
            ? results.push(data.city[i])
            : null

    }

    res.json(results)
})


/**
 * !PATH: /province/:code/municipality
 */
const getAllMunicipalitiesOfAProvince = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await MunicipalityRequest.find();
    if (!data) throw new Error('No Results Found');

    const codeArray = code.split('');
    const totalNumOfMunicipalities = parseInt(data.total);
    const results = [];

    let new_split_code = 0;
    let split_code = codeArray.length < 9
        ? parseInt(codeArray[0] + codeArray[1] + codeArray[2])
        : parseInt(codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3]);

    for (i = 0; i < totalNumOfMunicipalities; i++) {
        const db_code = data.municipality[i]['code'];

        db_code.split('').length < 9
            ? new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2])
            : new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3])

        split_code === new_split_code
            ? results.push(data.municipality[i])
            : null

    }

    res.json(results)
})

module.exports = {
    getAllProvinces,
    getAProvince,
    getAllCitiesOfAProvince,
    getAllMunicipalitiesOfAProvince
};
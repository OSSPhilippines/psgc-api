const ProvinceRequest = require('../models/provinceRequest');
const CityRequest = require('../models/cityRequest');
const MunicipalityRequest = require('../models/municipalityRequest');
const handleAsync = require('../utils/handleAsync');


/**
 * !PATH: /province
 */
const getAllProvinces = handleAsync(async (req, res, next) => {
    const data = await ProvinceRequest.find();
    const len = data[0].total;
    const json_data = [];
    const arr = [];
    for(let i = 0; i < len; i++) {
        const code = data[0].province[i].code;
        const name = data[0].province[i].name;
        const geographic_level = data[0].province[i].geographic_level;
        const population = data[0].province[i].population;
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
        province: arr
    });
    res.json(json_data);
})


/**
 * !PATH: /province/:code
 */
const getAProvince = async (req, res, next) => {
    const { code } = req.params;
    const [data] = await ProvinceRequest.find({ 'province.code': code })
    if (!data) throw new Error('No Results Found');

    const totalNumOfProvinces = parseInt(data.total);
    let json_data = {};
    for (i = 0; i < totalNumOfProvinces; i++) {
        let db_code = data.province[i]['code'];
        let db_obj = data.province[i];
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

        if(split_code === new_split_code) {
            const code = data['city'][i].code;
            const name = data['city'][i].name;
            const geographic_level = data['city'][i].geographic_level;
            const population = data['city'][i].population;
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

        if(split_code === new_split_code) {
            const code = data['municipality'][i].code;
            const name = data['municipality'][i].name;
            const geographic_level = data['municipality'][i].geographic_level;
            const population = data['municipality'][i].population;
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
    getAllProvinces,
    getAProvince,
    getAllCitiesOfAProvince,
    getAllMunicipalitiesOfAProvince
};
const RegionRequest = require('../models/regionRequest');
const ProvinceRequest = require('../models/provinceRequest');
const handleAsync = require('../utils/handleAsync');


/**
 * !PATH: /region/
 */
const getAllRegions = handleAsync(async (req, res, next) => {
    const data = await RegionRequest.find();
    const len = data[0].total;
    const json_data = [];
    const arr = [];
    for(let i = 0; i < len; i++) {
        const code = data[0].region[i].code;
        const name = data[0].region[i].name;
        const geographic_level = data[0].region[i].geographic_level;
        const population = data[0].region[i].population;
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
        region: arr
    });
    res.json(json_data);
})


/**
 * !PATH: /region/:code
 */
const getARegion = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await RegionRequest.find({ 'region.code': code })
    if (!data) throw new Error('No Results Found');

    const totalNumOfRegions = parseInt(data.total);
    let json_data = {};
    for (i = 0; i < totalNumOfRegions; i++) {
        let db_code = data.region[i]['code'];
        let db_obj = data.region[i];
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
 * !PATH: /region/:code/province
 */
const getAllProvincesOfARegion = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await ProvinceRequest.find();
    if (!data) throw new Error('No Results Found');

    const totalNumOfProvinces = parseInt(data.total);
    const codeArray = code.split('');
    const results = [];

    let new_split_code = 0;
    let split_code = codeArray.length < 9
        ? parseInt(codeArray[0])
        : parseInt(codeArray[0] + codeArray[1]);

    for (i = 0; i < totalNumOfProvinces; i++) {
        const db_code = data.province[i]['code'];

        db_code.split('').length < 9
            ? new_split_code = parseInt(db_code[0])
            : new_split_code = parseInt(db_code[0] + db_code[1])
            
        if(split_code === new_split_code) {
            const code = data['province'][i].code;
            const name = data['province'][i].name;
            const geographic_level = data['province'][i].geographic_level;
            const population = data['province'][i].population;
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
    getAllRegions,
    getARegion,
    getAllProvincesOfARegion
};
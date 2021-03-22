const RegionRequest = require('../models/regionRequest');
const ProvinceRequest = require('../models/provinceRequest');
const handleAsync = require('../utils/handleAsync');


/**
 * !PATH: /region/
 */
const getAllRegions = handleAsync(async (req, res, next) => {
    const data = await RegionRequest.find();
    res.json(data);
})


/**
 * !PATH: /region/:code
 */
const getARegion = handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const [data] = await RegionRequest.find({ 'region.code': code })
    if (!data) throw new Error('No Results Found');

    const totalNumOfRegions = parseInt(data.total);

    for (i = 0; i < totalNumOfRegions; i++) {
        let db_code = data.region[i]['code'];
        let db_obj = data.region[i];
        if (code == db_code) {
            res.json(db_obj)
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

        split_code === new_split_code
            ? results.push(data['province'][i])
            : null
    }

    res.json(results)
})

module.exports = {
    getAllRegions,
    getARegion,
    getAllProvincesOfARegion
};
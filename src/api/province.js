const { Router } = require('express');
const ProvinceRequest = require('../models/provinceRequest');
const CityRequest = require('../models/cityRequest');
const MunicipalityRequest = require('../models/municipalityRequest');
const handleAsync = require('../utils/handleAsync');

const router = Router();


/**
 * !PATH: /province
 */
router.get('/', handleAsync(async (req, res, next) => {
    const data = await ProvinceRequest.find();
    res.json(data)
}));


/**
 * !PATH: /province/:code
 */
router.get('/:code', async (req, res, next) => {
    const { code } = req.params;
    const result = await ProvinceRequest.find({ 'province.code': code })
    if (!result.length) throw new Error();
    const total = parseInt(result[0]['total']);
    for (i = 0; i < total; i++) {
        let db_code = result[0]['province'][i]['code'];
        let db_obj = result[0]['province'][i];
        if (code == db_code) {
            res.json(db_obj)
            break;
        }
    }
});


/**
 * !PATH: /province/:code/city
 */
router.get('/:code/city', handleAsync(async (req, res, next) => {

    const { code } = req.params;
    const result = await CityRequest.find();
    if (!result.length) throw new Error();

    const codeArray = code.split('');
    const total = parseInt(result[0]['total']);
    const new_data = [];

    let new_split_code = 0;
    let split_code = codeArray.length < 9
        ? parseInt(codeArray[0] + codeArray[1] + codeArray[2])
        : parseInt(codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3]);

    for (i = 0; i < total; i++) {
        const db_code = result[0]['city'][i]['code'];

        db_code.split('').length < 9
            ? new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2])
            : new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3])

        split_code === new_split_code
            ? new_data.push(result[0]['city'][i])
            : null

    }

    res.json(new_data)
}));


/**
 * !PATH: /province/:code/municipality
 */
router.get('/:code/municipality', handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const result = await MunicipalityRequest.find();
    if (!result.length) throw new Error();

    const codeArray = code.split('');
    const total = parseInt(result[0]['total']);
    const new_data = [];

    let new_split_code = 0;
    let split_code = codeArray.length < 9
        ? parseInt(codeArray[0] + codeArray[1] + codeArray[2])
        : parseInt(codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3]);

    for (i = 0; i < total; i++) {
        const db_code = result[0]['municipality'][i]['code'];

        db_code.split('').length < 9
            ? new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2])
            : new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3])

        split_code === new_split_code
            ? new_data.push(result[0]['municipality'][i])
            : null

    }

    res.json(new_data)
}));

module.exports = router;
const { Router } = require('express');
const CityRequest = require('../models/cityRequest');
const BarangayRequest = require('../models/barangayRequest');
const handleAsync = require('../utils/handleAsync');

const router = Router();

/**
 * !PATH: /city
 */
router.get('/', handleAsync(async (req, res, next) => {
    const data = await CityRequest.find();
    res.json(data);
}));


/**
 * !PATH: /city/:code
 */
router.get('/:code', handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const result = await CityRequest.find({ 'city.code': code });
    if (!result.length) throw new Error();
    const total = parseInt(result[0]['total']);

    for (i = 0; i < total; i++) {
        let db_code = result[0]['city'][i]['code'];
        let db_obj = result[0]['city'][i];
        if (code == db_code) {
            res.json(db_obj)
            break;
        }
    }
}));


/**
 * !PATH: /city/:code/barangay
 * barangay (for city)
 */
router.get('/:code/barangay', handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const result = BarangayRequest.find();
    if (!result.length) throw new Error();

    const total = parseInt(result[0]['total']);
    const codeArray = code.split('');
    const new_data = [];

    let new_split_code = 0;
    let split_code = codeArray.length < 9
        ? parseInt(codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3] + codeArray[4] + codeArray[5])
        : parseInt(codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3] + codeArray[4] + codeArray[5] + codeArray[6]);

    for (i = 0; i < total; i++) {
        const db_code = result[0]['barangay'][i]['code'];

        db_code.split('').length < 9
            ? new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3] + db_code[4] + db_code[5])
            : new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3] + db_code[4] + db_code[5] + db_code[6])

        split_code === new_split_code
            ? new_data.push(result[0]['barangay'][i])
            : null

    }

    res.json(new_data)

}));

module.exports = router;
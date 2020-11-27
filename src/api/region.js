const { Router } = require('express');
const RegionRequest = require('../models/regionRequest');
const ProvinceRequest = require('../models/provinceRequest');
const handleAsync = require('../utils/handleAsync');

const router = Router();

/**
 * !PATH: /region
 */
router.get('/', handleAsync(async (req, res, next) => {
    const data = await RegionRequest.find();
    res.json(data);
}));


/**
 * !PATH: /region
 */
router.get('/:code', handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const result = await RegionRequest.find({ 'region.code': code })
    if (!result.length) throw new Error();
    const total = parseInt(result[0]['total']);
    for (i = 0; i < total; i++) {
        let db_code = result[0]['region'][i]['code'];
        let db_obj = result[0]['region'][i];
        if (code == db_code) {
            res.json(db_obj)
            break;
        }
    }
}));


/**
 * !PATH: /region
 */
router.get('/:code/province', async (req, res, next) => {
    const { code } = req.params;
    const result = ProvinceRequest.find();

    if (!result.length) throw new Error();

    const total = parseInt(result[0]['total']);
    const new_data = [];
    const codeArray = code.split('');

    let new_split_code = 0;
    let split_code = codeArray.length < 9
        ? parseInt(codeArray[0])
        : parseInt(codeArray[0] + codeArray[1]);

    for (i = 0; i < total; i++) {
        const db_code = result[0]['province'][i]['code'];

        db_code.split('').length < 9
            ? new_split_code = parseInt(db_code[0])
            : new_split_code = parseInt(db_code[0] + db_code[1])

        split_code === new_split_code
            ? new_data.push(result[0]['province'][i])
            : null
    }

    res.json(new_data)
});

module.exports = router;
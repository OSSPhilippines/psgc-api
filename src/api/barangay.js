const { Router } = require('express');
const BarangayRequest = require('../models/barangayRequest');
const handleAsync = require('../utils/handleAsync');

const router = Router();


/**
 * !PATH: /barangay
 */
router.get('/', handleAsync(async (req, res, next) => {
    const data = await BarangayRequest.find();
    res.json(data);
}));



/**
 * !PATH: /barangay/:code
 */
router.get('/:code', handleAsync(async (req, res, next) => {
    const { code } = req.params;
    const result = await BarangayRequest.find({ 'barangay.code': code })
    if (!result.length) throw new Error()
    const total = parseInt(result[0]['total']);

    for (i = 0; i < total; i++) {
        let db_code = result[0]['barangay'][i]['code'];
        let db_obj = result[0]['barangay'][i];
        if (code == db_code) {
            res.json(db_obj)
        }
    }

}));


module.exports = router;
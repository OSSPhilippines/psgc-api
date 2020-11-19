const { Router } = require('express');
const ProvinceRequest = require('../models/provinceRequest');

const router = Router();

/* main route */

router.get('/', async (req, res, next) => {
  try {
    const data = await ProvinceRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

module.exports = router;

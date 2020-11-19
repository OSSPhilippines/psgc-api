const { Router } = require('express');
const MunicipalityRequest = require('../models/municipalityRequest');

const router = Router();

/* main route */

router.get('/', async (req, res, next) => {
  try {
    const data = await MunicipalityRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

module.exports = router;

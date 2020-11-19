const { Router } = require('express');
const CityRequest = require('../models/cityRequest');

const router = Router();

/* main route */

router.get('/', async (req, res, next) => {
  try {
    const data = await CityRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

module.exports = router;

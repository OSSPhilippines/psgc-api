const { Router } = require('express');
const RegionRequest = require('../models/regionRequest');

const router = Router();

/* main route */

router.get('/', async (req, res, next) => {
  try {
    const data = await RegionRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

module.exports = router;

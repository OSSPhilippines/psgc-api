const { Router } = require('express');
const BarangayRequest = require('../models/barangayRequest');

const router = Router();

/* main route */

router.get('/', async (req, res, next) => {
  try {
    const data = await BarangayRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

module.exports = router;

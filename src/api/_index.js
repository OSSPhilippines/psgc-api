const { Router } = require('express');
const router = Router();
const BarangayRoutes = require('../api/barangay');
const CityRoutes = require('../api/city');
const MunicipalityRoutes = require('../api/municipality');
const ProvinceRoutes = require('../api/province');
const RegionRoutes = require('../api/region');

router.get('/barangay', BarangayRoutes)
router.get('/city', CityRoutes)
router.get('/municipality', MunicipalityRoutes)
router.get('/province', ProvinceRoutes)
router.get('/region', RegionRoutes)

module.exports = router;
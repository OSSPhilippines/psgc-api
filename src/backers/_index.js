const { Router } = require('express');
const router = Router({ mergeParams: true });
const BarangayControllers = require('../backers/barangay');
const CityControllers = require('../backers/city');
const MunicipalityControllers = require('../backers/municipality');
const ProvinceController = require('../backers/province');
const RegionController = require('../backers/region');

// BARANGAY CONTROLLERS
router.get('/barangay', BarangayControllers.getAllBarangays)
router.get('/barangay/:code', BarangayControllers.getABarangay)

// CITY CONTROLLERS
router.get('/city', CityControllers.getAllCities)
router.get('/city/:code', CityControllers.getACity)
router.get('/city/:code/barangay', CityControllers.getAllBarangaysOfACity)

// MUNICIPALITY CONTROLLERS
router.get('/municipality', MunicipalityControllers.getAllMunicipalities)
router.get('/municipality/:code', MunicipalityControllers.getAMunicipality)
router.get('/municipality/:code/barangay', MunicipalityControllers.getAllBarangaysOfAMunicipality)

// PROVINCE CONTROLLERS
router.get('/province', ProvinceController.getAllProvinces)
router.get('/province/:code', ProvinceController.getAProvince)
router.get('/province/:code/city', ProvinceController.getAllCitiesOfAProvince)
router.get('/province/:code/municipality', ProvinceController.getAllMunicipalitiesOfAProvince)

// REGION CONTROLLERS
router.get('/region', RegionController.getAllRegions)
router.get('/region/:code', RegionController.getARegion)
router.get('/region/:code/province', RegionController.getAllProvincesOfARegion)

module.exports = router;
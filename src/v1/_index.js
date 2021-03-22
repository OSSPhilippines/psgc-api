const { Router } = require('express');
const router = Router({ mergeParams: true });
const BarangayControllers = require('../v1/barangay');
const CityControllers = require('../v1/city');
const MunicipalityControllers = require('../v1/municipality');
const ProvinceController = require('../v1/province');
const RegionController = require('../v1/region');

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
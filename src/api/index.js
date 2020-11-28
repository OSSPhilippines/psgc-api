const { Router } = require('express');
const RegionRequest = require('../models/regionRequest');
const ProvinceRequest = require('../models/provinceRequest');
const CityRequest = require('../models/cityRequest');
const MunicipalityRequest = require('../models/municipalityRequest');
const BarangayRequest = require('../models/barangayRequest');
const rateLimit = require("express-rate-limit");

const apiLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 50, // limit of each IP
  message: "Uh oh! You have reached the maximum api call (50 calls per day)",
  headers: true
});

const router = Router();

/* region */

router.get('/region', apiLimit, async (req, res, next) => {
  try {
    const data = await RegionRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

router.get('/region/:code', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    const data = await RegionRequest.find({
      'region.code': code
    }, (err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        for(i=0;i<total;i++) {
          let db_code = result[0]['region'][i]['code'];
          let db_obj = result[0]['region'][i];
          if(code==db_code) {
            res.json(db_obj)
          }
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/region/:code/province', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    await ProvinceRequest.find((err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        const new_data = []; 
        let new_split_code = 0;
        let split_code = code.split('').length < 9 ? parseInt(code.split('')[0]) : parseInt(code.split('')[0] + code.split('')[1]);
        for(i=0;i<total;i++) {
          let db_code = result[0]['province'][i]['code'];
          let db_split_code = db_code.split('');
          if(db_split_code.length<9){
            new_split_code = parseInt(db_code[0])
          } else {
            new_split_code = parseInt(db_code[0] + db_code[1]);
          }
          if(split_code === new_split_code) {
            new_data.push(result[0]['province'][i]);
          }
        }
        res.json(new_data)
      }
    });
  } catch (error) {
    next(error);
  }
});

/* province */

router.get('/province', apiLimit, async (req, res, next) => {
  try {
    const data = await ProvinceRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

router.get('/province/:code', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    const data = await ProvinceRequest.find({
      'province.code': code
    }, (err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        for(i=0;i<total;i++) {
          let db_code = result[0]['province'][i]['code'];
          let db_obj = result[0]['province'][i];
          if(code==db_code) {
            res.json(db_obj)
          }
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/province/:code/city', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    await CityRequest.find((err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        const new_data = []; 
        let new_split_code = 0;
        let split_code = code.split('').length < 9 ? parseInt(code.split('')[0] + code.split('')[1] + code.split('')[2]) : parseInt(code.split('')[0] + code.split('')[1] + code.split('')[2] + code.split('')[3]);
        for(i=0;i<total;i++) {
          let db_code = result[0]['city'][i]['code'];
          let db_split_code = db_code.split('');
          if(db_split_code.length<9){
            new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2])
          } else {
            new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3]);
          }
          if(split_code === new_split_code) {
            new_data.push(result[0]['city'][i]);
          }
        }
        res.json(new_data)
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/province/:code/municipality', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    await MunicipalityRequest.find((err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        const new_data = []; 
        let new_split_code = 0;
        let split_code = code.split('').length < 9 ? parseInt(code.split('')[0] + code.split('')[1] + code.split('')[2]) : parseInt(code.split('')[0] + code.split('')[1] + code.split('')[2] + code.split('')[3]);
        for(i=0;i<total;i++) {
          let db_code = result[0]['municipality'][i]['code'];
          let db_split_code = db_code.split('');
          if(db_split_code.length<9){
            new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2])
          } else {
            new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3]);
          }
          if(split_code === new_split_code) {
            new_data.push(result[0]['municipality'][i]);
          }
        }
        res.json(new_data)
      }
    });
  } catch (error) {
    next(error);
  }
});

/* city */

router.get('/city', apiLimit, async (req, res, next) => {
  try {
    const data = await CityRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

router.get('/city/:code', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    const data = await CityRequest.find({
      'city.code': code
    }, (err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        for(i=0;i<total;i++) {
          let db_code = result[0]['city'][i]['code'];
          let db_obj = result[0]['city'][i];
          if(code==db_code) {
            res.json(db_obj)
          }
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

/* barangay (for city) */

router.get('/city/:code/barangay', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    await BarangayRequest.find((err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        const new_data = []; 
        let new_split_code = 0;
        let split_code = code.split('').length < 9 ? parseInt(code.split('')[0] + code.split('')[1] + code.split('')[2] + code.split('')[3] + code.split('')[4] + code.split('')[5]) : parseInt(code.split('')[0] + code.split('')[1] + code.split('')[2] + code.split('')[3] + code.split('')[4] + code.split('')[5] + code.split('')[6]);
        for(i=0;i<total;i++) {
          let db_code = result[0]['barangay'][i]['code'];
          let db_split_code = db_code.split('');
          if(db_split_code.length<9){
            new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3] + db_code[4] + db_code[5])
          } else {
            new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3] + db_code[4] + db_code[5] + db_code[6]);
          }
          if(split_code === new_split_code) {
            new_data.push(result[0]['barangay'][i]);
          }
        }
        res.json(new_data)
      }
    });
  } catch (error) {
    next(error);
  }
});

/* municipality */

router.get('/municipality', apiLimit, async (req, res, next) => {
  try {
    const data = await MunicipalityRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

router.get('/municipality/:code', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    const data = await MunicipalityRequest.find({
      'municipality.code': code
    }, (err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        for(i=0;i<total;i++) {
          let db_code = result[0]['municipality'][i]['code'];
          let db_obj = result[0]['municipality'][i];
          if(code==db_code) {
            res.json(db_obj)
          }
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

/* barangay (for municipality) */

router.get('/municipality/:code/barangay', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    await BarangayRequest.find((err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        const new_data = []; 
        let new_split_code = 0;
        let split_code = code.split('').length < 9 ? parseInt(code.split('')[0] + code.split('')[1] + code.split('')[2] + code.split('')[3] + code.split('')[4] + code.split('')[5]) : parseInt(code.split('')[0] + code.split('')[1] + code.split('')[2] + code.split('')[3] + code.split('')[4] + code.split('')[5] + code.split('')[6]);
        for(i=0;i<total;i++) {
          let db_code = result[0]['barangay'][i]['code'];
          let db_split_code = db_code.split('');
          if(db_split_code.length<9){
            new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3] + db_code[4] + db_code[5])
          } else {
            new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2] + db_code[3] + db_code[4] + db_code[5] + db_code[6]);
          }
          if(split_code === new_split_code) {
            new_data.push(result[0]['barangay'][i]);
          }
        }
        res.json(new_data)
      }
    });
  } catch (error) {
    next(error);
  }
});

/* barangay */ 

router.get('/barangay', apiLimit, async (req, res, next) => {
  try {
    const data = await BarangayRequest.find();
    res.json(data);
  } catch(error) {
    next(error);
  }
});

router.get('/barangay/:code', apiLimit, async (req, res, next) => {
  try {
    const { code } = req.params;
    const data = await BarangayRequest.find({
      'barangay.code': code
    }, (err, result) => {
      if(err) {
        next(error);
      } else {
        const total = parseInt(result[0]['total']);
        for(i=0;i<total;i++) {
          let db_code = result[0]['barangay'][i]['code'];
          let db_obj = result[0]['barangay'][i];
          if(code==db_code) {
            res.json(db_obj)
          }
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
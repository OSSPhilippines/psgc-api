const BarangayRequest = require("../models/barangayRequest");
const handleAsync = require("../utils/handleAsync");

/**
 * !PATH: /barangay
 */
const getAllBarangays = handleAsync(async (req, res, next) => {
  const data = await BarangayRequest.find();
  res.json(data);
});
/**
 * !PATH: /barangay/:code
 */
const getABarangay = handleAsync(async (req, res, next) => {
  const { code } = req.params;
  const [data] = await BarangayRequest.find({ "barangay.code": code });
  if (!data) throw new Error("No Results Found");

  const totalNumOfBarangays = parseInt(data.total);

  for (i = 0; i < totalNumOfBarangays; i++) {
    let db_code = data.barangay[i]["code"];
    let db_obj = data.barangay[i];
    if (code == db_code) {
      res.json(db_obj);
      break;
    }
  }
});

module.exports = {
  getAllBarangays,
  getABarangay,
};

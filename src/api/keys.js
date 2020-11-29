const shortid = require('shortid');
const ApiKey = require('../models/apiKeys');
const handleAsync = require('../utils/handleAsync');
const encryptKey = require('../utils/encryptKey');

/**
 * !PATH: /key
 */
const getApiKey = handleAsync(async (req, res, next) => {

    const randomKey = shortid.generate();

    const randomKeyEncrypted = encryptKey(randomKey)

    await ApiKey.create({ key: randomKeyEncrypted });

    res.json({ key: randomKey });

})

module.exports = { getApiKey };
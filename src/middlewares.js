const ApiKey = require('./models/apiKeys');
const encryptKey = require('./utils/encryptKey');
const handleAsync = require('./utils/handleAsync');

const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '☕' : error.stack,
    });
}

const checkApiKey = handleAsync(async (req, res, next) => {
    const { key } = req.query;

    if (!key) throw new Error('Please provide a valid API key')

    const encryptedKeyQuery = encryptKey(key);

    const [foundKey] = await ApiKey.find({ key: encryptedKeyQuery })

    if (!foundKey) throw new Error('Please provide a valid API key')

    next()
})

module.exports = {
    notFound,
    errorHandler,
    checkApiKey
}
const crypto = require('crypto');

const encryptKey = text => {
    return crypto.createHmac('sha256', process.env.API_SECRET)
        .update(text)
        .digest('hex');
}

module.exports = encryptKey;
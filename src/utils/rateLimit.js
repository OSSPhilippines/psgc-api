const rateLimit = require("express-rate-limit");

const apiLimit = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 200, // limit of each IP
    message: "Uh oh! You have reached the maximum api call (200 calls per day)",
    headers: true
});

module.exports = apiLimit;
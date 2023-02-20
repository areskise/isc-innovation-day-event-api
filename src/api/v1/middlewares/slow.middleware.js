const slowDown = require('express-slow-down');

const speedLimiter1p1 =  slowDown({
    windowMs: 60 * 1000, // 1 minutes
    delayAfter: 1, // allow 1 requests per 1 minutes, then...
    delayMs: 100 // time deplay...
})

module.exports = {
    speedLimiter1p1
}
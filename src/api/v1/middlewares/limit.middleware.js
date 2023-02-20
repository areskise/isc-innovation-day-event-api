const rateLimit = require('express-rate-limit');


const apiLimiter5p5 =  rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 5,
        handler: function (req, res) {
            res.status(429).send({
                ResponseResult:{
                    ErrorCode: 429,
                    Message: "Too many requests!"
                }
            });
        },
})

const apiLimiter1p1 =  rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 1,
    handler: function (req, res) {
        res.status(429).send({
            ResponseResult:{
                ErrorCode: 429,
                Message: "Too many requests!"
            }
        });
    },
})

const apiLimiter1h5 =  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 h
    max: 5,
    handler: function (req, res) {
        res.status(429).send({
            ResponseResult:{
                ErrorCode: 429,
                Message: "Too many requests!"
            }
        });
    },
})

module.exports = {
    apiLimiter5p5,
    apiLimiter1p1,
    apiLimiter1h5
}
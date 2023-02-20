const jwt = require("jsonwebtoken");

let generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await jwt.sign(
            { payload },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife
            }
        )
    } catch (error) {
        throw error
    }
}

let verifyToken = async (token, secretKey) => {
    try {
        return await jwt.verify(token, secretKey);
    } catch (error) {
        throw error
    }
}

let decodedToken = async (token, secretKey) => {
    try {
        return await jwt.verify(token, secretKey, {
            ignoreExpiration: true,
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    decodedToken: decodedToken
};
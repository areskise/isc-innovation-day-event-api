const { rsErrorOperation, rsSuccess, rsError } = require("../helpers/response")
const thirdParty = require('../helpers/thirdParty.api')
const config = require('../../../config')
const { SERVICE_INNOVATION_API, } = require("../helpers/constant")

const getToken = async (req, res) => {
    try {
        const { file_type } = req.body
        const user = req.jwtDecode;
        const bodyToken = {
            api_key: config.api_key,
            file_time: config.file_time,
            file_type,
            user_name: SERVICE_INNOVATION_API + " - " + user.email
        }

        thirdParty.getTokenIstorage(bodyToken)
            .then((value) => res.json(rsSuccess(value)))
            .catch((reason) => {
                console.log("Error in get token: ", reason)
                res.json(rsError(410, "Lỗi get token istorage"))
            })

    } catch (error) {
        console.log("Error operate in get token istorage: ", error);
        res.json(rsErrorOperation(error))
    }
}


module.exports = {
    getToken,
}
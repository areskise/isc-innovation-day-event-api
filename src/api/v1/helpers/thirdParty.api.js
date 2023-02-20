
const request = require("request");
const config = require("../../../config/index");
const { API_GET_TOKEN } = require("../helpers/constant")
const sendMail = (body) => {
    return new Promise(function (resolve, reject) {
        var options = {
            url: config.url_send_mail,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            json: true,
            body: body
        };


        request(options, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                resolve(body);
            } else if (error) {
                reject(error);
            }
        });
    });
}

const getTokenIstorage = (body) => {
    return new Promise(function (resolve, reject) {
        var options = {
            url: config.host_istorage + API_GET_TOKEN,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            json: true,
            body: body
        };
        console.log("option get token istorage: ", options);

        request(options, function (error, response, body) {

            if (!error && response.statusCode == 200) {

                if (body.ErrorCode == 0) {
                    resolve(body.Result);
                }

                reject(body);
            } else if (error) {
                console.log("response in third party: ", response);
                reject(error);
            }
        });
    });
}

const uploadIstorage = (body) => {
    return new Promise(function (resolve, reject) {
        var options = {
            url: config.host_istorage + API_GET_TOKEN,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            json: true,
            body: body
        };
        console.log("option get token istorage: ", options);

        request(options, function (error, response, body) {

            if (!error && response.statusCode == 200) {

                if (body.ErrorCode == 0) {
                    resolve(body.Result);
                }

                reject(body);
            } else if (error) {
                console.log("response in third party: ", response);
                reject(error);
            }
        });
    });
}

module.exports = {
    sendMail,
    getTokenIstorage,
    uploadIstorage
}
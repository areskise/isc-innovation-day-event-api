const  config  = require('../../../config/index');

exports.rsError = (ErrorCode, Message) => {
  return { ResponseResult: { ErrorCode, Message, Result: null } };
};

exports.rsErrorOperation = (error) => {
    if(config.env === "local" || config.env === "development"){
      return {
        ResponseResult: {
          ErrorCode: 402,
          Message: "Error during operation " + JSON.stringify(error),
          Result: error,
        }
      };
    } else {
      return {
        ResponseResult: {
          ErrorCode: 402,
          Message: "Error during operation ",
          Result: null,
        }
      };
    }
};

exports.rsErrorNotFound = (ms = "") => {
  return { ResponseResult: { ErrorCode: 404, Message: "Find not found " + ms, Result: null } };
};

exports.rsSuccess = (Result = null) => {
  return { ResponseResult: { ErrorCode: 0, Message: "Success", Result } };
};

exports.rsErrorUnauthenticated = () => {
  return { ResponseResult: { ErrorCode: 401, Message: "Unauthenticated", Result: null } }
};

exports.rsErrorUnauthorized = () => {
  return { ResponseResult: { ErrorCode: 401, Message: "Unauthorized", Result: null } }
};

exports.rsErrorExpired = () => {
  return { ResponseResult: { ErrorCode: 401, Message: "Token expired !", Result: null } }
};

exports.rsErrorManyRequest = () => {
  return { ResponseResult: { ErrorCode: 429, Message: "Too many requests! ", Result: null } };
};

exports.response = (errcode, message, result) => {
  return {
    ResponseResult: {
      ErrorCode: errcode,
      Message: message || 'Something wrong!',
      Result: result || null
    }
  };
}

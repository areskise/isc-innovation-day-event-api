const jwt = require('../helpers/jwt');
const { rsErrorUnauthenticated, rsError, rsErrorExpired, rsErrorUnauthorized } = require('../helpers/response');
const config = require('../../../config/index');

const userModel = require('../user/user.model');

const isAuth = async (req, res, next) => {
  try {
    const tokenFromClient = req.token;
    if (!tokenFromClient) {
      return res.json(rsErrorUnauthenticated());
    }

    const verified = await jwt.verifyToken(
      tokenFromClient,
      config.token_secret
    );

    if (!verified) {
        return res.json(rsError(401, "Token invalid", null));
    } else {
      const decoded = await jwt.decodedToken(
        tokenFromClient,
        config.token_secret
      );
      const data = decoded.payload;
      
      const user = await userModel.findUserByEmail(data.email);
      if(user === null){
        return res.json(rsError(401, "Token invalid", null));
      }
      req.jwtDecode = user;

      return next();
      
    }
  } catch (error) {
    return res.json(rsError(400, error.message));
  }
}

const isAuthOption = async (req, res, next) => { //just check auth or not auth => always next 
  try {
    const tokenFromClient = req.token;
    
    if (!tokenFromClient) {
      return next();
    }

    const verified = await jwt.verifyToken(
      tokenFromClient,
      config.token_secret
    );
    
    if (!verified) {
      return next()
    } else {
      const decoded = await jwt.decodedToken(
        tokenFromClient,
        config.token_secret
      );
      const data = decoded.payload;
      
      const user = await userModel.findUserByEmail(data.email);
     
      if(user === null){
        return next();
      }
      req.jwtDecode = user;

      console.log(req.jwtDecode);
      return next();
      
    }
  } catch (error) {
    return res.json(rsError(400, error.message));
  }
}


module.exports = {
  isAuth,
  isAuthOption
}
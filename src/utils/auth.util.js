const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { AuthenticationError } = require('apollo-server-express');
const {UserService} = require('../services');
const secret = 'secret';

const sign = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });
const verify = (token, cb) => jwt.verify(token, secret, {}, cb);
const authenticate = (req, res, next) => {
  const parts = req.header.get('Authorization').split(' ');
  if (parts.length !== 2) {
    throw new createError.Unauthorized('Unauthorized');
  }

  const preAuth = parts[0];
  if (preAuth !== 'Bearer') {
    throw new createError.Unauthorized('Authorization formated [Bearer token]');
  }
  const token = parts[1];
  return verify(token, (error, thisToken) => {
    if (error) {
      throw new createError.Unauthorized('Unauthorized');
    } else {
      req.token = thisToken;
      return next();
    }
  });
};

const getUser = async (token, models) => {
  if (!token) {
    return {
      user: null,
    };
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    const { id } = decodedToken;
    const user = await models.UsersModel.findOne({ _id: id });
    return { user };
  } catch (e) {
    console.log(e);
    throw new AuthenticationError('Unauthorized');
  }
};

module.exports = {
  sign,
  verify,
  authenticate,
  getUser,
};

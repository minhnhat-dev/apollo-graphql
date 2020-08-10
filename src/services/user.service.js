const { UsersModel } = require('../models');

const count = async (query) => UsersModel.countDocuments({ query });

const create = async (user) => UsersModel.create(user);

const update = (id, data) => UsersModel.updateOne({ _id: id }, { $set: data });

const findOne = async (query = {}, options = {}) => {
  const { select } = options;
  return UsersModel.findOne(query).lean().exec();
};

const find = async (filter = {}, options) => {
  const { skip, limit } = options;
  return UsersModel.find(filter).setOptions({ skip, limit }).lean().exec();
};

module.exports = {
  count,
  find,
  create,
  update,
  findOne,
};

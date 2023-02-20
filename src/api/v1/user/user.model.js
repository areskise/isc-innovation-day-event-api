const userSchema = require('./user.schema');

const findUserByEmail = async (email) => {
  try {
    const user = await userSchema.findOne({
      email: new RegExp(email, 'i'),
      is_delete: 0,
    }).setOptions({ sanitizeFilter: true })
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

const loadDep = async () => {
  try {
    const dep = await userSchema.find({}).lean().distinct('department');
    return dep;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  findUserByEmail,
  loadDep,
}

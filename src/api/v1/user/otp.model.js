const moment = require("moment");
const otpSchema = require("./otp.schema");

const findGenOtp = async (query) => {
  try {

    await otpSchema.updateMany({ ...query, expiredTime: { $lt: moment().add(1, 'm') } }, { isActive: 0 })
    
    const activeQuery = {
      ...query,
      isActive: 1,
      is_delete: 0,
    }

    const otpFound = await otpSchema.findOne(activeQuery);
    return otpFound;

  } catch (error) {
    throw error;
  }
}

const findOtpActive = async (query) => {
  try {

    await otpSchema.updateMany({ expiredTime: { $lt: Date.now() } }, { isActive: 0 })

    const activeQuery = {
      ...query,
      isActive: 1,
      is_delete: 0,
    }

    const otpFound = await otpSchema.findOne(activeQuery);
    return otpFound;

  } catch (error) {
      throw error
  }
}

const createOtp = async (body) => {
  try {
    let expiredTime = moment().add(5, 'm')

    const otpCreated = new otpSchema({
        ...body,
        expiredTime,
        create_by: body.email
    })

    otpCreated.save();

    return otpCreated;

  } catch (error) {
    console.log("create otp err: ", error);
    throw error;
  }
}

const updateOtp = async (query, updateBody) => {
  try {
      updateBody.update_date = Date.now()

      const otpUpdated = await otpSchema.findByIdAndUpdate(query, updateBody);
      return otpUpdated
  } catch (error) {
      throw error
  }
}

module.exports = {
    findGenOtp,
    findOtpActive,
    createOtp,
    updateOtp,
}
const otpGenerator = require("otp-generator");

const { OTP_VALID_TIME } = require("../constants");

const otpStore = new Map(); // In-memory store

const generateOTP = async (email) => {
  try {
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await storeOTP(email, otp);
    return otp;
  } catch (error) {
    console.error("Error while generating OTP!!", error);
    process.exit(1);
  }
};

const storeOTP = async (email, otp) => {
  try {
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + OTP_VALID_TIME * 1000,
    });
    console.log("OTP successfully stored in memory!");
  } catch (error) {
    console.error("Error while storing OTP in memory!!", error);
  }
};

const getStoredOTP = async (email) => {
  try {
    const data = otpStore.get(email);
    if (!data) return null;

    const { otp, expiresAt } = data;

    if (Date.now() > expiresAt) {
      otpStore.delete(email);
      return null;
    }

    return otp;
  } catch (error) {
    console.error("Error while getting stored OTP!!", error);
  }
};

const removeStoredOTP = async (email) => {
  try {
    const result = otpStore.delete(email);
    if (result) {
      console.log("OTP successfully removed from memory!");
    } else {
      console.log("No OTP found for the provided email to remove.");
    }
  } catch (error) {
    console.error("Error while removing OTP from memory!", error);
  }
};

module.exports = { generateOTP, getStoredOTP, removeStoredOTP };

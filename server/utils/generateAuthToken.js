const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')
const {config} = require("dotenv");
/**
 * Method to generate a signed JWT Token
 * @param {object || string} data information to sign with JWT
 * @param {date} timeToLive instance of the day.js packacge
 * @returns {text} JWT signed token
 */

const generateToken = (data, timeToLive) => {
    const payload = {
        data,
        expiryTime: timeToLive.unix()
    };
    return jwt.sign(payload, config.JWT_SECRET)
}

module.exports = {generateToken}
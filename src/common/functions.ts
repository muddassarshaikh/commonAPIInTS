import config from '../config';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import fs from 'fs';
import { errorHandler } from './error';
const status = config.env;

/**
 * Function for Encrypting the data
 */
function encryptData(data) {
  if (status === 'development') {
    return data;
  } else {
    var dataString = JSON.stringify(data);
    var response = CryptoJS.AES.encrypt(dataString, config.cryptokey);
    return { encResponse: response.toString() };
  }
}

/**
 * Function for decrypting the data
 */
function decryptData(data) {
  if (status === 'development') {
    return data;
  } else {
    var decrypted = CryptoJS.AES.decrypt(data, config.cryptokey);
    if (decrypted) {
      var userinfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      return userinfo;
    } else {
      return { userinfo: { error: 'Please send proper token' } };
    }
  }
}

/**
 * Function for Encrypting the password
 */
function encryptPassword(data) {
  var response = CryptoJS.AES.encrypt(data, config.tokenkey);
  return response.toString();
}

/**
 * Function for decrypting the password
 */
function decryptPassword(data) {
  var decrypted = CryptoJS.AES.decrypt(data, config.tokenkey);
  if (decrypted) {
    var userinfo = decrypted.toString(CryptoJS.enc.Utf8);
    return userinfo;
  } else {
    return { userinfo: { error: 'Please send proper token' } };
  }
}

/**
 * Function for encryting the userId with session
 */
async function tokenEncrypt(data) {
  var token = await jwt.sign({ data: data }, config.tokenkey, {
    expiresIn: 24 * 60 * 60,
  }); // Expires in 1 day
  return token;
}

/**
 * Function for decryting the userId with session
 */
async function tokenDecrypt(data) {
  try {
    const decode = await jwt.verify(data, config.tokenkey);
    return decode;
  } catch (error) {
    return error;
  }
}

/**
 * Function for creating response
 */
function responseGenerator(code, message, data) {
  var details = {
    code: code,
    message: message,
    result: data,
  };

  if (status === 'development') {
    return details;
  } else {
    return encryptData(details);
  }
}

/**
 * Function for sending email
 */
async function sendEmail(to, subject, message) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.SMTPemailAddress,
      pass: config.SMTPPassword,
    },
  });

  var mailOptions = {
    from: 'developers.winjit@gmail.com',
    to: to,
    subject: subject,
    html: message,
  };

  try {
    const smsDetails = await transporter.sendMail(mailOptions);
    return smsDetails;
  } catch (error) {
    errorHandler(error);
  }
}

/**
 * Function to randomly generate string
 */
function generateRandomString(callback) {
  var referralCode = randomstring.generate({
    length: 9,
    charset: 'alphanumeric',
    capitalization: 'uppercase',
  });
  callback(referralCode);
}

/* 
  Generate random string of specific size, 
  which used  for generating random password in create user by admin.
*/
function randomPasswordGenerater(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Function for Uploading file
 */
async function uploadFile(fileInfo) {
  try {
    const fileType = fileInfo.fileType;
    const fileName = `${fileInfo.fileName}.${fileType}`;
    var base64 = fileInfo.base64.split(';base64,')[1];
    var fileBuffer = Buffer.from(base64, 'base64');
    if (!fs.existsSync('./public/' + fileInfo.pathInfo)) {
      await fs.mkdirSync('./public/' + fileInfo.pathInfo, { recursive: true });
    }
    await fs.writeFileSync(
      './public/' + fileInfo.pathInfo + fileName,
      fileBuffer,
      'utf8'
    );
    return { fileName: fileName };
  } catch (e) {
    throw e;
  }
}

export default {
  encryptData,
  decryptData,
  encryptPassword,
  decryptPassword,
  tokenEncrypt,
  tokenDecrypt,
  responseGenerator,
  sendEmail,
  generateRandomString,
  randomPasswordGenerater,
  uploadFile,
};

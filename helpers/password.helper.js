const crypto = require('crypto');

/**
 * Generate hashed password.
 * 
 * @param {String} password 
 * @returns 
 */
const generateHasedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

module.exports = generateHasedPassword;

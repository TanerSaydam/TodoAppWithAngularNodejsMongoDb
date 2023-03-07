const jwt = require("jsonwebtoken");

const secretKey = "Gizli anahtar 123 Gizli anahtar 123 Gizli anahtar 123";

const options = {
    expiresIn: "1d",
};

const token = (payload) =>{
    return jwt.sign(payload, secretKey, options);
}

module.exports = token;
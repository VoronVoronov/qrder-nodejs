const jwt = require("jsonwebtoken"),
    config = process.env,
    i18n = require("../traits/i18n");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({message: i18n.__("token_is_requried")});
  }
  try {
    req.user = jwt.verify(token, config.TOKEN_KEY);
  } catch (err) {
    return res.status(401).send({message: i18n.__("token_is_invalid")});
  }
  return next();
};

module.exports = verifyToken;

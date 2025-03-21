require("dotenv").config();

function verifySecretKey(req, res, next) {
  const providedKey = req.headers["x-api-key"];
  if (!providedKey || providedKey !== process.env.SECRET_KEY) {
    return res.status(403).json({ message: "Forbidden: Invalid Secret Key" });
  }
  next();
}

module.exports = { verifySecretKey };

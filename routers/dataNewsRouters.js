const express = require("express");
const router = express.Router();
const {
  addDataHandler,
  addDataVideoHandler,
  getAllDataHandler,
} = require("../controllers/dataNewsController");
const { verifySecretKey } = require("../middlewares/authMiddleware");
// Router add data
router.get("/", getAllDataHandler);

router.post("/", verifySecretKey, addDataHandler);

router.post("/video", verifySecretKey, addDataVideoHandler);

module.exports = router;

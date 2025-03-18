const express = require("express");
const router = express.Router();
const {
  addDataHandler,
  addDataVideoHandler,
} = require("../controllers/dataController");
const { verifySecretKey } = require("../middlewares/authMiddleware");
// Router add data
router.post("/", verifySecretKey, addDataHandler);

router.post("/video", verifySecretKey, addDataVideoHandler);

// Webhook endpoints
router.post("/perform");

router.post("/generation/audio");

router.post("/format/audio");

router.post("/generation/video/1");

router.post("/generation/video/2");

router.post("/generation/video/3");

router.post("/merge/video");

router.post("/upload/videoYoutube");

module.exports = router;

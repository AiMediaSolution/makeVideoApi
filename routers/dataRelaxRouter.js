const express = require("express");
const router = express.Router();
const {
  addDataRelaxHandler,
  updateDataVideoRelaxHandler,
  getAllDataRelaxHandler,
  publicVideoRelaxHandler,
  updateStatusRelaxHandler,
  checkAndSendPendingDataController,
} = require("../controllers/dataRelaxController");
const { verifySecretKey } = require("../middlewares/authMiddleware");
// Router add data
router.post("/", verifySecretKey, addDataRelaxHandler);
// Get all data Relax
router.get("/", verifySecretKey, getAllDataRelaxHandler);
//Public video on youtube
router.patch("/publicVideoRelax/:id", verifySecretKey, publicVideoRelaxHandler);

//Update status
router.patch("/updateStatus/:id", verifySecretKey, updateStatusRelaxHandler);

// Update data (video id, video_url, status_video) can set null
router.patch(
  "/updateDataVideo/:id",
  verifySecretKey,
  updateDataVideoRelaxHandler
);

module.exports = router;

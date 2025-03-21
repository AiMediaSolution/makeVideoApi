const {
  addDataRelax,
  updateDataVideoRelax,
  getAllDataRelax,
  publicVideoRelax,
  updateStatusRelax,
  checkPendingData,
} = require("../models/dataRelaxModel");
const { broadcast } = require("../webSocketServer");
const { generateFileName } = require("../utils/fileHelper");
function addDataRelaxHandler(req, res) {
  const status = "pending";
  const { title, image_url, description } = req.body;
  const fileName = generateFileName("file");
  addDataRelax(fileName, title, status, image_url, description, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Data added table video successfully" });
    checkPendingData((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      if (rows === true) {
        const dataB = { status: "none" };
        broadcast("generationRelax", dataB);
      }
      broadcast("generationRelax", rows);
    });
  });
}
function updateDataVideoRelaxHandler(req, res) {
  const { id } = req.params;
  const { video_id, video_url, status_video } = req.body;
  updateDataVideoRelax(id, video_id, video_url, status_video, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      message: "Update video data in data_generation_relax successfully",
    });
  });
}
function getAllDataRelaxHandler(req, res) {
  getAllDataRelax((err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json(rows);
  });
}
function updateStatusRelaxHandler(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  updateStatusRelax(id, status, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      message: "Update status of data successfully",
    });
  });
  checkPendingData((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows === true) {
      const dataB = { status: "none" };
      broadcast("generationRelax", dataB);
    }
    broadcast("generationRelax", rows);
  });
}
function publicVideoRelaxHandler(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing video ID" });
  }
  publicVideoRelax(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      message: "Public on youtube successfully",
    });
  });
}
function checkAndSendPendingData(req, res) {
  checkPendingData((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows === true) {
      return res.status(200).json(true);
    }
    res.status(200).json(rows);
  });
}

module.exports = {
  addDataRelaxHandler,
  updateDataVideoRelaxHandler,
  getAllDataRelaxHandler,
  updateStatusRelaxHandler,
  publicVideoRelaxHandler,
};

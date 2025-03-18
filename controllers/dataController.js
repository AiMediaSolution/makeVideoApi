const {
  addData,
  addDescription,
  addImage,
  addDataVideo,
} = require("../models/dataModel");
const { broadcast } = require("../webSocketServer");
const { generateFileName } = require("../utils/fileHelper");
const { error } = require("console");
function addDataHandler(req, res) {
  const { title, status, description, imageUrl } = req.body;
  const fileName = generateFileName("file");
  addData(title, fileName, status, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    addDescription(id, description, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      addImage(id, imageUrl, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
      });

      const dataBroadcast = {
        id: id,
        fileName: generateFileName("file"),
        title: title,
        description: description,
        imageUrl: imageUrl,
        status: status,
      };
      broadcast("generation", dataBroadcast);
      res.status(201).json({
        message: "Add data to table Data, image, description successfully",
        id,
      });
    });
  });
}
function addDataVideoHandler(req, res) {
  const { id_data, title, video_id, video_url } = req.body;
  addDataVideo(id_data, title, video_id, video_url, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Data added table video successfully" });
  });
}

module.exports = {
  addDataHandler,
  addDataVideoHandler,
};

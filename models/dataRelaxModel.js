const { db } = require("../database");

function addDataRelax(
  fileName,
  title,
  status,
  image_url,
  description,
  callback
) {
  db.run(
    `INSERT INTO data_generation_relax (fileName, title , status, is_youtube, image_url, description) VALUES (?, ?, ?, FALSE, ?, ?)`,
    [fileName, title, status, image_url, description],
    function (err) {
      if (err) {
        return callback(err, null);
      }
      callback(null, this.lastID);
    }
  );
}
function updateDataVideoRelax(id, video_id, video_url, status_video, callback) {
  db.run(
    `UPDATE data_generation_relax SET video_id = ? , video_url = ?, status_video = ?  WHERE id = ?`,
    [video_id, video_url, status_video, id],
    callback
  );
}

function updateStatusRelax(id, status, callback) {
  db.run(
    `UPDATE data_generation_relax SET status = ?  WHERE id = ?`,
    [status, id],
    callback
  );
}
function publicVideoRelax(id, callback) {
  db.run(
    `UPDATE data_generation_relax SET is_youtube = TRUE WHERE id = ?`,
    [id],
    callback
  );
}
function getAllDataRelax(callback) {
  db.all(`SELECT * FROM data_generation_relax`, callback);
}

function checkPendingData(callback) {
  db.get(
    `SELECT * FROM data_generation_relax WHERE status = ? ORDER BY id ASC LIMIT 1`,
    ["pending"],
    (err, row) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, row || true);
    }
  );
}

module.exports = {
  addDataRelax,
  updateDataVideoRelax,
  updateStatusRelax,
  publicVideoRelax,
  getAllDataRelax,
  checkPendingData,
};

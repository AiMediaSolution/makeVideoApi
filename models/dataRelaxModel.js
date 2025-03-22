const { db } = require("../database");

function addDataRelax(
  fileName,
  title,
  status,
  image_url,
  description,
  kling_prompt,
  callback
) {
  db.run(
    `INSERT INTO data_generation_relax (fileName, title, description, status, is_youtube_public, image_url, kling_prompt) VALUES (?, ?, ?, ?, FALSE, ?, ?)`,
    [fileName, title, description, status, image_url, kling_prompt],
    function (err) {
      if (err) {
        return callback(err, null);
      }
      callback(null, this.lastID);
    }
  );
}
function updateDataVideoRelax(
  id,
  kling_task_id,
  kling_video_url,
  kling_status_video,
  youtube_video_id,
  callback
) {
  const fields = [];
  const values = [];

  if (kling_task_id !== undefined) {
    fields.push("kling_task_id = ?");
    values.push(kling_task_id);
  }
  if (kling_video_url !== undefined) {
    fields.push("kling_video_url = ?");
    values.push(kling_video_url);
  }
  if (kling_status_video !== undefined) {
    fields.push("kling_status_video = ?");
    values.push(kling_status_video);
  }
  if (youtube_video_id !== undefined) {
    fields.push("youtube_video_id = ?");
    values.push(youtube_video_id);
  }

  if (fields.length === 0) {
    return callback(new Error("Không có dữ liệu để cập nhật"));
  }

  values.push(id);

  const sql = `UPDATE data_generation_relax SET ${fields.join(
    ", "
  )} WHERE id = ?`;

  db.run(sql, values, callback);
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

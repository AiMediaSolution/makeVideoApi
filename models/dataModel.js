const { db } = require("../database");

function addData(title, fileName, status, callback) {
  db.run(
    `INSERT INTO data (title, fileName, status, is_youtube) VALUES (?, ?, ?, FALSE)`,
    [title, fileName, status],
    function (err) {
      if (err) {
        return callback(err, null);
      }
      callback(null, this.lastID);
    }
  );
}
function addDescription(id_data, contents, callback) {
  db.serialize(() => {
    const stmt = db.prepare(
      `INSERT INTO description (id_data, content) VALUES (?, ?)`
    );

    contents.forEach((content) => {
      stmt.run(id_data, content);
    });

    stmt.finalize((err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
}

function addImage(id_data, urls, callback) {
  db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO image (id_data, url) VALUES (?, ?)`);

    urls.forEach((url) => {
      stmt.run(id_data, url);
    });

    stmt.finalize((err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
}
function addDataVideo(id_data, title, video_id, video_url, callback) {
  db.run(
    `INSERT INTO video (id_data, title, video_id, video_url) VALUES (?, ?, ?, ?)`,
    [id_data, title, video_id, video_url],
    callback
  );
}

module.exports = {
  addData,
  addDescription,
  addImage,
  addDataVideo,
};

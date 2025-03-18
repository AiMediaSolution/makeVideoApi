const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.join(__dirname, "../data/database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Create account table
    db.run(
      `CREATE TABLE IF NOT EXISTS data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fileName TEXT,
          title TEXT NOT NULL,
          status TEXT,
          is_youtube BOOLEAN DEFAULT FALSE
        )`,
      (err) => {
        if (err) {
          console.error("Error creating data table:", err.message);
        } else {
          console.log("Data table created or already exists.");
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS image (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_data INTEGER NOT NULL,
          url TEXT,
          FOREIGN KEY (id_data) REFERENCES data(id) ON DELETE CASCADE
        )`,
      (err) => {
        if (err) {
          console.error("Error creating image table:", err.message);
        } else {
          console.log("Image table created or already exists.");
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS description (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_data INTEGER NOT NULL,
          content TEXT,
          FOREIGN KEY (id_data) REFERENCES data(id) ON DELETE CASCADE
        )`,
      (err) => {
        if (err) {
          console.error("Error creating description table:", err.message);
        } else {
          console.log("Description table created or already exists.");
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS video (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_data INTEGER NOT NULL,
          title TEXT,
          video_id TEXT,
          video_url TEXT, 
          FOREIGN KEY (id_data) REFERENCES data(id) ON DELETE CASCADE
        )`,
      (err) => {
        if (err) {
          console.error("Error creating video table:", err.message);
        } else {
          console.log("Video table created or already exists.");
        }
      }
    );
  });
}

module.exports = { db, initializeDatabase };

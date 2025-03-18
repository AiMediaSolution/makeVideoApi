const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { initializeDatabase } = require("./database");
const http = require("http");
const { wss } = require("./webSocketServer");

const app = express();
const PORT = 4000;

// initialize DataBase
initializeDatabase();
app.use(bodyParser.json());
app.use(cors());

// websocket
const server = http.createServer(app);
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
// Import routers
const dataRouters = require("./routers/dataRouters");

// Use routers
app.use("/data", dataRouters);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const WebSocket = require("ws");
const rooms = {};

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "join") {
      const roomName = data.room;
      if (!rooms[roomName]) {
        rooms[roomName] = { clients: [] };
      }

      rooms[roomName].clients.push(ws);
      ws.room = roomName;

      console.log(`Client joined room: ${roomName}`);
    }
    if (data.type === "message" && ws.room) {
      console.log(`Broadcasting message to ${ws.room}...`);
      if (rooms[ws.room]) {
        rooms[ws.room].clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      }
    }
  });

  ws.on("close", () => {
    if (ws.room && rooms[ws.room]) {
      rooms[ws.room].clients = rooms[ws.room].clients.filter(
        (client) => client !== ws
      );
      if (rooms[ws.room].clients.length === 0) {
        delete rooms[ws.room];
      }
    }
    console.log("Client disconnected");
  });
});

function broadcast(room, data) {
  if (!room || !rooms[room]) {
    console.log(`Room ${room} does not exist.`);
    return;
  }
  rooms[room].clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

module.exports = { wss, broadcast };

const WebSocket = require("ws");
const rooms = {};

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  const roomName = "generation";
  if (!rooms[roomName]) {
    rooms[roomName] = { clients: [], messages: [] };
  }
  rooms[roomName].clients.push(ws);
  ws.room = roomName;

  console.log(`Client joined room: ${roomName}`);

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("Broadcasting message...");
    if (rooms[roomName]) {
      rooms[roomName].clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  });

  ws.on("close", () => {
    if (rooms[roomName]) {
      rooms[roomName].clients = rooms[roomName].clients.filter(
        (client) => client !== ws
      );
      if (rooms[roomName].clients.length === 0) {
        delete rooms[roomName];
      }
    }
    console.log("Client disconnected");
  });
});

function broadcast(room, data) {
  if (!room || !rooms[room]) {
    console.log(`Room ${room} non-existent or non-existent client.`);
    return;
  }
  rooms[room].clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

module.exports = { wss, broadcast };

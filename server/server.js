// Websoket server

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  const userId = ws._socket.remotePort;
  // Отправляем userId клиенту сразу после подключения
  ws.send(JSON.stringify({ type: "init", userId }));

  ws.on("message", (message) => {
    const msgObj = {
      id: Date.now(),
      messages: message.toString(),
      userId
    };
    const json = JSON.stringify(msgObj);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(json);
      }
    });
  });
});

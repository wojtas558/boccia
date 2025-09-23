const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('działam');

  ws.on('message', (msg) => {
    console.log('Wiadomość: ' + msg.toString());

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

app.get('/', (req, res) => {
  res.json('Tutaj nic nie ma!');
});

server.listen(3030, () => console.log('działam server'));

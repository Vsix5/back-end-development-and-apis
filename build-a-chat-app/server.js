import http from 'http';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';
const PORT = 3001;

const server = http.createServer((req, res) => {
fs.readFile("./public/index.html", (err, data) => {
    if(err){
        res.writeHead(500);
        res.end("Error reading file");
        return;
    }
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(data);
})
})
const wss = new WebSocketServer({ server});

wss.on('connection', (socket, req) => {

    const username = new URL(req.url, "http://localhost").searchParams.get("username",);
    

    const joinPayload = JSON.stringify({
        type: "system",
        text: `${username} joined`
    })
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(joinPayload);
        }
    })
socket.on('message', (data) => {
    const { username, text } = JSON.parse(data);

    const msgPayload = JSON.stringify({
        type: 'chat',
        username,
        text
    });
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(msgPayload);
        }
    })
})
socket.on('close', () => {
    const payload = JSON.stringify({
        type: 'system',
        text: `${username} left`
    });
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN){
            client.send(payload)
        }
    })
});

})


server.listen(PORT, () => {
    console.log(`Chat server running at http://localhost:${PORT}`)
})
import http from "http";
import fs from "fs";
import { WebSocketServer} from "ws";
import os from "os"
const PORT = 3000;
const server = http.createServer((req, res) => {
    fs.readFile("./public/index.html", (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Error reading file");
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});
const wss = new WebSocketServer({ server })

wss.on('connection', (socket) => {
        console.log('Client connected');

   socket.on('message', (data) => {
    console.log("Recieved:", data.toString());
   })
   socket.on('close', () => {
    console.log('Client disconnected')
   });
   socket.on("error", (err) => {
    console.error("Socket error:", err)
   })
})


function getMetrics() {
return {
    loadAvg: os.loadAvg(),
    freeMemMB: (os.freemem() / 1024 / 1024).toFixed(0),
    totalMemMB: (os.totalmem() / 1024 / 1024).toFixed(0),
    memUsagePct: (
        ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
    ).toFixed(1),
}
}

server.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`)
});
import express from "express";
const app = express();
const PORT = 3000;
import weatherRouter from "./weather.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/weather", weatherRouter)

app.route("/api/data")
                      .get((req, res) => {
                        res.json({
                            "status": 200
                        })
                      })
                      .post((req, res) => {
                       res.status(201).json({
                        "status": 201
                       })
                      })
app.get("/api/info", (req, res) => {
    res.json({
        "name": "Weather Service",
        version: "1.0.0",
        endpoints: ["api/weather/:city", "/api/greet/:name", "/api/data"],
    })
})
app.get("public/index.html", (req, res) => {
    res.sendFile();
})

app.get("/api/status", (req, res) => {
    res.status(200).json({
        "status": 200
    })
})
app.get("/docs", (req, res) => {
    res.redirect("/api/info")
})

app.get("/api/greet/:name", (req, res) => {
    res.json({
        message: `Hello ${req.params.name}`
    })
})

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})
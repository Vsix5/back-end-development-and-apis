import express from "express";
import { inputCleaner, inputValidator } from "./middleware.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.redirect("/form")
})
app.get("/form", (req, res) => {
    res.send("Form Page");
})

app.use(express.urlencoded( {extended : true}));
app.post("/submit", inputCleaner, inputValidator,  (req, res) => {
res.send(`username: ${req.body.username}, comment: ${req.body.comment}`)
})
app.listen(port, () => {
    console.log(`App is running on ${port}`)
})
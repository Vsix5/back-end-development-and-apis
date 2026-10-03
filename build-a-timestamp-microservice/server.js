import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api", (req, res) => {
  const parsedDate = new Date();

  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});
app.get("/api/:date", (req, res) => {
  
  const { date } = req.params;

   let parsedDate;

   if(!date) {
    parsedDate = new Date();
   }
   else if(!isNaN(date)){
    parsedDate = new Date(parseInt(date));
   }

   else {
    parsedDate = new Date(date);
   }
if(parsedDate.toString() === "Invalid Date"){
  return res.json({
    error: "Invalid Date"
  })
}
return res.json({
  unix: parsedDate.getTime(),
  utc: parsedDate.toUTCString()
})
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

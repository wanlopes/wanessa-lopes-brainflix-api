const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const dataVideos = "./data/videos.json";
const videosRouter = "./routes/videos.js";
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
app.use(cors());
app.use("./routes/videos.js", videosRouter);

function readData() {
  try {
    const data = fs.readFileSync(dataVideos);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeData() {
  fs.writeFileSync(dataVideos, JSON.stringify);
}

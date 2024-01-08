const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const dataVideos = "./data/videos.json";
const videosRouter = "./routes/videos.js";
app.use(express.json());

require("dotenv").config();

const { PORT, BACKEND_URL } = process.env;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

const { CORS_ORIGIN } = process.env;
app.use(cors({ origin: CORS_ORIGIN}));
app.use("/videos", require(videosRouter));

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

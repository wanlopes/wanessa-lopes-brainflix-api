const express = require("express");
const fs = require("fs");

const app = express();
const dataVideos = "./data/videos.json";
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get('/videos', (req, res) => {
   res.send(readData());
});

app.get('/videos/:id', (req, res) => {
    const videos = readData();
    const video = videos.find((video) => video.id === req.params.id);
    if(video) {
        res.json(video);
    } else {
        res.status(404).json({message:"Video not Found"});
    }
});

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

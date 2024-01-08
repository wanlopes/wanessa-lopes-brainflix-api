const module = require("module");
const router = express.Router();
const dataVideos = "./data/videos.json";

router.get("/videos", (req, res) => {
  const videos = readData().map((video) => ({
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
  }));
  res.send(videos);
});

router.get("/videos/:id", (req, res) => {
  const videos = readData();
  const video = videos.find((video) => video.id === req.params.id);
  if (video) {
    res.send(video);
  } else {
    res.status(404).send({ message: "Video not Found" });
  }
});

router.post("/videos/:id/comments", (req, res) => {
  const videos = readData();
  const video = videos.find((video) => video.id === req.params.id);
  if (!video) {
    return res.status(404).send({ message: "Video not found" });
  }
  const newComment = {};
});

function readData() {
  try {
    const data = fs.readFileSync(dataVideos);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataVideos, JSON.stringify(data));
}

module.exports = router;

// const module = require('module');
const express = require("express");
const router = express.Router();
const dataVideos = "./data/videos.json";
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
// C:\dev\Brainstation\wanessa-lopes-bracurl https://i.imgur.com/l2Xfgpl.jpg -O picture.jpg

router.get("/", (req, res) => {
  const videos = readData().map((video) => ({
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
  }));
  readData().forEach((element) => {
    console.log(element.image);
  });

  res.send(videos);
});

router.get("/:id", (req, res) => {
  const videos = readData();
  const video = videos.find((video) => video.id === req.params.id);
  if (video) {
    res.send(video);
  } else {
    res.status(404).send({ message: "Video not Found" });
  }
});

router.post("/", (req, res) => {
  const videos = readData();
  const newVideoId = uuidv4();
  const newVideo = {
    id: newVideoId,
    title: req.body.title,
    channel: req.body.channel,
    image: req.body.image,
  };
  videos.push(newVideo);
  writeData(videos);
  res.status(201).json(newVideo);
});

router.post("/:id/comments", (req, res) => {
  const videos = readData();
  const video = videos.find((video) => video.id === req.params.id);
  if (!video) {
    return res.status(404).send({ message: "Video not found" });
  }
  const newComment = {
    id: uuidv4(),
    name: req.body.name,
    comment: req.body.comment,
    timestamp: Date.now(),
  };
  video.comments.push(newComment);
  writeData(videos);

  res.status(201).json(newComment);
});

router.delete("/videoId/comments/:commentId", (req, res) => {
  const videoId = req.params.videoId;
  const commentId = req.params.commentId;

  const filterVideos = readData().map((video) => {
    if (video.id === videoId) {
      video.comments = video.comments.filter(
        (comment) => comment.id !== commentId
      );
    }
    return video;
  });

  writeData(filterVideos);

  res.status(204).send("Video deleted successfully!");
});

function readData() {
  try {
    const data = fs.readFileSync(dataVideos);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataVideos, JSON.stringify(data));
}

module.exports = router;

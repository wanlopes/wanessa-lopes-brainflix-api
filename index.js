const express = require("express");
const cors = require("cors");
const app = express();
const videosRouter = require("./routes/videos");
app.use(express.json());
const path = require("path");

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));

const { PORT, BACKEND_URL } = process.env;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

const { CORS_ORIGIN } = process.env;
app.use(cors({ origin: CORS_ORIGIN }));
app.use("/videos", videosRouter);

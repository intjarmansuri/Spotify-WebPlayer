import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes import
import songRouter from "./routes/song.routes.js";
import albumRouter from "./routes/album.routes.js";

// routes declaration
app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);

app.get("/", (req, res) => {
  res.send("Working Fine....!!");
});

export { app };

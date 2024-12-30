import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addSong,
  fetchAll,
  removeSong,
} from "../controllers/song.controller.js";

const router = Router();

router.route("/add").post(
  upload.fields([
    {
      name: "audio",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addSong
);

router.route("/").get(fetchAll);

router.route("/:id").delete(removeSong);

export default router;

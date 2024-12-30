import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createAlbum,
  fetchAlbum,
  removeAlbum,
} from "../controllers/album.controller.js";

const router = Router();

router.route("/add").post(upload.single("image"), createAlbum);

router.route("/").get(fetchAlbum);

router.route("/:id").delete(removeAlbum);

export default router;

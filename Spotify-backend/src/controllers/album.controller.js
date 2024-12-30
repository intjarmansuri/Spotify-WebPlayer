import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Album } from "../models/album.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createAlbum = asyncHandler(async (req, res) => {
  const { name, desc, bgColor } = req.body;

  //   Check if required fields are provided
  if (!name || !desc || !bgColor) {
    throw new ApiError(400, "All fields are required");
  }

  //   Check if image is provided
  const imageFile = req.file?.path;
  if (!imageFile) {
    throw new ApiError(400, "Image file is required");
  }

  //   upload image to Cloudinary
  const uploadedImage = await uploadOnCloudinary(imageFile);

  if (!uploadedImage) {
    throw new ApiError(500, "Error uploading image to Cloudinary");
  }

  //   Create the album in the database
  const album = await Album.create({
    name,
    desc,
    bgColor,
    image: uploadedImage.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, album, "Album created successfully"));
});

const fetchAlbum = asyncHandler(async (req, res) => {
  // Fetch all the albums from the database
  const albums = await Album.find({});

  //   If no album found, throw an error
  if (!albums || albums.length === 0) {
    throw new ApiError(404, "No album found");
  }

  //   Return the list of albums
  return res
    .status(200)
    .json(new ApiResponse(200, albums, "Albums fetched successfully"));
});

const removeAlbum = asyncHandler(async (req, res) => {
  // Get the album ID from the URL parameters
  const { id } = req.params;

  //   Validate if ID is provieded
  if (!id) {
    throw new ApiError(400, "Album ID is required");
  }

  // Find the album ID and remove it
  const deleteAlbum = await Album.findByIdAndDelete(id);

  // If the album does not exit
  if (!deleteAlbum) {
    throw new ApiError(404, "Album not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Album removed successfully"));
});

export { createAlbum, fetchAlbum, removeAlbum };

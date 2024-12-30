import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Song } from "../models/song.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addSong = asyncHandler(async (req, res) => {
  const { name, desc, album } = req.body;

  //   Check if required fields are provided
  if (!name || !desc || !album) {
    throw new ApiError(400, "All fields are required");
  }

  //   Get file paths for audio and image
  const audioFile = req.files.audio[0]?.path;
  const imageFile = req.files.image[0]?.path;

  //   Check if both audio and image files are provided
  if (!audioFile || !imageFile) {
    throw new ApiError(400, "Image and Audio file are required");
  }

  //   Upload files on Cloudinary
  const uploadedAudio = await uploadOnCloudinary(audioFile);
  const uploadedImage = await uploadOnCloudinary(imageFile);

  //   Check if both files were uploaded successfully
  if (!uploadedAudio || !uploadedImage) {
    throw new ApiError(400, "Error uploading audio and image to Cloudinary");
  }

  const duration = `${Math.floor(uploadedAudio.duration / 60)}:${Math.floor(
    uploadedAudio.duration % 60
  )}`;

  const song = await Song.create({
    name,
    desc,
    album,
    image: uploadedImage.url,
    audio: uploadedAudio.url,
    duration,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, song, "Song added successfully"));
});

const fetchAll = asyncHandler(async (req, res) => {
  // Fetch all songs from the database
  const Songs = await Song.find({});

  // If no songs found, throw an error
  if (!Songs || Songs.length === 0) {
    throw new ApiError(404, "No songs found");
  }

  // Return the list of songs
  return res
    .status(200)
    .json(new ApiResponse(200, Songs, "Songs fetched successfully"));
});

const removeSong = asyncHandler(async (req, res) => {
  // Get the song ID from the URL parameters
  const { id } = req.params;

  // Validate if ID is provided
  if (!id) {
    throw new ApiError(400, "Song ID is required");
  }

  // Find the song by ID and remove it
  const deleteSong = await Song.findByIdAndDelete(id);

  // If the song does not exist
  if (!deleteSong) {
    throw new ApiError(404, "Song not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Song removed successfully"));
});

export { addSong, fetchAll, removeSong };

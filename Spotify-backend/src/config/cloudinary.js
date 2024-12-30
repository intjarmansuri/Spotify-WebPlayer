import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Helper Function to Upload File to Cloudinary
const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    // Upload file on cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Delete the file from local temp folder after upload
    fs.unlinkSync(filePath);

    return response; // Return Cloudinary URL
  } catch (error) {
    fs.unlinkSync(filePath); // Remove the locally saved temporary file as the upload opeartion got failed

    throw new Error("Failed to upload on Cloudinary");
  }
};

export { uploadOnCloudinary };

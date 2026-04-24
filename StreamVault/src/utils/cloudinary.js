import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been upload Successfully
    // console.log("file is upload on cloudinary",response.url);

    try {
        fs.unlinkSync(localFilePath);
    } catch (error) {
        console.log("File delete error",error)
        // throw new ApiError(500,"Failed to delete temporary file");
    }
    return {
        url:response.secure_url,
        public_id:response.public_id
    };

  } catch (error) {

    try{
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation  got failed
    }catch{}
    console.log("upload error",error)
    return null;
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;

    return await cloudinary.uploader.destroy(public_id);

  } catch (error) {
    console.log("Delete error:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

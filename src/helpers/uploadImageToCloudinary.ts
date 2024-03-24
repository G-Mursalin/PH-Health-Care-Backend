/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";
import fs from "fs";
import { TCloudinaryResponse } from "../app/types/file";

// Cloudinary Config
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Send image to cloudinary
export const uploadImageToCloudinary = (
  path: string
): Promise<TCloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      function (error: Error, result: TCloudinaryResponse) {
        fs.unlinkSync(path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Store file to Upload folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const { Cloud_Name, Api_Key, Api_Secret } = process.env;

if (!Cloud_Name || !Api_Key || !Api_Secret) {
    throw new Error("Cloudinary environment variables are missing");
}

cloudinary.config({
    cloud_name: Cloud_Name,
    api_key: Api_Key,
    api_secret: Api_Secret,
});

export default cloudinary;
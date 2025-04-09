import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

console.log("Cloudinary ENV Config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✓' : '✗'
  });
  

cloudinary.config({ 
    cloud_name: 'dz0lzieol',
    api_key: 128351953117117,
    api_secret:'YqumzmK8YLzxK-2J5ZxsDTTvMf8'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'notes',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf']
    }
});

export const upload = multer({ storage: storage });
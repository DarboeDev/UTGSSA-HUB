import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: string, folder: string) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `utg-science-association/${folder}`,
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    throw new Error('Error uploading to Cloudinary');
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

export default cloudinary;
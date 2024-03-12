import cloudinary from 'cloudinary';

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: "dxpnr60tj",
  api_key: "672263611112239",
  api_secret: "kHrHuP2LYrsz1lTorRWWylpbkGc",
  /* cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, */
});

const cloudinaryService = async (publicId) => {
    try {
      const result = await cloudinary.v2.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  };
  export default cloudinaryService;
import axios from "axios";

const UploadImage = async (ImageFile) => {
  const formsData = new FormData();
  formsData.append("file", ImageFile);

  formsData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );
  const uploadUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/image/upload`;
  const res = await axios.post(uploadUrl, formsData);
  console.log(res.data);

  return res.data.secure_url;
};
export default UploadImage;

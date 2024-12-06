export const uploadToCloudinary = (blobFile) => {
  return new Promise(async (resolve, reject) => {
    if (!blobFile) {
      throw new Error('A Blob file is required.');
    }

    const formData = new FormData();
    formData.append('file', blobFile);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        import.meta.env.VITE_CLOUDINARY_API_URL,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload to Cloudinary');
      }

      const data = await response.json();
      resolve(data.secure_url);
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  });
};

export async function fetchFileFromUrl(fileUrl) {
  return new Promise(async (resolve, reject) => {
    if (!fileUrl) {
      throw new Error('File URL is required');
    }

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${response.statusText}`);
      }
      const blob = await response.blob();
      resolve(blob);
    } catch (error) {
      console.error('Error fetching the file:', error);
      throw error;
    }
  });
};

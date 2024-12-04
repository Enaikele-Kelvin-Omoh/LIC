export const uploadToCloudinary = (blobFile) => {
  return new Promise(async (resolve, reject) => {
    if (!blobFile) {
      throw new Error('A Blob file is required.');
    }

    // Replace these with your actual Cloudinary settings
    const CLOUD_NAME = 'your-cloud-name'; // Your Cloudinary cloud name
    const UPLOAD_PRESET = 'your-unsigned-preset'; // Your unsigned preset name

    const formData = new FormData();
    formData.append('file', blobFile);
    formData.append('upload_preset', 'my_first_preset');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${'dvkmlmbqs'}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload to Cloudinary');
      }

      const data = await response.json();
      resolve(data.secure_url); // Returns the URL of the uploaded file
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

      const blob = await response.blob(); // Convert response to a Blob
      resolve(blob); // Return the Blob object
    } catch (error) {
      console.error('Error fetching the file:', error);
      throw error;
    }
  });
}

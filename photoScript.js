const cloudName = "dgfmewqop";
const apiKey = 547424269233163;
const apiSecret = "yC2VSHAz1wkq2PhSRclbZP1FZw";

const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const imagePreview = document.getElementById("imagePreview");
const uploadButton = document.getElementById("uploadButton");

const uploadPreset = {
  name: "ml_default",
  unsigned: false, // Set to true if you want unsigned uploads
  apiKey: "547424269233163",
  cloudName: "dgfmewqop",
  folder: "userImages", // Optional: Specify a folder to upload the images to
  tags: ["tag1", "tag2"], // Optional: Add tags to the uploaded images
  transformations: {
    // Optional: Add desired transformations to be applied to the uploaded images
    crop: "limit",
    width: 300,
    height: 450,
    // filename: "post-2345.jpg"
  },
};
console.log(uploadPreset.name);

// Initialize Cloudinary widget
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    apiKey: apiKey,
    uploadPreset: uploadPreset.name,
    sources: ["local", "url", "camera"],
    multiple: false,
    cropping: true,
    showAdvancedOptions: true,
    maxImageFileSize: 5000000,
    // prepareUploadParams: function (cb, params) {
    //   cb({ public_id: post._id })
    // },
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      // Retrieve the secure URL of the uploaded image
      const { secure_url } = result.info;
      // Display the uploaded image in the image preview
      imagePreview.src = secure_url;
      imagePreviewContainer.style.display = "block";
    }
  }
);

// Open the Cloudinary upload widget on button click
uploadButton.addEventListener("click", () => {
  myWidget.open();
});

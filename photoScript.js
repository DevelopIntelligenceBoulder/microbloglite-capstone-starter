const cloudName = "dgfmewqop";
const apiKey = 547424269233163;
const apiSecret = "yC2VSHAz1wkq2PhSRclbZP1FZw";

const imageDialog = document.getElementById("imageDialog");
const imagePreview = document.getElementById("imagePreview");

const uploadPreset = {
  name: 'ml_default',
  unsigned: false, // Set to true if you want unsigned uploads
  apiKey: '547424269233163',
  cloudName: 'dgfmewqop',
  folder: 'userImages', // Optional: Specify a folder to upload the images to
  tags: ['tag1', 'tag2'], // Optional: Add tags to the uploaded images
  transformations: {
    // Optional: Add desired transformations to be applied to the uploaded images
    crop: 'limit',
    width: 300,
    height: 450,
  },
};
console.log(uploadPreset.name)



// Initialize Cloudinary widget
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: uploadPreset.cloudName,
    apiKey: uploadPreset.apiKey,
    uploadPreset: uploadPreset.name, // Replace with your actual upload preset name
    sources: ['local', 'url', 'camera'],
    multiple: false,
    cropping: true,
    showAdvancedOptions: true,
    maxImageFileSize: 5000000, // Set maximum file size (5MB in this example)
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      const { secure_url } = result.info;
      // Display the uploaded image in the dialog modal
      imagePreview.src = secure_url;
      imageDialog.showModal();

      // Display the chosen photo in a separate div on the page
      displayDiv.innerHTML = `<img src="${secure_url}" alt="Users Image" class="img-fluid">`;


    }
  }
);

// Open the Cloudinary widget on button click
document.getElementById('open-modal-button').addEventListener('click', () => {
  myWidget.open();
});

// Close the dialog modal
document.getElementById('imageDialog').addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'dialog') {
    imageDialog.close();
  }
});


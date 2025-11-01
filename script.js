// Array of image URLs to download
const imageUrls = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/200",
  "https://via.placeholder.com/250",
  "https://invalid-url.com/image.jpg" // Example of a broken URL (for testing error handling)
];

// Function that returns a Promise for each image download
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download image: ${url}`);
  });
}

// Main function to handle the whole process
function downloadImages(urls) {
  const outputDiv = document.getElementById("output");
  const errorDiv = document.getElementById("error");
  const loadingDiv = document.getElementById("loading");

  // Clear previous results
  outputDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  // Show loading spinner
  loadingDiv.style.display = "block";
  loadingDiv.textContent = "Loading images...";

  // Start downloading all images in parallel
  const promises = urls.map(downloadImage);

  Promise.all(promises)
    .then(images => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Display all downloaded images
      images.forEach(img => {
        outputDiv.appendChild(img);
      });
    })
    .catch(error => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Display error message
      errorDiv.textContent = `Error: ${error}`;
    });
}

// Call the function when page loads
window.onload = function() {
  downloadImages(imageUrls);
};


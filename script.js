// Image URLs as per test case
const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

// Function to download a single image (returns a Promise)
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Main function to download and display all images
function downloadImages(urls) {
  const outputDiv = document.getElementById("output");
  const errorDiv = document.getElementById("error");
  const loadingDiv = document.getElementById("loading");

  // Clear previous results
  outputDiv.innerHTML = "";
  errorDiv.textContent = "";

  // Show loading spinner
  loadingDiv.style.display = "block";
  loadingDiv.textContent = "Loading images...";

  // Download all images in parallel
  Promise.all(urls.map(downloadImage))
    .then(images => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Append images to output div
      images.forEach(img => outputDiv.appendChild(img));
    })
    .catch(error => {
      // Hide spinner and show error message
      loadingDiv.style.display = "none";
      errorDiv.textContent = error;
    });
}

// Add click event listener to the button
document.getElementById("download-images-button").addEventListener("click", () => {
  downloadImages(imageUrls);
});



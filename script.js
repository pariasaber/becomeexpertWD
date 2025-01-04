const settingsForm = document.getElementById("settingsForm");
const imageGallery = document.getElementById("imageGallery");
const blurInput = document.getElementById("blur");
const grayscaleInput = document.getElementById("grayscale");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const setSizeToggle = document.getElementById("setSizeToggle");
const numImagesInput = document.getElementById("numImages");
const imagesPerLoadInput = document.getElementById("imagesPerLoad");
const loadImagesButton = document.getElementById("loadImages");

// State variables
let blurRate = 0;
let grayscale = false;
let width = null;
let height = null;
let numImages = 10;
let imagesPerLoad = 5;

// Toggle enable/disable of width and height inputs
setSizeToggle.addEventListener("change", () => {
    const isSetSizeEnabled = setSizeToggle.checked;
    widthInput.disabled = !isSetSizeEnabled;
    heightInput.disabled = !isSetSizeEnabled;
    if (!isSetSizeEnabled) {
        width = null;
        height = null;
    }
});

// Handle settings form changes
settingsForm.addEventListener("input", () => {
    blurRate = blurInput.value;
    grayscale = grayscaleInput.checked;
    width = setSizeToggle.checked ? widthInput.value : null;
    height = setSizeToggle.checked ? heightInput.value : null;
    numImages = numImagesInput.value || 10;
    imagesPerLoad = imagesPerLoadInput.value || 5;
});

// Fetch and render images
function fetchAndRenderImages() {
    const imagesToFetch = Math.min(imagesPerLoad, numImages);
    const apiUrl = "https://picsum.photos";
    for (let i = 0; i < imagesToFetch; i++) {
        const img = document.createElement("img");
        let url = `${apiUrl}/${width || 300}/${height || 300}`;
        if (blurRate > 0) {
            url += `?blur=${blurRate}`;
        }
        if (grayscale) {
            url += blurRate > 0 ? "&grayscale" : "?grayscale";
        }
        img.src = url;
        img.alt = "Random Image";
        imageGallery.appendChild(img);
    }
    numImages -= imagesToFetch;
    if (numImages <= 0) {
        loadImagesButton.disabled = true;
    }
}

// Handle image loading
loadImagesButton.addEventListener("click", () => {
    fetchAndRenderImages();
});
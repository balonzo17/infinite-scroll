const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'SWwcgMbEyWdrJCbuV58zXy9PztK39LdyPKoS81tBCNE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if ( imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Helper Function to Set Attribute on DOM Elements
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run Function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplach
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',

            // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
           src: photo.urls.regular, 
           alt: photo.alt_description,
           title: photo.alt_description,

        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_descripttion);
        });

        // Event Listener, check when each is finished loadind
        img.addEventListener('load', imageLoaded);
        // Put ,img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item);
    });
}

// Get Photos From Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        console.log('load more')
    }
});

// On Load
getPhotos();

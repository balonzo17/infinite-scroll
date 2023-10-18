// Unsplash API
const count = 10;
const apiKey = 'SWwcgMbEyWdrJCbuV58zXy9PztK39LdyPKoS81tBCNE';
const querySearch = ''
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // Catch Error Here
    }
}

// On Load
getPhotos();

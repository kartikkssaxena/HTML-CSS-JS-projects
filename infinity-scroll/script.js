const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
// let loadMore = false;
let ready = false, imagesLoaded = 0, totalImages = 0;


//Unsplash Api
let count = 5;
const imgType = ['landscape', 'portrait', 'squarish'];
const apiKey = 'N8HyG9Y6dAdrwzVwF-AWGyUoyd_Qr5LTDe0vIUBd8C4';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=${imgType[2]}`;

//check if all images are loaded

function imageLoaded() {
    //console.log("loaded");
    imagesLoaded++;
    // console.log("imagesLoaded", imagesLoaded);
    // console.log("totalImages", totalImages);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=${imgType[2]}`;
        //console.log("ready ", ready, imagesLoaded);
    }
}


//Helper function to set attributes on Dom Elements 

function setAttributes(Elements, attributes) {
    for (const key in attributes) {
        Elements.setAttribute(key, attributes[key]);
    }
}

//Display photos

function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    // console.log("totalImages ", totalImages);
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener check when each is finished loading
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//fetch photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();

    } catch (error) {
        console.log(error);
    }
}

//check if scrolling has reached the bottom of the page and load more images

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        console.log('load more');
        getPhotos();
    }

})

//onLoad

getPhotos();
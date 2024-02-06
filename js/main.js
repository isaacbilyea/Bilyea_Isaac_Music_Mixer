console.log("JS file is connected!");

const images = document.querySelectorAll('.images object');

function logId() {
    console.log('You have clicked on a', this.id);
}

images.forEach(image => image.addEventListener('click', logId));
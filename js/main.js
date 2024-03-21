<<<<<<< Updated upstream
console.log("JS file is connected!");

const images = document.querySelectorAll('.images object');

function logId() {
    console.log('You have clicked on a', this.id);
}

images.forEach(image => image.addEventListener('click', logId));
=======
(() => {

//VARIABLES

const theAudio = document.querySelectorAll('.audio-player'),
    playButton = document.querySelector('#playButton'),
    pauseButton = document.querySelector('#pauseButton'),
    replayButton = document.querySelector('#replayButton'),
    shuffleButton = document.querySelector('#shuffleButton'),
    volumeSlider = document.querySelector('#slider'),
    audioImages = document.querySelectorAll ('.images img'),
    dropZone = document.querySelectorAll('.background');

    const originalContainers = {};

//FUNCTIONS

//Audio Functions

function loadAudio(trackRef) {
    let availableAudio = null;

    theAudio.forEach(audio => {
        if (!availableAudio && (audio.paused)) {
            availableAudio = audio;
        }
    });

    if (availableAudio) {
     
        availableAudio.volume = volumeSlider.value / 100;

        
        availableAudio.src = `audio/${trackRef}.mp3`;
        availableAudio.load();
        availableAudio.play();
    } else {
        console.log('No available audio players.');
    }
}

function playAudio() {
    theAudio.forEach(audio => {
        audio.play();
    });
}

function pauseAudio() {
    theAudio.forEach(audio => {
        audio.pause();
    });
}

function setVolume() {

    theAudio.forEach(audio => {
        audio.volume = this.value / 100;
    });
}

function restartAudio() {

    theAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    resetImages();
}

//Drag n' Drop Stuff

function handleStartDrag(e) {
    originalContainers[e.target.id] = e.target.parentElement.id;
    e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDragOver(e) { 
	e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(data);

    const posX = draggedElement.getAttribute('data-x');
    const posY = draggedElement.getAttribute('data-y');

    draggedElement.style.left = `${posX}` + 'px';
    draggedElement.style.top = `${posY}` + 'px';

    e.target.appendChild(draggedElement);

    
    const trackRef = draggedElement.getAttribute('data-trackref');
    loadAudio(trackRef);
 
}

function resetImages() {
    Object.entries(originalContainers).forEach(([imageId, originalContainerId]) => {
        const image = document.getElementById(imageId);
        const originalContainer = document.getElementById(originalContainerId);
        if (image && originalContainer) {
            originalContainer.appendChild(image);
        }
    });
}

//EVENT LISTENERS

// 1 to 1 event handling

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
volumeSlider.addEventListener('input', setVolume);
replayButton.addEventListener('click', restartAudio);

// 1 to many event handling

audioImages.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
dropZone.forEach(zone => zone.addEventListener("dragover", handleDragOver));
dropZone.forEach(zone => zone.addEventListener("drop", handleDrop));

})();
>>>>>>> Stashed changes

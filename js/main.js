(() => {

//VARIABLES
    
let theAudio = document.querySelectorAll('.audio-player'),
    playButton = document.querySelector('#playButton'),
    pauseButton = document.querySelector('#pauseButton'),
    resetButton = document.querySelector('#resetButton'),
    shuffleButton = document.querySelector('#shuffleButton'),
    volumeSlider = document.querySelector('#slider'),
    audioImages = document.querySelectorAll ('.images img'),
    dropZone = document.querySelector('.drop-zone');
    
//FUNCTIONS
    
//Audio Functions
    
function loadAudio(trackRef) {
    const audio = document.querySelector(`audio[data-trackref="${trackRef}"]`);
    
    audio.volume = volumeSlider.value / 100;
    audio.src = `audio/${trackRef}.mp3`;
    audio.play();
}

function playAudio() {

    const droppedImages = dropZone.querySelectorAll('img[data-trackref]');
    
    droppedImages.forEach(img => {
        const trackRef = img.getAttribute('data-trackref');
        loadAudio(trackRef);
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
    
function resetPieces() {
    
    theAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    
    resetImages();
}


//Drag n' Drop Shtuff
    
function handleStartDrag(e) {
    const trackRef = e.target.getAttribute('data-trackref');
    e.dataTransfer.setData('text/plain', trackRef); 
}
    
function handleDragOver(e) { 
    e.preventDefault();
}
    
function handleDrop(e) {
    e.preventDefault();
      
    const trackRef = e.dataTransfer.getData('text/plain');
    const draggedImage = document.querySelector(`img[data-trackref="${trackRef}"]`);
    
    dropZone.appendChild(draggedImage);
    loadAudio(trackRef);
}

function resetImages() {
    audioImages.forEach(image => {
        
        const trackRef = image.getAttribute('data-trackref');
        const originalContainer = document.querySelector(`.image-con[data-trackref="${trackRef}"]`);
    
        originalContainer.appendChild(image);
          
    });
}

//This is my poor mans "Shuffle" button since Math SUCKS
function appendImages() {
    audioImages.forEach(image => {
         
        dropZone.appendChild(image);
            
        const trackRef = image.getAttribute('data-trackref');
        loadAudio(trackRef);

    });
}

//EVENT LISTENERS
    
// 1 to 1 event handling
    
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
volumeSlider.addEventListener('input', setVolume);
resetButton.addEventListener('click', resetPieces);
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleDrop);
shuffleButton.addEventListener('click', appendImages);
    
// 1 to many event handling
    
audioImages.forEach(image => image.addEventListener('dragstart', handleStartDrag));
    
})();

const SONGS_URL = 'http://localhost:3001/songs'

// top bar

let resumeButton = document.querySelector('#susresButton')
resumeButton.addEventListener('click', function() {
    if(audioCtx.state === 'running') {
      audioCtx.suspend().then(function() {
        susresButton.textContent = 'Resume context';
      });
    } else if(audioCtx.state === 'suspended') {
      audioCtx.resume().then(function() {
        susresButton.textContent = 'Suspend context';
      });
    }
  } )

// song selector

let songsList = document.getElementById('songs-list')
Song.getUserSongs(songsList)

//decks

let deck1 = new Deck(document.getElementById('deck-1'))
let deck2 = new Deck(document.getElementById('deck-2'))


songsList.addEventListener('click', loadDeck)

//modal and uploading
let modal = document.getElementById('modal')
let uploadForm = document.getElementById('upload-form')
let uploadBtn = document.getElementById('upload-btn')
let hideBtn = document.getElementById('hide-btn')
let fileField = document.querySelector('#upload-field')
uploadBtn.addEventListener('click', toggleUploadForm)
hideBtn.addEventListener('click', toggleUploadForm)
uploadForm.addEventListener('submit', handleFileUpload)







// fileField.addEventListener('change', handleFileUpload)

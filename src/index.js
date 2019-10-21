const SONGS_URL = 'http://localhost:3001/songs'


// song selector

let songsList = document.getElementById('songs-list')
Song.getUserSongs(songsList)

//decks
let deck1 = document.getElementById('deck-1')
let deck2 = document.getElementById('deck-2')
deck1.querySelector('audio').addEventListener('canplay', enableDeck)
deck2.querySelector('audio').addEventListener('canplay', enableDeck)

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

const SONGS_URL = 'http://localhost:3001/songs'

let modal = document.getElementById('modal')
let fileField = document.querySelector('#upload-field')
let songsList = document.getElementById('songs-list')

let deck1 = document.getElementById('deck-1')
let deck2 = document.getElementById('deck-2')

let uploadForm = document.getElementById('upload-form')
let uploadBtn = document.getElementById('upload-btn')
let hideBtn = document.getElementById('hide-btn')

uploadBtn.addEventListener('click', toggleUploadForm)
hideBtn.addEventListener('click', toggleUploadForm)
uploadForm.addEventListener('submit', handleFileUpload)
songsList.addEventListener('click', loadDeck)


Song.getUserSongs(songsList)

// fileField.addEventListener('change', handleFileUpload)

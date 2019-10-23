const SONGS_URL = 'http://localhost:3001/songs'
const audioCtx = new AudioContext()

// top bar



// song selector

let songsList = document.getElementById('songs-list')
Song.getUserSongs(songsList)
songsList.addEventListener('click', loadDeck)


//decks

let deck1 = new Deck(document.getElementById('deck-1'))
let deck2 = new Deck(document.getElementById('deck-2'))



// master controls

let crossfade = document.querySelector("#crossfade")

crossfade.addEventListener('input', event=> Deck.crossfade(deck1, deck2, event.target.value))



//modal and uploading
let modal = document.getElementById('modal')
let uploadForm = document.getElementById('upload-form')
let uploadBtn = document.getElementById('upload-btn')
let hideBtn = document.getElementById('hide-btn')
let fileField = document.querySelector('#upload-field')
uploadBtn.addEventListener('click', toggleUploadForm)
hideBtn.addEventListener('click', toggleUploadForm)
uploadForm.addEventListener('submit', handleFileUpload)

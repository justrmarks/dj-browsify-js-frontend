const SONGS_URL = 'http://localhost:3001/songs'


let fileField = document.querySelector('#upload-field')
let songsList = document.getElementById('songs-list')

let uploadForm = document.getElementById('upload-form')
let uploadBtn = document.getElementById('upload-btn')
let hideBtn = document.getElementById('hide-btn')

uploadBtn.addEventListener('click', toggleUploadForm)
hideBtn.addEventListener('click', toggleUploadForm)
uploadForm.addEventListener('submit', handleFileUpload)

// fileField.addEventListener('change', handleFileUpload)

let handleFileUpload = event=> {
  event.preventDefault()
  let name = event.target.querySelector('input[name="name"]').value
  console.log(name)
  let artist = event.target.querySelector('input[name="artist"]').value
  let genre = event.target.querySelector('input[name="genre"]').value

  let fileField = event.target.querySelector('input[name="file"]')
  let file = fileField.files[0]

  let user = sessionStorage.getItem("username")

  let data = new FormData();
  let request = new XMLHttpRequest();
  data.append('audio_file', file)
  data.append('name', name)
  data.append('artist', artist)
  data.append('genre', genre)
  data.append('username', user)

let progressBar = event.target.querySelector('progress')
  // AJAX request finished
  request.addEventListener('load', function(e) {
  	// request.response will hold the response from the server
  	console.log(request.response)
    let songObj = new Song(request.response.data)
    songsList.appendChild(songObj.renderLi())
    progressBar.value = 0
    modal.classList.toggle('hidden')
  });

  // Upload progress on request.upload
  request.upload.addEventListener('progress', function(e) {
  	let percent_complete = (e.loaded / e.total)*100;
  	// Percentage of upload completed
  	console.log(percent_complete);
    progressBar.value = percent_complete
  });

  // If server is sending a JSON response then set JSON response type
  request.responseType = 'json';


  // Send POST request to the server side script
  request.open('post', SONGS_URL);
  request.send(data);

}

let toggleUploadForm = (event => {
  console.log("toggle")
  modal.classList.toggle('hidden')

})

let loadDeck = (event) => {
    if (event.target.id == 'deck-1-btn') {
        let songLi = event.target.parentNode
        let songPath = songLi.dataset.url
        deck1.load(songPath)
        // deck1.enable()
    }
    if (event.target.id == 'deck-2-btn') {
      let songLi = event.target.parentNode
      let songPath = songLi.dataset.url
      deck2.load(songPath)
      // deck2.enable()
    }
}

let USER_PATH = `http://localhost:3001/songs/${window.sessionStorage.getItem("username")}`

class Song {


  constructor(songData) {
    this.name = songData.name
    this.artist = songData.artist
    this.url = songData.path
    this.genre = songData.genre
  }

  renderLi() {
    let li = document.createElement('li')
    li.innerHTML = `
    <div class='song-info'>
      <p> ${this.name}</p>
      <p> Artist - ${this.artist} </p>
      <p> Genre: ${this.genre} </p>
    </div>

    <div class='load-buttons'>
      <div class="deck-1-btn load-button" > <p> + D1 </p> </div>
      <div class="deck-2-btn load-button" > <p> + D2 </p> </div>
    </div>
    `
    li.setAttribute('data-url', this.url)
    return li
  }

  static async getUserSongs(listEl) {
    let songsData = await fetch(USER_PATH)
    console.log(songsData)
    let songsJSON = await songsData.json()
    let songObjs = songsJSON.data.map(songEl=> new Song(songEl))
    songObjs.forEach(songObj=> listEl.appendChild(songObj.renderLi()))
  }
}

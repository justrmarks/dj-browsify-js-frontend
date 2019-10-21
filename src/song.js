let USER_PATH = `http://localhost:3001/songs/${window.sessionStorage.getItem("username")}`

class Song {


  constructor(songData) {
    console.log(songData)
    this.name = songData.name
    this.artist = songData.artist
    this.url = songData.path
    this.genre = songData.genre
  }

  renderLi() {
    let li = document.createElement('li')
    li.innerHtml = `
    <p> ${this.name}</p>
    <p> artist - ${this.artist} </p>
    <p> genre: ${this.genre}
    <button id="deck-1-btn" > + D1 </button>
    <button id="deck-2-btn" > + D2 </button>
    `
    li.setAttribute('data-url', this.url)
    return li
  }

  static async getUserSongs(listEl) {
    let songsData = await fetch(USER_PATH)
    let songsArr = await songsData.json()
    songObjs = songsArr.map(songEl=> new Song(songEl))
    songObjs.forEach(songObj=> listEl.appendChild(songObj.renderLi()))
  }
}

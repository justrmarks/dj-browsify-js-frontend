let USER_PATH = `http://localhost:3001/songs/${window.sessionStorage.getItem("username")}`

class Song {


  constructor(songData) {
    this.domEl = undefined
    this.name = songData.name
    this.artist = songData.artist
    this.url = songData.path
    this.genre = songData.genre
    this.id = songData.id
  }

  renderLi() {
    let li = document.createElement('li')
    li.innerHTML = `
    <div class='song-info'>
      <p> ${this.name}</p>
      <p> Artist - ${this.artist} </p>
      <p> Genre: ${this.genre} </p>
      <div class='delete-btn'> X </div>
    </div>

    <div class='load-buttons'>
      <div class="deck-1-btn load-button" > <p> + D1 </p> </div>
      <div class="deck-2-btn load-button" > <p> + D2 </p> </div>
    </div>
    `

    let dataInfo = `${this.name} - ${this.artist} - ${this.genre}`
    li.setAttribute('data-info', dataInfo )
    li.setAttribute('data-url', this.url)
    li.setAttribute('data-id', this.id)

    li.querySelector(".delete-btn").addEventListener('click', this.delete.bind(this),true)
    li.querySelector('.load-buttons').addEventListener('click', loadDeck)
    this.domEl = li
    return li
  }

  async delete() {
    let resp = await fetch(`${SONGS_URL}/${this.id}`,{ method: 'DELETE'})
    let data = await resp.json()

    if (data.id == this.id) {
      this.domEl.remove()
    }
  }

  static async getUserSongs(listEl) {
    let songsData = await fetch(USER_PATH)
    console.log(songsData)
    let songsJSON = await songsData.json()
    let songObjs = songsJSON.data.map(songEl=> new Song(songEl))
    songObjs.forEach(songObj=> listEl.appendChild(songObj.renderLi()))
  }
}

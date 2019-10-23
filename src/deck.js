class Deck {


// deck properties:
//
// domEl
// buffer
// sampleNode
// gain
// playback
// current
//

  constructor(div) {
    this.domEl = div
    this.render()
    this.wavesurfer = WaveSurfer.create({
      container: this.domEl.querySelector('.waveform')
    })
    this.addEventListeners()
    this.gainNode = this.wavesurfer.backend.ac.createGain()
    this.wavesurfer.backend.setFilter(this.gainNode);

  }

  async load(url) {
    let deck = this
    this.disable()
    this.wavesurfer.load(url)
      }

  setGain(value) {
    this.gainNode.gain.value = value
  }



  togglePlay() {
    this.wavesurfer.playPause()
  }

  enable() {
      let deckPlay = this.domEl.querySelector('.play')
      deckPlay.removeAttribute('disabled')
      console.log('deck enabled')
  }

  disable() {
    let deckPlay = this.domEl.querySelector('.play')
    deckPlay.textContent = "play"
    deckPlay.setAttribute('disabled',true)
    console.log('deck disabled')
  }

  render() {

    this.domEl.innerHTML = `
    <div class='controls'>
        <button class="play" disabled>play</button>

        <div class='playback'>
          <p> 100% </p>
          <input type="range" min="0" max="20" value="10"step=".05">
          <button> + </button>
          <button> - </button>
        </div>
    </div>
    <div class='waveform'></div>

    `

    let deck = this
    return this.domEl
  }

  addEventListeners() {
    let deck = this
    this.domEl.querySelector('.play').addEventListener('click', deck.togglePlay.bind(this))

    this.wavesurfer.on('ready', this.enable.bind(this))

    let playbackSlider = deck.domEl.querySelector(".playback input")
    playbackSlider.addEventListener("input", event => deck.updatePlayback(event.target.value))
  }

  updatePlayback(factor) {
    let input = factor - 10
    let value = (1.116123 ** input).toFixed(2)
    this.domEl.querySelector(".playback p").innerHTML = `${Math.floor(value*100)}%`
    //magic number is constant to assure smooth playback transition
    this.wavesurfer.setPlaybackRate(value)
  }

static crossfade(deck1, deck2, input) {
  let d1Gain = Math.cos((1-input) * 0.5 * Math.PI)
  let d2Gain = Math.cos(input * 0.5 * Math.PI)
  deck1.setGain(d1Gain)
  console.log(deck1)
  console.log(deck1.gainNode)
  deck2.setGain(d2Gain)
  console.log(deck2)
  console.log(deck2.gainNode)
}

}

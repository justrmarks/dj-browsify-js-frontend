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
    this.currentTime = 0
    this.playing = false
    this.buffer = undefined
    this.sampleNode = audioCtx.createBufferSource()
    this.render()
    this.gainNode = audioCtx.createGain()
    this.gainNode.connect(audioCtx.destination)
  }

  async load(url) {
    let deck = this
    this.disable()
    let response = await fetch(url)
    let arrayBuffer = await response.arrayBuffer()
    let buffer = await audioCtx.decodeAudioData(arrayBuffer)
    console.log(this)
    this.buffer = buffer
    this.resetSample()
    this.currentTime = 0
    this.enable()
      }

  setGain(value) {
    this.gainNode.gain.value = value
  }

  resetSample() {
    this.sampleNode = audioCtx.createBufferSource()
    this.sampleNode.buffer = this.buffer
    this.sampleNode.connect(this.gainNode)
  }


  togglePlay() {
    if (this.playing) {
      this.currentTime = audioCtx.currentTime
      this.sampleNode.stop()
      this.playing = false
      this.resetSample()
      this.domEl.querySelector('.play').textContent = 'play'
    }
    else {
      this.sampleNode.start(0, this.currentTime)
      this.playing = true
      this.domEl.querySelector('.play').textContent = 'pause'
    }
  }

  enable() {
      let deckPlay = this.domEl.querySelector('.play')
      if (!!this.buffer) {
      deckPlay.removeAttribute('disabled')
      console.log('deck enabled')
      }
  }

  disable() {
    if (this.playing) {
    this.sampleNode.stop()
    let deckPlay = this.domEl.querySelector('.play')
    deckPlay.textContent = "play"
    deckPlay.setAttribute('disabled',true)
    this.playing = false
    console.log('deck disabled')
    }
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
    this.addEventListeners()


    return this.domEl
  }

  addEventListeners() {
    let deck = this
    this.domEl.querySelector('.play').addEventListener('click', deck.togglePlay.bind(this))

    let playbackSlider = deck.domEl.querySelector(".playback input")
    playbackSlider.addEventListener("input", event => deck.updatePlayback(event.target.value))
  }

  updatePlayback(factor) {
    let input = factor - 10
    let value = (1.116123 ** input).toFixed(2)
    this.domEl.querySelector(".playback p").innerHTML = `${Math.floor(value*100)}%`
    //magic number is constant to assure smooth playback transition
    this.sampleNode.playbackRate.value = value
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

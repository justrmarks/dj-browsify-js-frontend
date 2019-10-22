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
    console.log(deck)
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
      deckPlay.removeAttribute('disabled') }
  }

  render() {

    this.domEl.innerHTML = `
      <button class="play" disabled>play</button>
    `

    let deck = this
    this.addEventListeners()


    return this.domEl
  }

  addEventListeners() {
    let deck = this
    this.domEl.querySelector('.play').addEventListener('click', deck.togglePlay.bind(this))
  }

static crossfade(deck1, deck2, input) {
  let d1Gain = Math.cos(input * 0.5 * Math.PI)
  let d2Gain = Math.cos((1-input) * 0.5 * Math.PI)
  deck1.setGain(d1Gain)
  console.log(deck1)
  console.log(deck1.gainNode)
  deck2.setGain(d2Gain)
  console.log(deck2)
  console.log(deck2.gainNode)
}

}

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



  resetSample() {
    this.sampleNode = audioCtx.createBufferSource()
    console.log(this.sampleNode)
    console.log(this.buffer)
    this.sampleNode.buffer = this.buffer
    this.sampleNode.connect(audioCtx.destination)

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
      console.log(this)
      console.log(this.sampleNode)
      console.log(this.buffer)
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



}

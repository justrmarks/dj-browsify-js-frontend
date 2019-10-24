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
      container: this.domEl.querySelector('.waveform'),
      waveColor: '#ffff00',
      progressColor: '#00ffff',
      plugins: [
        WaveSurfer.cursor.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                'font-size': '10px'
            }
        })
    ]
    })



    this.addEventListeners()


//filters
  this.filters = []

    ///// EQ

    // low
    this.lowNode = this.wavesurfer.backend.ac.createBiquadFilter();
    this.lowNode.type = 'lowshelf';
    this.lowNode.gain.value = 0;
    this.lowNode.Q.value = 1;
    this.lowNode.frequency.value = 100;
    this.filters.push(this.lowNode)

    // mid

    this.midNode = this.wavesurfer.backend.ac.createBiquadFilter();
    this.midNode.type = 'peaking';
    this.midNode.gain.value = 0;
    this.midNode.Q.value = 1;
    this.midNode.frequency.value = 2000;
    this.filters.push(this.midNode)

    //high
    this.highNode = this.wavesurfer.backend.ac.createBiquadFilter();
    this.highNode.type = 'highshelf';
    this.highNode.gain.value = 0;
    this.highNode.Q.value = 1;
    this.highNode.frequency.value = 2000;
    this.filters.push(this.highNode)

    // crossfade
    this.gainNode = this.wavesurfer.backend.ac.createGain()
    this.filters.push(this.gainNode)


    this.wavesurfer.backend.setFilters(this.filters)

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
        <div class='info-bar'>
        <p> text </p>
        </div>
        <button class="play" disabled>play</button>

        <div class='playback'>
          <p> 100% </p>
          <input type="range" min="0" max="20" value="10"step=".05">
          <button class='playback-btn'> + </button>
          <button class='playback-btn'> - </button>
        </div>
        <div class='EQ'>
          <input class='low' type='range' min="-40" max="40">
          <input class='mid' type='range' min="-40" max="40">
          <input class='high' type='range' min="-40" max="40">
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

    // wavesurfer eventlisteners
    this.wavesurfer.on('ready', this.enable.bind(this))


    let playbackSlider = deck.domEl.querySelector(".playback input")
    playbackSlider.addEventListener("input", event => deck.updatePlayback(event.target.value))

    let eq = this.domEl.querySelector('.EQ')
    eq.addEventListener('input', this.updateEQ.bind(this))

  }

  updatePlayback(factor) {
    let input = factor - 10
    let value = (1.116123 ** input).toFixed(2)
    this.domEl.querySelector(".playback p").innerHTML = `${Math.floor(value*100)}%`
    //magic number is constant to assure smooth playback transition
    this.wavesurfer.setPlaybackRate(value)
  }

  updateEQ(event) {

    if (event.target.classList.contains('low')) {

      this.lowNode.gain.value = event.target.value
    }
    else if (event.target.classList.contains('mid')) {

      this.midNode.gain.value = event.target.value
    }
    else if (event.target.classList.contains('high')) {

      this.highNode.gain.value = event.target.value
    }
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

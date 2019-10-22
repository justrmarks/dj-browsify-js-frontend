
let audioCtx = new AudioContext()
let deck1Node = audioCtx.createBufferSource()
let deck2Node = audioCtx.createBufferSource()
let sample = audioCtx.createBufferSource()
let sample1 = audioCtx.createBufferSource()
let sample2 = audioCtx.createBufferSource()

let loadDeck = (event) => {
    if (event.target.id == 'deck-1-btn') {
        let songLi = event.target.parentNode
        let songPath = songLi.dataset.url
        //enable deck method
        setDeckBuffer(songPath, deck1Node)
        deck1Node.connect(audioCtx.destination)
        enableDeck(deck1)
    }
    if (event.target.id == 'deck-2-btn') {
        let songLi = event.target.parentNode
        let songPath = songLi.dataset.url
        setDeckBuffer(songPath, deck2Node)
        deck2Node.connect(audioCtx.destination)
        enableDeck(deck2)
    }
}

async function setDeckBuffer(url, deckNode) {
    let response = await fetch(url)
    let arrayBuffer = await response.arrayBuffer()
    audioCtx.decodeAudioData(arrayBuffer)
    .then(buffer => deckNode.buffer = buffer)
}


function enableDeck(deck) {
    let deckPlay = deck.querySelector('.play')
    deckPlay.removeAttribute('disabled')
    deck.setAttribute('data-playing', 'true')
}

function togglePlay(node, theButton) {
    sample.buffer = node.buffer
    sample.connect(audioCtx.destination)
    console.log(sample)
    if(theButton.textContent == 'stop') {
        sample.stop()
        theButton.textContent = 'play'
    }else if(theButton.textContent == 'play') {
        sample.start()
        theButton.textContent = 'stop'
    }
}

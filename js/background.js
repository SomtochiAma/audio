document.addEventListener("DOMContentLoaded", () => {
  const synth = window.speechSynthesis
  var rate = document.querySelector("#rate")
  var pitch = document.querySelector("#pitch")
  var voiceSelect = document.querySelector("#voice-select")

  let voices = []

  const getVoices = () => {
    voices = synth.getVoices()
    voices.forEach(voice => {
      const option = document.createElement('option')
      option.textContent = `${voice.name} (${voice.lang})`
      option.setAttribute('data-lang', voice.lang)
      option.setAttribute('data-name', voice.name)
      voiceSelect.appendChild(option)
    })
    console.log("here")
  }
  // getVoices()
  if (!synth.onvoiceschanged) {
    synth.onvoiceschanged = getVoices
  }

  setupFunction()
  var playButton = document.getElementById("play")
  playButton.addEventListener("click", (e) => {   
    e.preventDefault()
    selectedVoice = voiceSelect.options[voiceSelect.selectedIndex].dataset.name
    grabAudioAndPlay(selectedVoice, rate.value, pitch.value)
  })

  var pauseButton = document.getElementById("pause")
  pauseButton.addEventListener("click", (e) => {   
    e.preventDefault()
    pauseAudio()
  })

  var stopButton = document.getElementById("stop")
  stopButton.addEventListener("click", (e) => {   
    e.preventDefault()
    chrome.tabs.executeScript({ code: `stopAudio()`}, errorHandler)
  })
})

function setupFunction() {
  chrome.tabs.executeScript({ file: "js/content.js" })
}


function grabAudioAndPlay(voice, rate, pitch) {
  chrome.tabs.executeScript({ code: `audio("${voice}", ${rate}, ${pitch})`}, errorHandler)
}

function pauseAudio() {
  chrome.tabs.executeScript({ code: `pauseAudio()`}, errorHandler)
}

function errorHandler() {
  var errorDisplay = document.querySelector("#error")
  if (chrome.runtime.lastError) {
    var errorMsg = chrome.runtime.lastError.message
    if (errorMsg == "Cannot access a chrome:// URL") {
        errorMsg = "Cannot play audio in chrome settings :(, visit another url."
    }
    errorDisplay.textContent = errorMsg
  } else {
    errorDisplay.textContent = ''
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const synth = window.speechSynthesis
  console.log(synth)
  var rate = document.querySelector("#rate")
  var rateValue = document.querySelector("#rate-value")
  var pitch = document.querySelector("#pitch")
  var voiceSelect = document.querySelector("#voice-select")

  let voices = []

  const getVoices = () => {
    voices = synth.getVoices()
    console.log(voices)
    console.log("here")
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
  var button = document.getElementById("submit")
  button.addEventListener("click", (e) => {   
    selectedVoice = voiceSelect.options[voiceSelect.selectedIndex].dataset.name
    grabAudioAndPlay(selectedVoice, rate.value, pitch.value)
  })
})

function setupFunction() {
  chrome.tabs.executeScript({ file: "content.js" })
}


function grabAudioAndPlay(voice, rate, pitch) {
  chrome.tabs.executeScript({ code: `audio("${voice}", ${rate}, ${pitch})`})
}





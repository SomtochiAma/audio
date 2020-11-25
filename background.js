const synth = speechSynthesis
let voices = []

document.addEventListener("DOMContentLoaded", () => {
  var voiceSelect = document.querySelector("#voice-select")

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
  }

  // getVoices()
  if (!synth.onvoiceschanged) {
    synth.onvoiceschanged = getVoices
  }

  setupFunction()
  var button = document.getElementById("submit")
  button.addEventListener("click", (e) => {   
    grabAudioAndPlay()
  })
})

function setupFunction() {
  chrome.tabs.executeScript({ file: "content.js" })
}


// function grabAudioAndPlay(voice, rate, pitch) {
//   chrome.tabs.executeScript({ code: `audio("${voice}", ${rate}, ${pitch})`})
// }

function grabAudioAndPlay() {
  chrome.tabs.executeScript({ code: "getSelection()"}, playAudio)
}

function playAudio(results) {
  var rate = document.querySelector("#rate").value
  var pitch = document.querySelector("#pitch").value
  var voiceSelect = document.querySelector("#voice-select")
  var selectedVoiceName = voiceSelect.options[voiceSelect.selectedIndex].dataset.name
  var selectedVoice
  voices.forEach(voice => {
    if (voice.name == selectedVoiceName) {
      selectedVoice = voice
    }
  })

  audio(results[0], selectedVoice, rate, pitch)
}


const audio = (text, voice, rate, pitch) => {
  console.log(text)
  if (synth.speaking) {
    console.error("Already speaking..")
    synth.cancel()
  }

  const speakText = new SpeechSynthesisUtterance(text);
  speakText.onend = e => {
    console.log("Done speaking");
  }

  speakText.onerror = e => {
    console.error("error playing text", e)
  }

  speakText.rate = rate
  speakText.pitch = pitch
  speakText.voice = voice
   
  synth.speak(speakText)
}
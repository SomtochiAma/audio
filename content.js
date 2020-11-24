var synth = speechSynthesis;
let voices = []

const getVoices = () => {
  synth.getVoices()
  console.log(voices)
}

getVoices()
if (synth.onvoiceschanged != undefined) {
  synth.onvoiceschanged = getVoices()
}

const audio = () => {
  // checks if speaking
  if (synth.speaking) {
    console.error("Already speaking..")
    return
  }

  var text = getSelection()
  console.log("herre", text)

  const speakText = new SpeechSynthesisUtterance(text);
  speakText.onend = e => {
    console.log("Done speaking");
  }

  speakText.onerror = e => {
    console.error("error playing text", e)
  }

  // speakText.voice = voices[1] 
  // speakText.rate = 1

  synth.speak(speakText)
}

const getSelection = () => {
  var selectedText = ''; 
  // window.getSelection 
  if (window.getSelection) { 
    selectedText = window.getSelection().toString(); 
  } 
  // document.getSelection 
  if (document.getSelection) {
    selectedText = document.getSelection().toString(); 
  } 
  // document.selection 
  else if (document.selection) { 
    selectedText = document.selection.createRange().text; 
  } screenTop

  if (selectedText == "") {
    selectedText = "No text selected"
  }

  return selectedText
}

// audio()
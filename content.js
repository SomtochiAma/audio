var synth = speechSynthesis;

const audio = (voiceName, rate, pitch) => {
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

  speakText.rate = rate
  speakText.pitch = pitch
  
  window.speechSynthesis.getVoices().forEach(voice => {
    if (voice.name == voiceName) {
      speakText.voice = voice
    }
  })
   
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
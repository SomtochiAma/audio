document.addEventListener("DOMContentLoaded", () => {
    setupFunction()
    var button = document.getElementById("submit")
    button.addEventListener("click", (e) => {     
      grabAudioAndPlay()
    })
})

function setupFunction() {
  chrome.tabs.executeScript({ file: "content.js" })
}


function grabAudioAndPlay() {
  chrome.tabs.executeScript({ code: "audio()" })
}





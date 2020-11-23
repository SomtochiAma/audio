document.addEventListener("DOMContentLoaded", () => {
    // grabAudioAndPlay()
    var button = document.getElementById("submit")
    var headings = document.getElementsByTagName("h2")
    button.addEventListener("click", (e) => {     
      grabAudioAndPlay()
    })
})

function grabAudioAndPlay() {
  console.log("me")
  chrome.tabs.executeScript({ file: "content.js" })
}






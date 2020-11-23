document.addEventListener("DOMContentLoaded", () => {
    var button = document.getElementById("submit")
    var headings = document.getElementsByTagName("h2")
    button.addEventListener("click", (e) => {
      console.log("helloe", headings)
      console.log(e)
    })
})
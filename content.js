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
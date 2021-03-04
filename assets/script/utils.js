function changeElementVisibility(element, toShow = true, displayVisible = "block") {
  toShow ? (element.style.display = displayVisible) : (element.style.display = "none");
}

function getById(id) {
  return document.getElementById(id);
}

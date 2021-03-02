function changeElementVisibility(element, toShow = true, displayVisible = "block") {
  toShow ? (element.style.display = displayVisible) : (element.style.display = "none");
}

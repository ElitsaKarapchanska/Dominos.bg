function changeElementVisibility(element, toShow = true, displayVisible = "block") {
  toShow ? (element.style.display = displayVisible) : (element.style.display = "none");
}

function getById(id) {
  return document.getElementById(id);
}

function loadTemplate(page, container, obj = {}) {
  return fetch("./assets/script/views/" + page)
    .then((res) => res.text())
    .then((res) => {
      let template = Handlebars.compile(res);
      let html = template(obj);
      container.innerHTML = html;
    });
}

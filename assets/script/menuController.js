function cleanCheckedClasses() {
    activePage.forEach(page => page.classList.remove("checked"));
}
activePage.forEach(page => page.addEventListener("click", function (ev) {
    cleanCheckedClasses();
    if(ev.target.nodeName === "SPAN"){
        ev.path[2].classList.add("checked");
    }
}))





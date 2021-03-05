function tooglleClass(ev) {
    console.log(ev.target);
}
activePage.forEach(page=> page.addEventListener("click", function(ev){
   
    if(ev.target.nodeName === "SPAN"){
        if(!(ev.target.className)){
            ev.target.classList.add("checked");
        }
    }
    //todo remove the className from others;
})
)

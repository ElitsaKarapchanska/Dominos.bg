function cleanCheckedClasses() {
    activePage.forEach(page => page.classList.remove("checked"));
}
activePage.forEach(page => page.addEventListener("click", function (ev) {
    cleanCheckedClasses();
    if(ev.target.nodeName === "SPAN"){
        ev.path[2].classList.add("checked");
    }
}));

function createStepperMenu(toDelivery,restaurant,stepperContainer){
   let div_delivery=document.createElement("div");
   div_delivery.className="stepper-btn";
   let stepper_icon1= document.createElement("div");
   stepper_icon1.className="stepper-icon-wrapper";
   let img_delivery=document.createElement("img");
   img_delivery.src="assets/images/step1.svg";
   let span_delivery=document.createElement("span");
   span_delivery.innerHTML = toDelivery ? "ДОСТАВКА" : "ВЗИМАНЕ ОТ МЯСТО";

   let div_restourant=document.createElement("div");
   div_restourant.className="stepper-btn";
   let stepper_icon2= document.createElement("div");
   stepper_icon2.className="stepper-icon-wrapper";
   let img_restaurant=document.createElement("img");
   img_restaurant.src="assets/images/step2.svg";
   let span_restaurant=document.createElement("span");
   span_restaurant.innerHTML = restaurant;

   let div_menu=document.createElement("div");
   div_menu.className="stepper-btn";
   let stepper_icon3= document.createElement("div");
   stepper_icon3.className="stepper-icon-wrapper";
   let img_menu=document.createElement("img");
   img_menu.src="assets/images/step3.svg";
   let span_menu=document.createElement("span");
   span_menu.innerHTML = "Меню";

   let div_end=document.createElement("div");
   div_end.className="stepper-btn";
   let stepper_icon4= document.createElement("div");
   stepper_icon4.className="stepper-icon-wrapper";
   let img_end=document.createElement("img");
   img_end.src="assets/images/step4.svg";
   let span_end=document.createElement("span");
   span_end.innerHTML = "Завършете поръчката си";

   stepper_icon1.append(img_delivery);
   div_delivery.append(stepper_icon1,span_delivery);
   
   stepper_icon2.append(img_restaurant);
   div_restourant.append(stepper_icon2,span_restaurant);

   stepper_icon3.append(img_menu);
   div_menu.append(stepper_icon3,span_menu);

   stepper_icon4.append(img_end);
   div_end.append(stepper_icon4,span_end);

   stepperContainer.append(div_delivery,div_restourant,div_menu,div_end);
}
createStepperMenu(userStorage.getDeliveryChoice(),userStorage.getRestaurant(),stepper);





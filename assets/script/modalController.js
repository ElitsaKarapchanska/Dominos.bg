function openAnyModal() {
  body.classList.add("modal-open");
  modalBackdrop.classList.add("in");
  modalBackdrop.style.visibility = "visible";
  popupModal.classList.add("in");
  popupModal.style.visibility = "visible";
}

function closeAnyModal() {
  body.classList.remove("modal-open");
  modalBackdrop.classList.remove("in");
  modalBackdrop.style.visibility = "hidden";
  popupModal.classList.remove("in");
  popupModal.style.visibility = "hidden";

}

function openLoginModal() {
  openAnyModal(); // for now
}

closeModal.addEventListener("click", closeAnyModal);
popupModal.addEventListener("click", closeAnyModal);
modalBackdrop.addEventListener("click", closeAnyModal);
modalContent.addEventListener("click", function(event) {
    event.stopPropagation();
})
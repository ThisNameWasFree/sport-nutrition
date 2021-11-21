const cartDOM     = document.querySelector(".cart__items");
const cartCounter = document.querySelector(".cart__counter");

// Adding/Removing Active Class Onclick
cartCounter.addEventListener("click", () => {
    cartDOM.classList.toggle("active");
})

const cartDOM      = document.querySelector(".cart__items");
const cartCounter  = document.querySelector(".cart__counter");
const addToCartBtn = document.querySelectorAll(".best__item-cart-adding");

// assign all values from local storage
let cartItems = (JSON.parse(localStorage.getItem("cart_items")) || []);

// Adding/Removing Active Class Onclick
cartCounter.addEventListener("click", () => {
    cartDOM.classList.toggle("active");
})

// Add to Cart
addToCartBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let parentElement = btn.parentElement;

        const product = {
            id:    parentElement.querySelector("#product__id").value,
            name:  parentElement.querySelector(".best__item-title").innerText,
            image: parentElement.querySelector("#image").getAttribute("src"),
            price: parentElement.querySelector(".best__item-price").innerText.replace("$", "")
        }

        let isInCart = cartItems.filter(item => item.id === product.id).length > 0;

        // check if already Exists
        if (!isInCart) {
            addItemToTheDOM(product);
        } else {
            alert("Product is Already in the Cart");
            return;
        }

        cartItems.push(product);
    });

    function addItemToTheDOM(product) {
        // Adding the new Item to the Dom
        cartDOM.insertAdjacentHTML("afterbegin", `
            <div class="cart_item">
              <img id="image" src="${product.image}">
              <h3 class="best__item-title">${product.name}</h3>
              <h2 id="best__item-price">$ ${product.price}</h2>
            </div>
        `);
    }

})
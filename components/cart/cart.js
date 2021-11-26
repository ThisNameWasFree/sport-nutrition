const cartDOM      = document.querySelector(".cart__items");
const cartCounter  = document.querySelector(".cart__counter");
const addToCartBtn = document.querySelectorAll(".best__item-cart-adding");
const totalCost    = document.querySelector(".total__cost");
const totalCount   = document.querySelector("#total__counter");

// assign all values from local storage
let cartItems = (JSON.parse(localStorage.getItem("cart_items")) || []);

document.addEventListener("DOMContentLoaded", loadData);

// Adding/Removing Active Class Onclick
cartCounter.addEventListener("click", () => {
    cartDOM.classList.toggle("active");
})

addToCartBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let parentElement = btn.parentElement;

        const product = {
            id:    parentElement.querySelector("#product__id").value,
            name:  parentElement.querySelector(".best__item-title").innerText,
            image: parentElement.querySelector("#image").getAttribute("src"),
            price: parentElement.querySelector(".best__item-price").innerText.replace("$", ""),
            quantity: 1
        }

        let isInCart = cartItems.filter(item => item.id === product.id).length > 0;

        // check if already Exists
        if (!isInCart) {
            addItemToTheDOM(product);
        } else {
            alert("Product is Already in the Cart");
            return;
        }

        const cartDOMItems = document.querySelectorAll(".cart_item");

        cartDOMItems.forEach(individualItem => {
            if (individualItem.querySelector("#product__id").value === product.id) {
                // increase
                increaseItem(individualItem, product);
                // decrease
                decreaseItem(individualItem, product);
                // remove all items
                removeItem(individualItem, product);
            }
        })

        cartItems.push(product);
        calculateTotal();
        saveToLocalStorage();
    });
})

function addItemToTheDOM(product) {
    // Adding the new Item to the Dom
    cartDOM.insertAdjacentHTML("afterbegin", `
        <div class="cart_item">
          <input type="hidden" id="product__id" value="${product.id}">
          <img id="image" src="${product.image}">
          <h3 class="best__item-title">${product.name}</h3>
          <a class="small-btn" action="decrease">&minus;</a>
          <h3 class="product__quantity">${product.quantity}</h3>
          <a class="small-btn" action="increase">&plus;</a>
          <h2 id="best__item-price">$ ${product.price}</h2>
          <a class="small-btn btn_remove" action="remove">&times;</a>
        </div>
    `);
}

function saveToLocalStorage(){
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
}

function loadData() {
    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            addItemToTheDOM(product);

            const cartDOMItems = document.querySelectorAll(".cart_item");

            cartDOMItems.forEach(individualItem => {
                if (individualItem.querySelector("#product__id").value === product.id) {
                    // increase
                    increaseItem(individualItem, product);
                    // decrease
                    decreaseItem(individualItem, product);
                    // Removing Element
                    removeItem(individualItem, product);

                }
            });
        });
        calculateTotal();
    }
}

function calculateTotal() {
    let total = 0;

    cartItems.forEach(item => {
        total += item.quantity * item.price;
    });

    totalCost.innerText = total;
    totalCount.innerText = cartItems.length;
}

function increaseItem(individualItem, product) {
    individualItem.querySelector("[action='increase']").addEventListener('click', () => {
        // Actual Array
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {
                individualItem.querySelector(".product__quantity").innerText = ++cartItem.quantity;
                calculateTotal();
                saveToLocalStorage();
            }
        })
    });
}

function decreaseItem(individualItem, product) {
    individualItem.querySelector("[action='decrease']").addEventListener('click', () => {
        cartItems.forEach(cartItem => {
            // Actual Array
            if (cartItem.id === product.id) {
                if (cartItem.quantity > 1) {
                    individualItem.querySelector(".product__quantity").innerText = --cartItem.quantity;
                    calculateTotal();
                    saveToLocalStorage();
                } else {
                    cartItems = cartItems.filter(newElements => newElements.id !== product.id);
                    individualItem.remove();
                    calculateTotal();
                    saveToLocalStorage();
                }
            }
        })
    });
}

function removeItem(individualItem, product) {
    individualItem.querySelector("[action='remove']").addEventListener('click', () => {
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {
                cartItems = cartItems.filter(newElements => newElements.id !== product.id);
                individualItem.remove();
                calculateTotal();
                saveToLocalStorage();
            }
        })
    });
}
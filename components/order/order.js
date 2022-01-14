const checkOutBtnFromOrder = document.querySelector("#check_out_btn--from-order-page");

function validate() {
    validateName();
}

function validateName() {
    let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let name = document.getElementById('name').value;

    if(!regName.test(name)) {
        alert('Please enter your full name (first & last name). For example: john doe');
        document.getElementById('name').focus();
        return false;
    } else {
        validateEmail();
        return true;
    }
}

function validateEmail() {
    let regEmail = /\S+@\S+\.\S+/;
    let email = document.getElementById('email').value;

    if(!regEmail.test(email)) {
        alert('Please enter your email. For example: john@gmail.com');
        document.getElementById('email').focus();
        return false;
    } else {
        validatePhone();
        return true;
    }
}

function validatePhone() {
    let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let phone = document.getElementById('phone').value;

    if(!regPhone.test(phone)) {
        alert('Please enter your phone number. For example: 380969952022');
        document.getElementById('phone').focus();
        return false;
    } else {
        validateAddress();
        return true;
    }
}

function validateAddress() {
    let address = document.getElementById('address').value;

    if (!address || address.length <= 5) {
        alert('Please enter your address. At least 6 characters long.');
        document.getElementById('address').focus();
        return false;
    } else if (address.length >= 6) {
        approved();
    }
}

function approved() {
    return checkOutBtnFromOrder.addEventListener("click", () => {
        alert("Thank you! Your order was successfully submitted!");
        clearCartItems();

        // clear input fields
        document.getElementById("name").value = "";
        document.getElementById('email').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('address').value = "";
        document.getElementById('message').value = "";
    })
}

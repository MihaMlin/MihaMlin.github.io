/*------ check if document body is loaded ------*/
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}   else {
    ready()
}

function ready() {
    setCartItems()
    updateCartTotal()
    var removeCartItemButtons = document.getElementsByClassName("remove-cart-item")
    for(var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem)
        button.addEventListener("click", removeItemFromLocalStorage)
    }

    var quantityInputs = document.getElementsByClassName("cart-item-quantity")
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
        input.addEventListener("change", updateCartItemsLocalStorage)
    }
}


function setCartItems() {
    var cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)

    var table = document.getElementsByClassName("cart-table")[0]

    Object.values(cartItems).map(item => {
        var row = table.insertRow();
        row.classList.add("cart-row")
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="${item.image}" alt="not available">
                    <div>
                        <p class="item-name">${item.name}</p>
                        <small>Price: ${item.price}</small>
                        <br>
                        <button type="button" class="remove-cart-item">Remove</button>
                    </div>
                </div>
            </td>
            <td><input type="number" value="${item.inCart}" min="1" class="cart-item-quantity"></td>
            <td class="cart-price">${item.price}</td>
            `
    })
}

function updateCartItemsLocalStorage(event) {
    var buttonClicked = event.target
    var rowOfItem = buttonClicked.parentElement.parentElement
    var nameOfItem = rowOfItem.getElementsByClassName("item-name")[0].innerText

    var cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)

    for(var i = 0; i < Object.values(cartItems).length; i++) {
        if(Object.values(cartItems)[i].name == nameOfItem) {
            Object.values(cartItems)[i].inCart = buttonClicked.value;
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function removeItemFromLocalStorage(event) {
    var buttonClicked = event.target
    var sectionOfItem = buttonClicked.parentElement
    var nameOfItem = sectionOfItem.getElementsByClassName("item-name")[0].innerText

    var cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)

    for(var i = 0; i < Object.values(cartItems).length; i++) {
        if(Object.values(cartItems)[i].name == nameOfItem) {
            Object.values(cartItems).splice(i, 1)
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-page")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var subtotalCartPrice = 0;

    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]

        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement =cartRow.getElementsByClassName("cart-item-quantity")[0]

        var price = parseFloat(priceElement.innerText.replace("€",""))
        var quantity = quantityElement.value
        subtotalCartPrice = subtotalCartPrice + (price * quantity)
    }

    subtotalCartPrice = Math.round(subtotalCartPrice * 100) / 100
    var taxCartPrice = parseFloat(document.getElementsByClassName("cart-tax-price")[0].innerText.replace("€",""))
    var totalCartPrice = Math.round((subtotalCartPrice + taxCartPrice) * 100) / 100

    document.getElementsByClassName("cart-subtotal-price")[0].innerText = subtotalCartPrice.toFixed(2) + "€"
    document.getElementsByClassName("cart-total-price")[0].innerText = totalCartPrice.toFixed(2) + "€"
}
/*------ check if document body is loaded ------*/
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}   else {
    ready()
}

function ready() {

    var items = document.getElementsByClassName("btn-add-cart")
    for(var i = 0; i < items.length; i++) {
        var item = items[i]
        item.addEventListener("click", getItemInformation)
    }
}

function getItemInformation(event) {
    var buttonClicked = event.target
    var itemSection = buttonClicked.parentElement.parentElement

    var itemName = itemSection.getElementsByClassName("item-title")[0].innerText
    var itemPrice = itemSection.getElementsByClassName("item-price")[0].innerText
    var itemImage = itemSection.getElementsByClassName("item-image")[0].src
    var numberOfItems = itemSection.getElementsByClassName("number-of-items")[0].value

    var item = {
        name: itemName,
        price: itemPrice,
        image: itemImage,
        inCart: 0
    }

    addItemToLocalStorage(item, numberOfItems)

}

function addItemToLocalStorage(product, numberOfItems) {

    var cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)

    if(cartItems != null) {
        if(cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart = parseInt(cartItems[product.name].inCart) + parseInt(numberOfItems)

    } else {
        product.inCart = numberOfItems
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}


/*------ counting cart numbers in local storage ------*/
function cartNumbers(product) {

    var productNumbers = localStorage.getItem("cartNumbers")
    productNumbers = parseInt(productNumbers)

    if(productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1)
    } else {
        localStorage.setItem("cartNumbers", 1)
    }

    setItems(product)
    
}

/*------ putting items in local storage ------*/
function setItems(product) {

    var cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    
    if(cartItems != null) {

        if(cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.name]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}
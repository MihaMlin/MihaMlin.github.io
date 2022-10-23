if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}   else {
    ready()
}

function ready() {

    var menuItems = document.getElementById("menu-items");
    menuItems.style.maxHeight = "0px";

    var products = document.getElementsByClassName("product")
    for(var i = 0; i < products.length; i++) {
        var product = products[i]
        product.addEventListener("click", sendData)
    }
}

/*------ toggle menu ------*/

function menutoggle() {
    if(menuItems.style.maxHeight == "0px") {
        menuItems.style.maxHeight = "200px";
    }
    else {
        menuItems.style.maxHeight = "0px";
    }
}


/*------ product detailes correct ------*/

function sendData(event) {
    var productClicked = event.target
    var productSection = productClicked.parentElement

    var name = productSection.getElementsByClassName("product-name")[0].innerText
    var price = productSection.getElementsByClassName("product-price")[0].innerText
    var image = productSection.getElementsByClassName("product-image")[0].src

    var params = new URLSearchParams();
    params.append("name", name)
    params.append("price", price)
    params.append("image", image)

    location.href = "product-details.html?" + params.toString()
}
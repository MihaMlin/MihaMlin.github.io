if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}   else {
    ready()
}

function ready() {

    get()

    var smallImgs = document.getElementsByClassName("small-img");
    for(var i = 0; i < smallImgs.length; i++) {
        var smallImg = smallImgs[i]
        smallImg.addEventListener("click", changeImage)
    }
    
}

function get() {
    var params = new URLSearchParams(window.location.search)
    var name = params.get("name")
    var price = params.get("price")
    var image = params.get("image")
    
    var setName = document.getElementsByClassName("item-title")[0]
    setName.innerText = name

    var setPrice = document.getElementsByClassName("item-price")[0]
    setPrice.innerText = price

    var setImage = document.getElementsByClassName("item-image")[0]
    setImage.src = image
}


function changeImage(event) {
    var smallImg = event.target
    var productImg = document.getElementById("product-img");
    productImg.src = smallImg.src
    
}
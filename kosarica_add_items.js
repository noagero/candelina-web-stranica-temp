const productsEl = document.getElementById('itemContainer');
const cartItemsEl = document.getElementById('add_cart_item');
const subtotalEl = document.querySelector(".kosarica_subtotal");
const brProizUKosar = document.querySelector(".totalQuantity");

function renderProducts(){
    products.forEach((product) => {
        productsEl.innerHTML += `
        <div class="box">

            <div class="image">
                <img src="${product.image}" alt="Suncokret">
                <div class="icons">
                    <a href="#" class="fas fa-heart"></a>
                    <a onclick="addToCart(${product.id})" class="cart-btn" id="add2">Dodaj u košaricu</a>
                    <a href="#" class="fas fa-share"></a>
                </div>
            </div>
            <div class="content">
                <h3>${product.name}</h3>
                <div class="price">${product.price}€</div>
            </div>
        </div>`;
    })
}

if(location.pathname==="/C:/Users/noage/Desktop/candelina-main/index.html" ||"/C:/Users/noage/Desktop/candelina-main/proizvodi.html"){
    renderProducts();
}


let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id){
    if(cart.some((item) => item.id ===id)){
        changeNumberOfUnits("plus", id);
    }else{
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            numberOfUnits:1
        });
    }
    updateCart();
}


function updateCart(){
    localStorage.setItem("CART", JSON.stringify(cart));
    renderCartItems();
    renderSubtotal();
}

function renderCartItems(){
    cartItemsEl.innerHTML = "";
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `<div class="item" id="proizvod_kosarica">
        <img src="${item.image}" alt="${item.name}">
        <div class="content">
            <div class="name" id="name">
                ${item.name} 
            </div>
            <div class="price">
                ${item.price}€/1 komad
            </div>
        </div>
        <div class="quantity">
            <button id="btn-remove" onclick="removeItemFromCart(${item.id})"><span>Ukloni</span></button>
            <button id="btn-smanji" onclick="changeNumberOfUnits('minus', ${item.id})"><span>-</span></button>
            <span class="value" id="broj2">${item.numberOfUnits}</span>
            <button id="btn-povecaj" onclick="changeNumberOfUnits('plus', ${item.id})"><span>+</span></button>
        </div>
    </div>`
    })
}

function renderSubtotal(){
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subtotalEl.innerHTML = `<p>Ukupna cijena (${totalItems} proizvoda): ${totalPrice.toFixed(2)}€</p>`;
    brProizUKosar.innerHTML = `<span>${totalItems}</span>`;

}

const itemUKosarici = document.getElementById("proizvod_kosarica");

function removeItemFromCart(id){
    console.log(cart);
    cart = cart.filter((item) => item.id !== id);
    console.log("local storage:", localStorage)
    updateCart();
}

function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;

        if(item.id === id){
            if(action === "minus" && numberOfUnits>1){
                numberOfUnits--;
            }else if (action === "plus"){
                numberOfUnits++;
            }
            
        }
        return {
            ...item,
            numberOfUnits,
        };
    });
    updateCart();
}
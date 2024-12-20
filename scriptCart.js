function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
    updateTotalPrice();
}

function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
    updateTotalPrice();
}

function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>${item.name || 'Unnamed Product'}</div>
            <div>Price: $${item.price !== undefined ? item.price : 'N/A'}</div>
            <div>
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity || 1}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <div>Total: $${item.price && item.quantity ? (item.price * item.quantity).toFixed(2) : 'N/A'}</div>
        `;
        cartContainer.appendChild(cartItem);
    });
    
}
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateTotalPrice();
});






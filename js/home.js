import header from "../js/utils.js";

let productTbl = document.querySelector(".product-data");
const search = document.getElementById("search");

let products = JSON.parse(localStorage.getItem("products")) || [];
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

const displayProduct = (data = products) => {
    productTbl.innerHTML = "";

    if (data.length === 0) {
        productTbl.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-basket display-1 text-muted"></i>
                <h3 class="mt-3 text-muted">No Products Available</h3>
                <p class="text-secondary">Please add products to get started!</p>
                <a href="/register.html" class="btn btn-success mt-3">
                    <i class="bi bi-plus-circle"></i> Add Your First Product
                </a>
            </div>
        `;
        return;
    }

    data.forEach((product) => {
        const { image, pname, price, description, id } = product;

        let col = document.createElement("div");
        col.classList.add("col-md-3", "mb-4");

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${image}" class="card-img-top" height="250px" style="object-fit: cover;" alt="${pname}">
                <div class="card-body">
                    <h5 class="card-title">${pname}</h5>
                    <h6 class="text-success fw-bold">₹${price}</h6>
                    <p class="card-text text-muted small">${description}</p>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button class="btn btn-success w-100" onclick="addToCart(${id})">
                        <i class="bi bi-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        productTbl.appendChild(col);
    });
};

displayProduct();

const addToCart = (id) => {
    let product = products.find((p) => p.id == id);
    let index = cartData.findIndex((item) => item.id == id);

    if (index !== -1) {
        cartData[index].qty++;
    } else {
        product.qty = 1;
        cartData.push(product);
    }

    localStorage.setItem("cartData", JSON.stringify(cartData));
    
    // Show success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-5 shadow';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = '<i class="bi bi-check-circle-fill"></i> Product added to cart!';
    document.body.appendChild(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 2000);
    
    updateCartCount();
};
window.addToCart = addToCart;

const updateCartCount = () => {
    let badge = document.querySelector(".badge.bg-danger");
    if (!badge) return;
    let cart = JSON.parse(localStorage.getItem("cartData")) || [];
    badge.textContent = cart.length;
};

updateCartCount();

search.addEventListener("input", function () {
    let filterData = products.filter(product =>
        product.pname.toLowerCase().includes(this.value.toLowerCase())
    );
    displayProduct(filterData);
});
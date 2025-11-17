import header from "../js/utils.js";

let productTbl = document.querySelector("#productTbl tbody");
let search = document.getElementById("search");
let products = JSON.parse(localStorage.getItem("products")) || [];

const displayProduct = (data = products) => {
    productTbl.innerHTML = "";

    if (data.length === 0) {
        productTbl.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5">
                    <i class="bi bi-inbox display-1 text-muted"></i>
                    <h5 class="mt-3 text-muted">No Products Found</h5>
                    <a href="/register.html" class="btn btn-success mt-3">Add Product</a>
                </td>
            </tr>
        `;
        return;
    }

    data.forEach((product, index) => {
        const { image, pname, price, description, id } = product;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${image}" height="80px" width="80px" class="rounded" alt="${pname}" />
            </td>
            <td>${pname}</td>
            <td class="text-success fw-bold">₹${price}</td>
            <td>${description}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editProduct(${id})">
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${id})">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </td>
        `;
        productTbl.appendChild(row);
    });
};

displayProduct();

const deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter((val) => val.id != id);
        localStorage.setItem("products", JSON.stringify(products));
        displayProduct();
    }
};
window.deleteProduct = deleteProduct;

const editProduct = (id) => {
    let data = products.find((val) => val.id == id);
    localStorage.setItem("editData", JSON.stringify(data));
    window.location.href = "./edit_product.html";
};
window.editProduct = editProduct;

search.addEventListener("input", function () {
    let filterData = products.filter(product =>
        product.pname.toLowerCase().includes(this.value.toLowerCase().trim())
    );
    displayProduct(filterData);
});
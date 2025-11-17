import header from "../js/utils.js";

const inputs = document.querySelectorAll('#product input, #product textarea');
const form = document.querySelector('#product');
inputs[0].focus();

let products = JSON.parse(localStorage.getItem('products')) || [];
let data = JSON.parse(localStorage.getItem('editData')) || {};

inputs.forEach((input) => {
    input.value = data[input.name];
})

inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        let { name, value } = e.target;
        data = { ...data, [name]: value };
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    products = products.map((value) => {
        if (value.id == data.id) {
            return data;
        }
        return value;
    })
    
    localStorage.setItem('products', JSON.stringify(products));
    
    // Show success message
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-5 shadow';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = '<i class="bi bi-check-circle-fill"></i> Product updated successfully!';
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
        window.location.href = './view_product.html';
    }, 1500);
});
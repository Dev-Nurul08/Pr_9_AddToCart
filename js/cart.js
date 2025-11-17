import header from "../js/utils.js";
let productCart = document.querySelector(".cart");
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

const displayProduct = () => {
    productCart.innerHTML = "";

    if (cartData.length === 0) {
        productCart.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-cart-x display-1 text-muted"></i>
                <h4 class="mt-3">Your cart is empty 🛒</h4>
                <a href="/index.html" class="btn btn-success mt-3">
                    <i class="bi bi-bag-check"></i> Shop Now
                </a>
            </div>
        `;
        return;
    }

    let cartContainer = document.createElement("div");
    cartContainer.className = "col-md-10";

    cartData.forEach((product) => {
        const { image, pname, price, qty, id } = product;

        let cartItem = document.createElement("div");
        cartItem.className = "card mb-3 shadow-sm";

        cartItem.innerHTML = `
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${image}" class="img-fluid rounded" alt="${pname}" />
                    </div>
                    <div class="col-md-4">
                        <h5>${pname}</h5>
                        <span class="text-success fw-bold">₹${price}</span>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Quantity:</label>
                        <input 
                            type="number" 
                            id="qty-${id}" 
                            min="1" 
                            value="${qty}" 
                            class="form-control" 
                            onchange="updateQty(${id})"
                        />
                    </div>
                    <div class="col-md-2">
                        <h6 class="text-secondary">Subtotal:</h6>
                        <h5 class="text-success">₹${price * qty}</h5>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-danger" onclick="removeFromCart(${id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    productCart.appendChild(cartContainer);
    updateCartTotal();
};

const updateQty = (id) => {
    let newQty = parseInt(document.querySelector(`#qty-${id}`).value);
    if (newQty < 1) newQty = 1;

    let product = cartData.find((item) => item.id === id);
    if (product) {
        product.qty = newQty;
        localStorage.setItem("cartData", JSON.stringify(cartData));
        displayProduct();
    }
};
window.updateQty = updateQty;

window.removeFromCart = (id) => {
    cartData = cartData.filter((item) => item.id !== id);
    localStorage.setItem("cartData", JSON.stringify(cartData));
    displayProduct();
    updateCartCount();
};

const updateCartTotal = () => {
    let total = 0;
    cartData.forEach((item) => {
        total += item.price * item.qty;
    });

    let totalContainer = document.querySelector(".cart-total");

    if (cartData.length === 0) {
        if (totalContainer) totalContainer.remove();
        return;
    }

    if (!totalContainer) {
        totalContainer = document.createElement("div");
        totalContainer.classList.add("cart-total", "col-md-10", "mt-3");
        productCart.appendChild(totalContainer);
    }

    totalContainer.innerHTML = `
        <div class="card shadow-sm bg-light">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h4 class="fw-bold">Total Amount:</h4>
                    <h3 class="text-success fw-bold">₹${total}</h3>
                </div>
                <button class="btn btn-success w-100 mt-3" type="button" onclick="handleCheckout()" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="bi bi-credit-card"></i> Proceed to Checkout
                </button>
            </div>
        </div>
    `;
};

const handleCheckout = () => {
    // let modal = document.createElement('div');
    // modal.classList.add
    let modal = `
        <!-- Checkout Modal -->
        <div class="modal fade" id="checkoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content border-0 shadow-lg">
            
            <!-- Header -->
            <div class="modal-header bg-success text-white border-0">
                <h5 class="modal-title" id="checkoutModalLabel">
                <i class="bi bi-credit-card me-2"></i>Checkout
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <!-- Body -->
            <div class="modal-body p-4">
                <div class="row g-4">
                
                <!-- Left Side - Forms -->
                <div class="col-md-7">
                    <!-- Delivery Address Section -->
                    <div class="card mb-3 shadow-sm">
                    <div class="card-header bg-light">
                        <h6 class="mb-0"><i class="bi bi-geo-alt-fill text-success me-2"></i>Delivery Address</h6>
                    </div>
                    <div class="card-body">
                        <form id="addressForm">
                        <div class="row g-3">
                            <div class="col-md-6">
                            <label class="form-label">Full Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="fullName" required placeholder="John Doe">
                            </div>
                            <div class="col-md-6">
                            <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                            <input type="tel" class="form-control" id="phone" required placeholder="+91 98765 43210" pattern="[0-9+\s-]{10,15}">
                            </div>
                            <div class="col-12">
                            <label class="form-label">Address <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="address" rows="2" required placeholder="House No., Street, Area"></textarea>
                            </div>
                            <div class="col-md-6">
                            <label class="form-label">City <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="city" required placeholder="Mumbai">
                            </div>
                            <div class="col-md-3">
                            <label class="form-label">State <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="state" required placeholder="Maharashtra">
                            </div>
                            <div class="col-md-3">
                            <label class="form-label">PIN Code <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="pincode" required placeholder="400001" pattern="[0-9]{6}">
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>

                    <!-- Payment Method Section -->
                    <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h6 class="mb-0"><i class="bi bi-wallet2 text-success me-2"></i>Payment Method</h6>
                    </div>
                    <div class="card-body">
                        
                        <!-- Cash on Delivery -->
                        <div class="form-check p-3 border rounded mb-3">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="codPayment" value="cod" checked>
                        <label class="form-check-label w-100" for="codPayment">
                            <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <i class="bi bi-cash-coin text-success fs-4 me-2"></i>
                                <span class="fw-semibold">Cash on Delivery</span>
                            </div>
                            <span class="badge bg-success">Available</span>
                            </div>
                            <small class="text-muted d-block mt-2 ms-5">Pay when you receive your order</small>
                        </label>
                        </div>

                        <!-- UPI Payment -->
                        <div class="form-check p-3 border rounded mb-3">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="upiPayment" value="upi">
                        <label class="form-check-label w-100" for="upiPayment">
                            <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <i class="bi bi-phone text-primary fs-4 me-2"></i>
                                <span class="fw-semibold">UPI Payment</span>
                            </div>
                            <div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png" height="20" alt="UPI">
                            </div>
                            </div>
                            <small class="text-muted d-block mt-2 ms-5">Google Pay, PhonePe, Paytm & more</small>
                        </label>
                        </div>
                        
                        <!-- UPI ID Input -->
                        <div id="upiDetails" class="ms-5 mb-3" style="display: none;">
                        <input type="text" class="form-control" id="upiId" placeholder="Enter UPI ID (example@upi)">
                        </div>

                        <!-- Card Payment -->
                        <div class="form-check p-3 border rounded mb-3">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="cardPayment" value="card">
                        <label class="form-check-label w-100" for="cardPayment">
                            <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <i class="bi bi-credit-card text-info fs-4 me-2"></i>
                                <span class="fw-semibold">Credit / Debit Card</span>
                            </div>
                            <div>
                                <i class="bi bi-credit-card-fill text-primary fs-5 me-1"></i>
                                <i class="bi bi-credit-card-2-front-fill text-danger fs-5"></i>
                            </div>
                            </div>
                            <small class="text-muted d-block mt-2 ms-5">Visa, Mastercard, Rupay accepted</small>
                        </label>
                        </div>

                        <!-- Card Details -->
                        <div id="cardDetails" class="ms-5 mb-3" style="display: none;">
                        <div class="row g-2">
                            <div class="col-12">
                            <input type="text" class="form-control" id="cardNumber" placeholder="Card Number" maxlength="19">
                            </div>
                            <div class="col-6">
                            <input type="text" class="form-control" id="cardExpiry" placeholder="MM/YY" maxlength="5">
                            </div>
                            <div class="col-6">
                            <input type="text" class="form-control" id="cardCvv" placeholder="CVV" maxlength="3">
                            </div>
                            <div class="col-12">
                            <input type="text" class="form-control" id="cardHolder" placeholder="Cardholder Name">
                            </div>
                        </div>
                        </div>

                        <!-- Net Banking -->
                        <div class="form-check p-3 border rounded">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="netBanking" value="netbanking">
                        <label class="form-check-label w-100" for="netBanking">
                            <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <i class="bi bi-bank text-warning fs-4 me-2"></i>
                                <span class="fw-semibold">Net Banking</span>
                            </div>
                            <small class="text-muted">All Banks</small>
                            </div>
                            <small class="text-muted d-block mt-2 ms-5">Pay securely through your bank</small>
                        </label>
                        </div>

                        <!-- Bank Selection -->
                        <div id="bankDetails" class="ms-5 mt-3" style="display: none;">
                        <select class="form-select" id="bankSelect">
                            <option selected>Select Your Bank</option>
                            <option>State Bank of India</option>
                            <option>HDFC Bank</option>
                            <option>ICICI Bank</option>
                            <option>Axis Bank</option>
                            <option>Punjab National Bank</option>
                            <option>Bank of Baroda</option>
                            <option>Other</option>
                        </select>
                        </div>

                    </div>
                    </div>

                </div>

                <!-- Right Side - Order Summary (DYNAMIC) -->
                <div class="col-md-5">
                    <div class="card shadow-sm sticky-top" style="top: 20px;">
                    <div class="card-header bg-light">
                        <h6 class="mb-0">
                        <i class="bi bi-receipt text-success me-2"></i>Order Summary
                        <span class="badge bg-success ms-2" id="itemCount">0 items</span>
                        </h6>
                    </div>
                    <div class="card-body">
                        
                        <!-- Cart Items (DYNAMIC) -->
                        <div class="order-items mb-3" id="checkoutOrderItems" style="max-height: 300px; overflow-y: auto;">
                        <!-- Items will be loaded dynamically -->
                        </div>

                        <!-- Price Breakdown -->
                        <div class="border-top pt-3">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Subtotal</span>
                            <span id="checkoutSubtotal">₹0</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Delivery Charges</span>
                            <span class="text-success" id="deliveryCharges">FREE</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Discount</span>
                            <span class="text-success" id="discountAmount">- ₹0</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">GST (5%)</span>
                            <span id="gstAmount">₹0</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-3">
                            <h5 class="mb-0 fw-bold">Total Amount</h5>
                            <h5 class="mb-0 text-success fw-bold" id="checkoutTotal">₹0</h5>
                        </div>

                        <!-- Promo Code -->
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Enter Promo Code" id="promoCode">
                            <button class="btn btn-outline-success" type="button" id="applyPromoBtn">Apply</button>
                        </div>

                        <!-- Terms & Conditions -->
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="termsCheck" required>
                            <label class="form-check-label small" for="termsCheck">
                            I agree to the <a href="#" class="text-success">Terms & Conditions</a>
                            </label>
                        </div>

                        <!-- Savings Badge -->
                        <div class="alert alert-success mb-0" id="savingsAlert" style="display: none;">
                            <i class="bi bi-piggy-bank me-2"></i>
                            <small>You're saving <strong id="totalSavings">₹0</strong> on this order!</small>
                        </div>

                        </div>

                    </div>
                    </div>
                </div>

                </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-0 bg-light">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                <i class="bi bi-x-circle"></i> Cancel
                </button>
                <button type="button" class="btn btn-success btn-lg px-5" id="placeOrderBtn">
                <i class="bi bi-check-circle"></i> Place Order
                </button>
            </div>

            </div>
        </div>
        </div>
    `;

    let getModal = document.getElementById('getModal');
    getModal.appendChild('getModal');
}

const updateCartCount = () => {
    let badge = document.querySelector(".badge.bg-danger");
    if (badge) badge.textContent = cartData.length;
};

displayProduct();
updateCartCount();
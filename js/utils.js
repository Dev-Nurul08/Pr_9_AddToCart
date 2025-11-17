const header = `
<nav class="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="/index.html">
      <i class="bi bi-cart-check-fill"></i> FreshMart Groceries
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/index.html"><i class="bi bi-house-door"></i> Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register.html"><i class="bi bi-plus-circle"></i> Add Product</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/view_product.html"><i class="bi bi-box-seam"></i> Manage Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link position-relative" href="/cart.html">
            <i class="bi bi-cart3"></i> Cart
            <span class="badge bg-danger position-absolute top-0 start-100 translate-middle">0</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;

document.body.insertAdjacentHTML('afterbegin', header);

export default header;
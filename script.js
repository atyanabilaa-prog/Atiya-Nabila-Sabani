/*====================================
      LUMIÈRE KEBAYA
====================================*/

/*=========================
      VARIABEL
=========================*/

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

const kategoriBtn = document.querySelectorAll(".kategori-btn");

let cart = [];

let wishlist = [];

let selectedProduct = null;

/*=========================
      FORMAT RUPIAH
=========================*/

function rupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

/*=========================
      RATING BINTANG
=========================*/

function createStars(rating) {
  let star = "";

  let full = Math.floor(rating);

  for (let i = 0; i < full; i++) {
    star += "⭐";
  }

  return star;
}

/*=========================
      TAMPILKAN PRODUK
=========================*/

function displayProducts(list) {
  productContainer.innerHTML = "";

  list.forEach((product) => {
    productContainer.innerHTML += `

<div class="product-card fade-up">

<img
src="${product.image}"
alt="${product.name}"
class="product-image">

<div class="product-info">

<h3>${product.name}</h3>

<div class="product-price">

${rupiah(product.price)}

</div>

<div class="rating">

${createStars(product.rating)}

<span>

${product.rating}

|

${product.sold} Terjual

</span>

</div>

<button
class="detail-btn"
onclick="openProduct(${product.id})">

Lihat Detail

</button>

</div>

</div>

`;
  });
}

/*=========================
      LOAD PRODUK
=========================*/

displayProducts(products);
/*=========================
      POPUP PRODUK
=========================*/

const productModal = document.getElementById("productModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalStock = document.getElementById("modalStock");
const modalRating = document.getElementById("modalRating");

const overlay = document.getElementById("overlay");

const closeProductModal = document.getElementById("closeProductModal");

function openProduct(id) {
  selectedProduct = products.find((item) => item.id === id);

  if (!selectedProduct) return;

  modalImage.src = selectedProduct.image;

  modalName.innerHTML = selectedProduct.name;

  modalPrice.innerHTML = rupiah(selectedProduct.price);

  modalDescription.innerHTML = selectedProduct.description;

  modalStock.innerHTML = selectedProduct.stock;

  modalRating.innerHTML =
    selectedProduct.rating + " ⭐ | " + selectedProduct.sold + " Terjual";

  document.getElementById("qty").value = 1;

  productModal.classList.add("active");

  overlay.classList.add("active");
}

closeProductModal.onclick = () => {
  productModal.classList.remove("active");

  overlay.classList.remove("active");
};

overlay.onclick = () => {
  productModal.classList.remove("active");

  cartSidebar.classList.remove("active");

  checkoutModal.classList.remove("active");

  paymentModal.classList.remove("active");

  overlay.classList.remove("active");
};

/*=========================
      QUANTITY
=========================*/

const qty = document.getElementById("qty");

document.getElementById("plusQty").onclick = () => {
  qty.value++;
};

document.getElementById("minusQty").onclick = () => {
  if (qty.value > 1) {
    qty.value--;
  }
};

/*=========================
      CHAT SELLER
=========================*/

document.getElementById("chatSeller").onclick = () => {
  const pesan = `Halo Admin Lumière Kebaya 👋

Saya tertarik dengan produk:

${selectedProduct.name}

Harga :
${rupiah(selectedProduct.price)}

Apakah masih tersedia? 😊`;

  window.open(
    "https://wa.me/6285878511529?text=" + encodeURIComponent(pesan),

    "_blank",
  );
};

/*=========================
      BELI SEKARANG
=========================*/

document.getElementById("modalBuy").onclick = () => {
  addToCart(selectedProduct.id);

  productModal.classList.remove("active");

  cartSidebar.classList.add("active");
};

/*=========================
      WISHLIST
=========================*/

const wishlistCount = document.getElementById("wishlistCount");

function addWishlist(id) {
  if (!wishlist.includes(id)) {
    wishlist.push(id);

    wishlistCount.innerHTML = wishlist.length;

    showToast("Produk ditambahkan ke Wishlist ❤️");
  } else {
    showToast("Produk sudah ada di Wishlist");
  }
}
/*=========================
      KERANJANG
=========================*/

const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

cartBtn.onclick = () => {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
};

closeCart.onclick = () => {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
};

/*=========================
      TAMBAH KERANJANG
=========================*/

function addToCart(id) {
  const product = products.find((item) => item.id === id);

  const qty = parseInt(document.getElementById("qty").value);

  const exist = cart.find((item) => item.id === id);

  if (exist) {
    exist.qty += qty;
  } else {
    cart.push({
      ...product,

      qty: qty,
    });
  }

  updateCart();

  showToast("Produk berhasil ditambahkan 🛒");
}

/*=========================
      TOMBOL TAMBAH KERANJANG
=========================*/

document.getElementById("modalCart").onclick = () => {
  if (selectedProduct) {
    addToCart(selectedProduct.id);
  }
};

/*=========================
      UPDATE KERANJANG
=========================*/

function updateCart() {
  cartItems.innerHTML = "";

  let total = 0;

  let jumlah = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `

        <p class="empty">

            Keranjang masih kosong.

        </p>

        `;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    jumlah += item.qty;

    cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>${rupiah(item.price)}</p>

                <small>

                    Qty : ${item.qty}

                </small>

            </div>

            <button
            class="remove-cart"
            onclick="removeCart(${index})">

            🗑️

            </button>

        </div>

        `;
  });

  cartTotal.innerHTML = rupiah(total);

  cartCount.innerHTML = jumlah;
}

/*=========================
      HAPUS ITEM
=========================*/

function removeCart(index) {
  cart.splice(index, 1);

  updateCart();

  showToast("Produk dihapus.");
}

/*=========================
      RESET KERANJANG
=========================*/

document.getElementById("resetCart").onclick = () => {
  cart = [];

  updateCart();

  showToast("Keranjang dikosongkan.");
};
/*====================================
        PART 4A - CHECKOUT
====================================*/

const checkoutModal = document.getElementById("checkoutModal");
const checkoutBtn = document.getElementById("checkoutBtn");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutProduct = document.getElementById("checkoutProduct");
const checkoutTotalText = document.getElementById("checkoutTotal");

/*=========================
      BUKA CHECKOUT
=========================*/

checkoutBtn.onclick = () => {
  if (cart.length == 0) {
    showToast("Keranjang masih kosong.");

    return;
  }

  loadCheckout();

  cartSidebar.classList.remove("active");

  checkoutModal.classList.add("active");

  overlay.classList.add("active");
};

/*=========================
      TUTUP CHECKOUT
=========================*/

closeCheckout.onclick = () => {
  checkoutModal.classList.remove("active");

  overlay.classList.remove("active");
};

/*=========================
      ISI PRODUK CHECKOUT
=========================*/

function loadCheckout() {
  checkoutProduct.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    checkoutProduct.innerHTML += `

        <div class="checkout-item">

            <div>

                <strong>${item.name}</strong>

                <br>

                Qty : ${item.qty}

            </div>

            <div>

                ${rupiah(item.price * item.qty)}

            </div>

        </div>

        `;
  });

  checkoutTotalText.innerHTML = rupiah(total);
}

/*=========================
      VALIDASI FORM
=========================*/

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

/*=========================
      SIMPAN DATA PEMBELI
=========================*/

function getCustomer() {
  return {
    nama: document.getElementById("namaPenerima").value,

    alamat: document.getElementById("alamat").value,

    telepon: document.getElementById("telepon").value,
  };
}

/*=========================
      TOMBOL LANJUT PEMBAYARAN
=========================*/

document.getElementById("paymentBtn").onclick = () => {
  const customer = getCustomer();

  if (customer.nama == "") {
    showToast("Nama penerima wajib diisi");

    return;
  }

  if (customer.alamat == "") {
    showToast("Alamat wajib diisi");

    return;
  }

  if (customer.telepon == "") {
    showToast("Nomor HP wajib diisi");

    return;
  }

  checkoutModal.classList.remove("active");

  paymentModal.classList.add("active");
};

/*=========================
      HITUNG TOTAL BELANJA
=========================*/

function getTotalBelanja() {
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
  });

  return total;
}
/*====================================
        PART 4B - PEMBAYARAN
====================================*/

const paymentModal = document.getElementById("paymentModal");
const closePayment = document.getElementById("closePayment");
const paymentInfo = document.getElementById("paymentInfo");

const rekening = {
  BNI: {
    nama: "Bank BNI",
    nomor: "1980210720",
    logo: "payment/bni.png",
  },

  BCA: {
    nama: "Bank BCA",
    nomor: "1980210722",
    logo: "payment/bca.png",
  },

  MANDIRI: {
    nama: "Bank Mandiri",
    nomor: "1980210731",
    logo: "payment/mandiri.png",
  },

  DANA: {
    nama: "DANA",
    nomor: "085878511529",
    logo: "payment/dana.png",
  },

  SEABANK: {
    nama: "SeaBank",
    nomor: "901937445877",
    logo: "payment/seabank.png",
  },
};

/*=========================
      TUTUP PAYMENT
=========================*/

closePayment.onclick = () => {
  paymentModal.classList.remove("active");

  overlay.classList.remove("active");
};

/*=========================
      PILIH PEMBAYARAN
=========================*/

document.querySelectorAll(".payment").forEach((btn) => {
  btn.onclick = () => {
    const metode = btn.dataset.pay;

    showPayment(metode);
  };
});

/*=========================
      TAMPILKAN PEMBAYARAN
=========================*/

function showPayment(metode) {
  paymentInfo.classList.add("active");

  const total = rupiah(getTotalBelanja());

  /*=====================
        COD
======================*/

  if (metode == "COD") {
    paymentInfo.innerHTML = `

<h3>🚚 Cash On Delivery</h3>

<p>

Silakan siapkan pembayaran sebesar

</p>

<h2>${total}</h2>

<p>

Pembayaran dilakukan saat pesanan diterima.

</p>

<button
class="copy-btn"
onclick="finishOrder()">

Selesai

</button>

`;

    return;
  }

  /*=====================
        QRIS
======================*/

  if (metode == "QRIS") {
    paymentInfo.innerHTML = `

<h3>Pembayaran QRIS</h3>

<img
src="payment/qris-code.png"
class="qris-image">

<p class="payment-name">

Atas Nama

<br>

<b>Atiya Nabila Sabani</b>

</p>

<h2>${total}</h2>

<button
class="copy-btn"
onclick="finishOrder()">

Saya Sudah Bayar

</button>

`;

    return;
  }

  /*=====================
        BANK
======================*/

  const bank = rekening[metode];

  paymentInfo.innerHTML = `

<img
src="${bank.logo}"
class="bank-logo">

<h3>${bank.nama}</h3>

<p>

Atas Nama

</p>

<h3>

Atiya Nabila Sabani

</h3>

<p class="account-number">

${bank.nomor}

</p>

<h2>

${total}

</h2>

<button
class="copy-btn"
onclick="copyRekening('${bank.nomor}')">

Salin Nomor Rekening

</button>

<br><br>

<button
class="copy-btn"
onclick="finishOrder()">

Saya Sudah Transfer

</button>

`;
}

/*=========================
      COPY REKENING
=========================*/

function copyRekening(no) {
  navigator.clipboard.writeText(no);

  showToast("Nomor rekening berhasil disalin.");
}

/*=========================
      SELESAI PESANAN
=========================*/

function finishOrder() {
  showToast("Terima kasih telah berbelanja 💛");

  cart = [];

  updateCart();

  paymentModal.classList.remove("active");

  overlay.classList.remove("active");

  paymentInfo.classList.remove("active");

  paymentInfo.innerHTML = "";

  checkoutForm.reset();
}
/*====================================
        PART 4C
====================================*/

/*=========================
        SEARCH
=========================*/

searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();

  const hasil = products.filter((item) =>
    item.name.toLowerCase().includes(keyword),
  );

  displayProducts(hasil);
});

/*=========================
      FILTER KATEGORI
=========================*/

kategoriBtn.forEach((btn) => {
  btn.onclick = () => {
    kategoriBtn.forEach((x) => x.classList.remove("active"));

    btn.classList.add("active");

    const kategori = btn.dataset.category;

    if (kategori == "Semua") {
      displayProducts(products);

      return;
    }

    const hasil = products.filter((item) => item.category == kategori);

    displayProducts(hasil);
  };
});

/*=========================
      HERO SLIDER
=========================*/

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));

  slides[index].classList.add("active");
}

document.getElementById("nextSlide").onclick = () => {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
};

document.getElementById("prevSlide").onclick = () => {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
};

/*=========================
      BANNER KE PRODUK
=========================*/

document.querySelectorAll(".goProduct").forEach((btn) => {
  btn.onclick = () => {
    const id = Number(btn.dataset.product);

    openProduct(id);
  };
});

/*=========================
      BELANJA SEKARANG
=========================*/

document.getElementById("shopNow").onclick = () => {
  document
    .getElementById("produk")

    .scrollIntoView({
      behavior: "smooth",
    });
};

/*=========================
      TOAST
=========================*/

const toast = document.getElementById("toast");

const toastText = document.getElementById("toastText");

function showToast(text) {
  toastText.innerHTML = text;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/*=========================
      BACK TO TOP
=========================*/

const backTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

backTop.onclick = () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
};

/*=========================
      LOADING
=========================*/

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loadingOverlay").style.display = "none";
  }, 800);
});

/*=========================
      LOCAL STORAGE
=========================*/

function saveCart() {
  localStorage.setItem(
    "lumiere-cart",

    JSON.stringify(cart),
  );
}

function loadCart() {
  const data = localStorage.getItem("lumiere-cart");

  if (data) {
    cart = JSON.parse(data);

    updateCart();
  }
}

const oldUpdateCart = updateCart;

updateCart = function () {
  oldUpdateCart();

  saveCart();
};

loadCart();

/*=========================
      ANIMASI SCROLL
=========================*/

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document
  .querySelectorAll(".fade-up")

  .forEach((el) => observer.observe(el));

/*=========================
      START
=========================*/

displayProducts(products);

updateCart();
window.openProduct = openProduct;
window.addWishlist = addWishlist;
window.removeCart = removeCart;

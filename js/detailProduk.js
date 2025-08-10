  // Data and constants
  const pricePerUnit = 59833; // Assume price per unit based on total price 12 * 59833 = 718000 approx
  const maxStock = 12;

  const qtyInput = document.getElementById('qty-input');
  const qtyMinusBtn = document.getElementById('qty-minus');
  const qtyPlusBtn = document.getElementById('qty-plus');
  const totalPriceEl = document.getElementById('total-price');
  const stockCountEl = document.getElementById('stock-count');
  const orderBtn = document.getElementById('order-btn');
  const thumbnails = document.querySelectorAll('div.flex > div.flex-col img');
  const mainImage = document.getElementById('main-image');
  const lihatBtn = document.getElementById('lihatBtn');

  stockCountEl.textContent = maxStock;

  function updateTotalPrice(qty) {
    function formatRupiah(number){
      return 'Rp.' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    totalPriceEl.textContent = formatRupiah(pricePerUnit * qty);
  }
  updateTotalPrice(parseInt(qtyInput.value, 10));

  qtyMinusBtn.addEventListener('click', () => {
    let currentQty = parseInt(qtyInput.value, 10);
    if(currentQty > 1) {
      currentQty -= 1;
      qtyInput.value = currentQty;
      updateTotalPrice(currentQty);
    }
  });

  qtyPlusBtn.addEventListener('click', () => {
    let currentQty = parseInt(qtyInput.value, 10);
    if(currentQty < maxStock) {
      currentQty += 1;
      qtyInput.value = currentQty;
      updateTotalPrice(currentQty);
    }
  });

  //pas klik gambar keubh sendiri
  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.src;
      mainImage.alt = thumb.alt;
    });
  });

  orderBtn.addEventListener('click', () => {
    const selectedSize = document.querySelector('input[name="size"]:checked');
    if (!selectedSize) {
      alert('Pilih ukuran terlebih dahulu.');
      return;
    }
    const selectedColor = document.getElementById('color-select').value;
    const quantity = qtyInput.value;
    alert(`Pesanan dibuat:\nProduk: Nama Produk\nUkuran: ${selectedSize.value}\nWarna: ${selectedColor}\nJumlah: ${quantity}\nTotal: ${totalPriceEl.textContent}`);
  });

  const menuToggle = document.getElementById("menuToggle");
      const mobileMenu = document.getElementById("mobileMenu");

      menuToggle?.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        menuToggle.classList.toggle("open");
      });
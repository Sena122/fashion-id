const products = Array(12)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    name: "Nama Produk " + (i + 1),
    price: 100000,
    rating: 4.8,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1c01cca5-4529-4fb5-93c1-f54e353c0b4b.png${
      i + 1
    }`,
    liked: false,
  }));

const PRODUCTS_PER_PAGE = 4;
let currentPage = 1;
let filteredProducts = products;

const productListEl = document.getElementById("productList");
const currentPageIndicator = document.getElementById("currentPageIndicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

const heartSVG = (liked) => `
  <svg class="heart ${
    liked ? "liked" : ""
  }" viewBox="0 0 24 24" fill="none" stroke="#e0245e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-label="${
  liked ? "Hapus dari favorit" : "Tambah ke favorit"
}" role="img" tabindex="0">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.72-7.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
`;

function createProductCard(product) {
  const stars = "★".repeat(Math.floor(product.rating));
  const halfStar = product.rating % 1 >= 0.5 ? "½" : "";

  return `
    <article tabindex="0" class="relative border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col justify-between">
      <div class="relative">
        <img src="${product.image}" alt="Gambar produk ${product.name}" 
          onerror="this.onerror=null;this.src='https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5c2a935a-40d5-4d1c-886b-78621caca153.png';" 
          class="w-full h-36 object-cover rounded-t-xl" />
        <button class="absolute top-2 right-2" aria-pressed="${
          product.liked
        }" aria-label="${
    product.liked ? "Unfavorite produk" : "Favoritkan produk"
  }" onclick="toggleLike(${product.id}, event)">
          ${heartSVG(product.liked)}
        </button>
      </div>
      <div class="px-4 py-3 flex flex-col space-y-2">
        <h4 class="text-gray-700 font-semibold truncate" title="${
          product.name
        }">${product.name}</h4>
        <p class="text-indigo-600 font-bold">${formatRupiah(product.price)}</p>
        <div class="flex items-center space-x-2 text-yellow-400" aria-label="Rating ${
          product.rating
        } dari 5">
          <span title="Rating">${stars}${halfStar}</span>
          <span class="text-gray-400 text-xs">|</span>
          <span class="text-gray-500 text-xs">${product.rating}</span>
        </div>
        <div class="flex space-x-1 text-xs text-gray-600" aria-label="Ukuran tersedia">
          ${product.sizes
            .map(
              (size) =>
                `<span class="border border-gray-300 rounded px-2 py-[2px]">${size}</span>`
            )
            .join("")}
        </div>
      </div>
      <div class="px-4 pb-4">
        <button aria-label="Beli produk ${
          product.name
        }" class="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-medium py-2 rounded-lg shadow">
          BELI
        </button>
      </div>
    </article>
  `;
}

function renderProducts() {
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(start, end);

  productListEl.innerHTML = visibleProducts.map(createProductCard).join("");
  currentPageIndicator.textContent = currentPage;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * PRODUCTS_PER_PAGE >= filteredProducts.length;
}

function changePage(page) {
  const maxPage = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  if (page < 1 || page > maxPage) return;
  currentPage = page;
  renderProducts();
  scrollToTop();
}

function scrollToTop() {
  productListEl.scrollIntoView({ behavior: "smooth" });
}

function handleSearch() {
  const query = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query)
  );
  currentPage = 1;
  renderProducts();
}

function toggleLike(id, event) {
  event.stopPropagation();
  const product = products.find((p) => p.id === id);
  if (!product) return;
  product.liked = !product.liked;
  renderProducts();
}

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("max-h-0");
  mobileMenu.classList.toggle("max-h-60");
});

renderProducts();
let products = [];
let filteredProducts = [];
const PRODUCTS_PER_PAGE = 4;
let currentPage = 1;

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuToggle.classList.toggle("open");
});

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
  <svg class="heart ${liked ? "liked" : ""}" viewBox="0 0 24 24" fill="none" stroke="#e0245e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.72-7.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
`;

function createProductCard(product) {
  const stars = "★".repeat(Math.floor(product.rating));
  const halfStar = product.rating % 1 >= 0.5 ? "½" : "";

  return `
    <article class="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col justify-between">
      <div class="relative">
        <img src="${product.image}" alt="${product.name}" 
             onerror="this.onerror=null;this.src='https://placehold.co/300x200?text=No+Image';"
             class="w-full h-40 object-cover rounded-t-xl" />
        <button class="absolute top-2 right-2" onclick="toggleLike(${product.id}, event)">
          ${heartSVG(product.liked)}
        </button>
      </div>
      <div class="p-4">
        <h4 class="font-semibold text-gray-800 truncate" title="${product.name}">${product.name}</h4>
        <p class="text-indigo-700 font-bold">${formatRupiah(product.price)}</p>
        <div class="text-sm text-yellow-500">${stars}${halfStar} <span class="text-gray-500 text-xs ml-1">(${product.rating})</span></div>
        <div class="flex flex-wrap mt-2 gap-1 text-xs">
          ${product.sizes.map(size => `<span class="border px-2 py-0.5 rounded">${size}</span>`).join("")}
        </div>
        <a href="detailProduk.html" 
           class="mt-3 block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium btn-beli">
          BELI
        </a>
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
  productListEl.scrollIntoView({ behavior: "smooth" });
}

function handleSearch() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
  currentPage = 1;
  renderProducts();
}

function toggleLike(id, event) {
  event.stopPropagation();
  const product = products.find(p => p.id === id);
  if (product) {
    product.liked = !product.liked;
    renderProducts();
  }
}

async function fetchProducts() {
  try {
    const response = await fetch("api/products.php");
    const data = await response.json();
    products = data;
    filteredProducts = data;
    renderProducts();
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
    productListEl.innerHTML = "<p class='text-center text-red-500'>Gagal memuat produk.</p>";
  }
}

products = [
  {
    id: 1,
    name: "River Tubing Adventure",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 599000,
    rating: 4.5,
    sizes: ["S", "M", "L", "XL", "XXL"],
    liked: false
  },
  {
    id: 2,
    name: "Cave Exploration Tour",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 718000,
    rating: 4.2,
    sizes: ["M", "L", "XL"],
    liked: false
  },
  {
    id: 3,
    name: "Mountain Hiking Trip",
    image: "https://placehold.co/300x200?text=Hiking",
    price: 820000,
    rating: 4.8,
    sizes: ["S", "M", "L"],
    liked: false
  },
  {
    id: 4,
    name: "Beach Camping Night",
    image: "https://placehold.co/300x200?text=Camping",
    price: 450000,
    rating: 4.0,
    sizes: ["L", "XL"],
    liked: false
  }
];

filteredProducts = products;
renderProducts();


// fetchProducts();

// API endpoint
const apiURL = "https://apakek.com/api/produk";

// Fungsi memuat produk dari API
async function loadProduk() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (!Array.isArray(data)) throw new Error("Data bukan array");

    const container = document.getElementById("produkContainer");
    if (!container) return;

    container.innerHTML = "";

    data.forEach((produk) => {
      const card = document.createElement("div");
      card.className =
        "min-w-[200px] bg-white rounded-lg shadow p-4 flex-shrink-0";
      card.innerHTML = `
        <img src="${produk.gambar}" alt="${
        produk.nama
      }" class="w-full h-40 object-cover rounded mb-3">
        <h3 class="font-semibold text-lg text-gray-800">${produk.nama}</h3>
        <p class="text-indigo-900 font-bold text-sm">Rp${produk.harga.toLocaleString(
          "id-ID"
        )}</p>
        <a href="produk/${
          produk.id
        }" class="mt-2 inline-block text-sm text-indigo-600 hover:underline">Lihat Detail</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Gagal memuat produk:", error);
    const container = document.getElementById("produkContainer");
    if (container) {
      container.innerHTML = `<p class="text-red-500">Gagal memuat produk. Silakan coba lagi nanti.</p>`;
    }
  }
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuToggle.classList.toggle("open");
});


document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadProduk();
});

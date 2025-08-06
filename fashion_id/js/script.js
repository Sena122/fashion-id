const heroSlides = [
  {
    textTop: "TEMUKAN FASHION ANDA",
    textHighlight: "AGAR",
    textBottom: "LEBIH MENARIK",
    bgImage:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5ed25062-eff5-42a4-bd56-e55a23a48e24.png",
    alt: "Soft-focus image showing a clothing rack with neutral-toned fashion items like shirts and jackets hanging in bright, warm lighting",
  },
  {
    textTop: "GAYA TERBARU DALAM",
    textHighlight: "FASHION",
    textBottom: "YANG MEMUKAU",
    bgImage:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e61c92b-110d-4540-bfd7-ae3a45ef36b0.png",
    alt: "Bright and dynamic fashion showcase with stylish modern clothing displayed on mannequins and racks in a trendy boutique",
  },
  {
    textTop: "JADILAH TRENDSETTER",
    textHighlight: "DENGAN",
    textBottom: "KOLEKSI TERKINI",
    bgImage:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a077d9db-fca7-4529-a941-2bcd1e853da6.png",
    alt: "Interior of a colorful fashion boutique featuring trendy clothes on racks and mannequins arranged invitingly",
  },
];

function renderRecommendedProducts() {
  const carouselRec = document.getElementById("carouselRec");
  recommendedProducts.forEach((p) => {
    const card = document.createElement("div");
    card.className =
      "flex-shrink-0 w-64 rounded-lg shadow-lg bg-white border border-gray-200 snap-start";
    card.innerHTML = `
      <img src="${p.img}" alt="Foto produk ${p.title}" class="w-full h-80 object-cover rounded-t-lg" onerror="this.style.display='none'" />
      <div class="p-4">
        <h3 class="font-bold text-lg mb-1 text-gray-900">${p.title}</h3>
        <p class="font-semibold text-purple-600 mb-2">${p.price}</p>
        <p class="text-gray-600 text-sm">${p.sold}</p>
      </div>
    `;
    carouselRec.appendChild(card);
  });
}

function renderLatestProducts() {
  const latestProductsDiv = document.getElementById("latestProducts");
  latestProducts.forEach((p) => {
    const card = document.createElement("article");
    card.className =
      "border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer bg-white";
    card.innerHTML = `
      <img src="${p.img}" alt="Foto produk ${p.title}" class="w-full h-48 object-cover" onerror="this.style.display='none'" />
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 mb-2">${p.title}</h3>
        <p class="text-purple-700 font-semibold mb-3">${p.price}</p>
        <p class="text-gray-700 text-sm">${p.desc}</p>
      </div>
    `;
    latestProductsDiv.appendChild(card);
  });
}

function renderTestimonials() {
  const testimonialsDiv = document.getElementById("testimonials");
  testimonials.forEach((t) => {
    const card = document.createElement("blockquote");
    card.className =
      "bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center";
    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      starsHtml += `<svg class="star w-5 h-5 inline-block" fill="${
        i < t.rating ? "currentColor" : "none"
      }" stroke="currentColor" ...></svg>`;
    }
    card.innerHTML = `
      <img src="${t.avatar}" alt="Avatar ${t.name}" class="rounded-full w-16 h-16 mb-4 object-cover border-2 border-purple-600" onerror="this.style.display='none'" />
      <p class="text-gray-800 italic mb-3">"${t.comment}"</p>
      <div aria-label="Rating bintang" class="mb-3">${starsHtml}</div>
      <footer class="text-purple-700 font-bold">${t.name}</footer>
    `;
    testimonialsDiv.appendChild(card);
  });
}

function setupHeroSlider() {
  let heroIndex = 0;
  const heroSection = document.querySelector("section > .relative.bg-gray-100");
  const heroImg = heroSection.querySelector("img");
  const heroHeading = heroSection.querySelector("h1");

  function setHeroSlide(index) {
    const slide = heroSlides[index];
    heroImg.src = slide.bgImage;
    heroImg.alt = slide.alt;
    heroHeading.innerHTML = `${slide.textTop} <span class="text-yellow-400">${slide.textHighlight}</span><br/><span class="text-yellow-400">${slide.textBottom}</span>`;
  }

  document.getElementById("hero-prev").addEventListener("click", () => {
    heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
    setHeroSlide(heroIndex);
  });

  document.getElementById("hero-next").addEventListener("click", () => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    setHeroSlide(heroIndex);
  });

  setHeroSlide(heroIndex);
}

function setupCarouselRecommendations() {
  
}

function setupEventListeners() {
  document.getElementById("prevRec").addEventListener("click", () => {
    document
      .getElementById("carouselRec")
      .scrollBy({ left: -320, behavior: "smooth" });
  });
  document.getElementById("nextRec").addEventListener("click", () => {
    document
      .getElementById("carouselRec")
      .scrollBy({ left: 320, behavior: "smooth" });
  });

  document.getElementById("btnCari").addEventListener("click", () => {
    alert("Tombol 'Mari Kita Berbelanja' telah diklik.");
  });
  document.getElementById("searchBtn").addEventListener("click", () => {
    alert("Fungsi pencarian sedang dikembangkan.");
  });
  document.getElementById("chatBtn").addEventListener("click", () => {
    alert("Fitur chat pelanggan belum tersedia.");
  });
  document.getElementById("mobile-menu-btn").addEventListener("click", () => {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !expanded);
    menu.classList.toggle("hidden");
  });
  document.getElementById("shop-btn").addEventListener("click", () => {
    document
      .querySelector('section[aria-label="Rekomendasi Produk Fashion Terkini"]')
      .scrollIntoView({ behavior: "smooth" });
  });
}

renderRecommendedProducts();
renderLatestProducts();
renderTestimonials();
setupHeroSlider();
setupEventListeners();
setupCarouselRecommendations();
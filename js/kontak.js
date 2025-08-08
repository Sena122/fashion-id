document.getElementById("ulasanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let nama = document.getElementById("nama").value;
  let pesan = document.getElementById("pesan").value;

  let ulasan = JSON.parse(localStorage.getItem("ulasanList")) || [];
  ulasan.push({ nama: nama, pesan: pesan });
  localStorage.setItem("ulasanList", JSON.stringify(ulasan));

  alert("Pesan terkirim! Lihat ulasan di halaman utama.");
  window.location.href = "index.html";
});

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuToggle.classList.toggle("open");
});

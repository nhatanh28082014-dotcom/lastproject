const BASE_URL = "https://api.tvmaze.com";
//start navbar
document.addEventListener("DOMContentLoaded", function () {
  const navActions = document.getElementById("nav-actions");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  navActions.innerHTML = "";

  if (currentUser && currentUser.username) {
    // Nếu đã đăng nhập
    navActions.innerHTML = `
      <span class="text-light me-3">Xin chào, <strong>${currentUser.username}</strong></span>
      <button class="btn btn-outline-light me-2" id="search-btn">Tìm kiếm</button>
      <button class="btn btn-outline-light" id="logout-btn">Đăng xuất</button>
    `;

    // Xử lý nút đăng xuất
    document
      .getElementById("logout-btn")
      .addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        alert("Bạn đã đăng xuất!");
        window.location.href = "login.html";
      });

    // Xử lý nút tìm kiếm
    document
      .getElementById("search-btn")
      .addEventListener("click", function () {
        alert("Tính năng tìm kiếm đang được phát triển!");
      });
  } else {
    // Nếu chưa đăng nhập
    navActions.innerHTML = `
      <button class="btn btn-outline-light me-2" id="search-btn">Tìm kiếm</button>
      <button class="btn btn-outline-light" id="login-btn">Đăng nhập</button>
    `;

    document.getElementById("login-btn").addEventListener("click", function () {
      window.location.href = "login.html";
    });

    document
      .getElementById("search-btn")
      .addEventListener("click", function () {
        alert("Tính năng tìm kiếm đang được phát triển!");
      });
  }
});
// ==================== CHUYỂN TRANG CHI TIẾT PHIM ====================
function showDetails(id) {
  // Chuyển sang trang info.html kèm id phim
  window.location.href = `info.html?id=${id}`;
}
//carousel
async function loadCarousel() {
  const res = await fetch(`${BASE_URL}/shows`);
  const data = await res.json();

  // Lọc phim có lịch chiếu (schedule)
  const nowShowing = data.filter((show) => show.schedule?.days?.length > 0).slice(0, 3);

  const indicators = document.getElementById("carousel-indicators");
  const inner = document.getElementById("carousel-inner");

  nowShowing.forEach((show, i) => {
    indicators.innerHTML += `
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${i}" ${i === 0 ? 'class="active" aria-current="true"' : ""}></button>
    `;
    inner.innerHTML += `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="${show.image?.original}" class="d-block w-100" style="height:600px;object-fit:cover;opacity:0.7;" alt="${show.name}">
        <div class="carousel-caption text-start">
          <h2 class="fw-bold display-5">${show.name}</h2>
          <p class="lead">${show.summary?.replace(/<[^>]+>/g, "").slice(0, 200)}...</p>
          <button class="btn btn-danger" onclick="showDetails(${show.id})">Chi tiết</button>
        </div>
      </div>
    `;
  });
}
//card
async function loadTrending() {
  const res = await fetch(`${BASE_URL}/shows?page=1`);
  const data = await res.json();

  // Sắp xếp theo rating
  const trending = data
    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    .slice(0, 12);

  const container = document.getElementById("trending-cards");
  container.innerHTML = trending
    .map(
      (show) => `
    <div class="col-6 col-md-3 col-lg-2">
      <div class="card bg-dark text-light h-100">
        <img src="${show.image?.medium}" class="card-img-top" alt="${show.name}">
        <div class="card-body p-2">
          <h6 class="card-title">${show.name}</h6>
          <button class="btn btn-sm btn-danger" onclick="showDetails(${show.id})">Chi tiết</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

//run
loadCarousel();
loadTrending();



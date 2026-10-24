const BASE_URL = "https://api.tvmaze.com";
const params = new URLSearchParams(window.location.search);
const showId = params.get("id");
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

async function loadMovieDetail() {
  const detailContainer = document.getElementById("movie-detail");

  if (!showId) {
    detailContainer.innerHTML = "<p>Không tìm thấy phim!</p>";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/shows/${showId}`);
    const show = await res.json();

    detailContainer.innerHTML = `
      <div class="row g-4 align-items-start">
        <div class="col-md-4 text-center">
          <img src="${show.image?.original || ''}" alt="${show.name}" class="img-fluid rounded shadow">
        </div>
        <div class="col-md-8 movie-info">
          <h2 class="fw-bold">${show.name}</h2>
          <p><strong>Thể loại:</strong> ${show.genres?.join(", ") || "N/A"}</p>
          <p><strong>Điểm đánh giá:</strong> ${show.rating?.average || "N/A"}</p>
          <p><strong>Thời lượng:</strong> ${show.runtime || "N/A"} phút</p>
          <p><strong>Ngày phát sóng:</strong> ${show.premiered || "N/A"}</p>
          <p><strong>Tóm tắt:</strong> ${show.summary?.replace(/<[^>]+>/g, "") || "Không có thông tin"}</p>
        </div>
      </div>
    `;
  } catch (error) {
    detailContainer.innerHTML = "<p>Lỗi khi tải dữ liệu phim!</p>";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadMovieDetail);

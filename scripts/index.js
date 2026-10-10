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
    document.getElementById("logout-btn").addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      alert("Bạn đã đăng xuất!");
      window.location.href = "login.html";
    });

    // Xử lý nút tìm kiếm
    document.getElementById("search-btn").addEventListener("click", function () {
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

    document.getElementById("search-btn").addEventListener("click", function () {
      alert("Tính năng tìm kiếm đang được phát triển!");
    });
  }
});

const BASE_URL = "https://api.tvmaze.com";
const params = new URLSearchParams(window.location.search);
const showId = params.get("id");

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
          <a href="${show.officialSite || "#"}" target="_blank" class="btn btn-danger mt-3">Trang chính thức</a>
        </div>
      </div>
    `;
  } catch (error) {
    detailContainer.innerHTML = "<p>Lỗi khi tải dữ liệu phim!</p>";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadMovieDetail);

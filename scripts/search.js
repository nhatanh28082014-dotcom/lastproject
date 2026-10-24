const BASE_URL = "https://api.tvmaze.com";

// Chuyển sang trang chi tiết
function showDetails(id) {
    window.location.href = `info.html?id=${id}`;
}

// Search phim
async function searchMovies() {

    const keyword = document.getElementById("searchInput").value.trim();

    if (!keyword) {
        alert("Vui lòng nhập tên phim!");
        return;
    }

    try {

        const res = await fetch( `${BASE_URL}/search/shows?q=${encodeURIComponent(keyword)}`);

        const data = await res.json();

        const container = document.getElementById("searchResults");

        if (data.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <h4>Không tìm thấy phim</h4>
                </div>
            `;
            return;
        }

        container.innerHTML = data.map(item => {

            const show = item.show;

            return `
                <div class="col-md-3">

                    <div class="card movie-card">

                        <img
                            src="${show.image?.medium || 'https://via.placeholder.com/210x295'}"
                            class="card-img-top"
                            alt="${show.name}"
                        >

                        <div class="card-body">

                            <h5 class="card-title">
                                ${show.name}
                            </h5>

                            <p>
                                ${show.genres.join(", ")}
                            </p>

                            <p class="rating">
                                ⭐ ${show.rating?.average || "N/A"}
                            </p>

                            <button
                                class="btn btn-danger btn-sm"
                                onclick="showDetails(${show.id})"
                            >
                                Chi tiết
                            </button>

                        </div>

                    </div>

                </div>
            `;
        }).join("");

    } catch (error) {

        console.error(error);

        alert("Lỗi khi tìm kiếm phim!");

    }
}

document.getElementById("searchBtn").addEventListener("click", searchMovies);

document.getElementById("searchInput").addEventListener("keypress", function(e) {

        if (e.key === "Enter") {
            searchMovies();
        }

    });
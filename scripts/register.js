document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  // Chuyển sang login khi bấm "Đã có tài khoản"
  const loginLink = document.getElementById("login-link");
  if (loginLink) {
    loginLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "login.html";
    });
  }

  // Kiểm tra form khi submit
  form.addEventListener("submit", function (event) {
    let valid = true;

    // Kiểm tra username
    if (username.value.trim() === "") {
      usernameError.textContent = "Vui lòng nhập tên đăng nhập.";
      valid = false;
    } else if (username.value.length <= 6) {
      usernameError.textContent = "Tên đăng nhập phải trên 6 ký tự.";
      valid = false;
    } else {
      usernameError.textContent = "";
    }

    // Kiểm tra email
    if (email.value.trim() === "") {
      emailError.textContent = "Vui lòng nhập email.";
      valid = false;
    } else if (!email.value.includes("@")) {
      emailError.textContent = "Email phải chứa ký tự @.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    // Kiểm tra password
    const hasNumber = /\d/.test(password.value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);
    const hasUpper = /[A-Z]/.test(password.value);

    if (password.value.trim() === "") {
      passwordError.textContent = "Vui lòng nhập mật khẩu.";
      valid = false;
    } else if (password.value.length <= 8 || !hasNumber || !hasSpecial || !hasUpper) {
      passwordError.textContent = "Mật khẩu phải trên 8 ký tự, có số, ký hiệu đặc biệt và chữ hoa.";
      valid = false;
    } else {
      passwordError.textContent = "";
    }

    // Nếu hợp lệ thì lưu vào LocalStorage và chuyển sang login
    if (valid) {
      event.preventDefault(); // Ngăn submit mặc định

      localStorage.setItem("username", username.value.trim());
      localStorage.setItem("email", email.value.trim());
      localStorage.setItem("password", password.value.trim());

      alert("Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập.");
      window.location.href = "login.html"; // Chuyển sang login
    } else {
      event.preventDefault(); // Ngăn submit nếu có lỗi
    }
  });
});

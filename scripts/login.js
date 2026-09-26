document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Khi bấm "Đăng ký ngay" thì chuyển sang register
  const registerLink = document.getElementById("register-link");
  if (registerLink) {
    registerLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "register.html";
    });
  }

  // Kiểm tra khi submit form login
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    if (enteredUsername === savedUsername && enteredPassword === savedPassword) {
      // Lưu user hiện tại vào localStorage
      const currentUser = {
        username: enteredUsername,
        password: enteredPassword
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      alert("Đăng nhập thành công!");
      window.location.href = "index.html"; // Chuyển sang trang index
    } else {
      alert("User hoặc password sai");
    }
  });
});

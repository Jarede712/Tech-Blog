$(document).ready(function () {
  $("#login-form").on("submit", function (event) {
    event.preventDefault();

    var userData = {
      username: $("#username").val().trim(),
      password: $("#password").val().trim(),
    };

    if (!userData.username || !userData.password) {
      return;
    }

    $.ajax("/api/users/login", {
      type: "POST",
      data: userData,
    })
      .then(function () {
        console.log("logged in");
        window.location.replace("/dashboard");
      })
      .fail(function (err) {
        console.error(err);
      });
  });
});

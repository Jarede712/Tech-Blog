$(document).ready(function () {
  $("#logout").on("click", function (event) {
    event.preventDefault();

    $.ajax("/api/users/logout", {
      type: "POST",
    })
      .then(function () {
        console.log("logged out");
        window.location.replace("/login");
      })
      .fail(function (err) {
        console.error(err);
      });
  });
});

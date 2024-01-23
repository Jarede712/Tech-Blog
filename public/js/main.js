document.addEventListener("DOMContentLoaded", () => {
  // Login form submission
  const loginForm = document.querySelector("#login-form");
  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userData = {
      username: document.querySelector("#username").value.trim(),
      password: document.querySelector("#password").value.trim(),
    };

    if (userData.username && userData.password) {
      try {
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          location.reload(); // Or redirect to the dashboard
        } else {
          alert("Failed to log in");
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    }
  });

  // Logout action
  const logoutButton = document.querySelector("#logout-button");
  logoutButton?.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        location.href = "/"; // Redirect to the home page
      } else {
        alert("Failed to log out");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  });

  // Sign up form submission
  const signupForm = document.querySelector("#signup-form");
  signupForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newUser = {
      username: document.querySelector("#username-signup").value.trim(),
      email: document.querySelector("#email-signup").value.trim(),
      password: document.querySelector("#password-signup").value.trim(),
    };

    console.log(newUser); // Log the new user data

    if (newUser.username && newUser.email && newUser.password) {
      try {
        const response = await fetch("/api/users/signup", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        location.reload(); // Or redirect to the dashboard
      } catch (err) {
        console.error("Signup error:", err.message);
        console.error(err.stack);
        alert("Failed to sign up");
      }
    }
  });

  // Handling new blog post submission
  const newPostForm = document.querySelector("#new-post-form");
  newPostForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const post = {
      title: document.querySelector("#post-title").value.trim(),
      content: document.querySelector("#post-content").value.trim(),
    };

    if (post.title && post.content) {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify(post),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          window.location.href = "/dashboard"; // Redirect to the dashboard
        } else {
          alert("Failed to create post");
        }
      } catch (err) {
        console.error("New post error:", err);
      }
    }
  });

  // Handling new comment submission
  const commentForm = document.querySelector("#new-comment-form");
  commentForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const comment = {
      content: document.querySelector("#comment-content").value.trim(),
      post_id: document.querySelector("#post-id").value,
    };

    if (comment.content && comment.post_id) {
      try {
        const response = await fetch(`/api/comments`, {
          method: "POST",
          body: JSON.stringify(comment),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          location.reload(); // Or update the comment section dynamically
        } else {
          alert("Failed to add comment");
        }
      } catch (err) {
        console.error("New comment error:", err);
      }
    }
  });
});

const BASE_URL = "https://api.freeapi.app/api/v1/users";

// --- UI Manipulation Functions ---
let toastTimeout;
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  // Set text
  toastMessage.textContent = message;

  // Handle colors based on type
  if (type === "success") {
    toast.classList.remove("bg-red-500");
    toast.classList.add("bg-green-500");
  } else {
    toast.classList.remove("bg-green-500");
    toast.classList.add("bg-red-500");
  }

  // Show toast
  toast.classList.remove("hidden");

  // Slight delay to allow CSS transition to apply
  setTimeout(() => {
    toast.classList.remove("opacity-0");
    toast.classList.add("opacity-100");
  }, 10);

  // Hide toast after 3 seconds
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
    setTimeout(() => toast.classList.add("hidden"), 300); // Wait for fade out
  }, 3000);
}

function toggleScreen(screenId) {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("register-screen").classList.add("hidden");
  document.getElementById("dashboard-screen").classList.add("hidden");

  document.getElementById(screenId).classList.remove("hidden");
}

function setLoading(actionPrefix, isLoading, defaultText) {
  const btn = document.getElementById(`${actionPrefix}-btn`);
  const spinner = document.getElementById(`${actionPrefix}-spinner`);
  const textSpan = document.getElementById(`${actionPrefix}-btn-text`);

  if (isLoading) {
    btn.disabled = true;
    btn.classList.add("opacity-70", "cursor-not-allowed");
    spinner.classList.remove("hidden");
    textSpan.textContent = "Loading...";
  } else {
    btn.disabled = false;
    btn.classList.remove("opacity-70", "cursor-not-allowed");
    spinner.classList.add("hidden");
    textSpan.textContent = defaultText;
  }
}

// CORE JS LOGIC

// --- Auth Token Management ---

const getToken = () => localStorage.getItem("accessToken");
const setToken = (token) => localStorage.setItem("accessToken", token);
const removeToken = () => localStorage.removeItem("accessToken");

document.addEventListener("DOMContentLoaded", () => {
  if (getToken()) {
    toggleScreen("dashboard-screen");
    fetchCurrentUser();
  } else {
    toggleScreen("login-screen");
  }
});

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  setLoading("register", true, "Register");

  const payload = {
    email: document.getElementById("reg-email").value,
    password: document.getElementById("reg-password").value,
    role: "ADMIN",
    username: document.getElementById("reg-username").value,
  };

  try {
    const url = `${BASE_URL}/register`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const res = await fetch(url, options);
    const data = await res.json();

    if (res.ok) {
      showToast("Registration successful! Please login.");
      document.getElementById("register-form").reset();
      toggleScreen("login-screen");
    } else {
      showToast(data.message || "Registration failed", "error");
    }
  } catch (error) {
    showToast("Network error occurred", "error");
  } finally {
    setLoading("register", false, "Register");
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  setLoading("login", true, "Login");

  const payload = {
    password: document.getElementById("login-password").value,
    username: document.getElementById("login-username").value,
  };

  try {
    const url = `${BASE_URL}/login`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const res = await fetch(url, options);
    const data = await res.json();

    if (res.ok) {
      setToken(data.data.accessToken);
      showToast("Logged in successfully!");
      document.getElementById("login-form").reset();
      toggleScreen("dashboard-screen");
      fetchCurrentUser();
    } else {
      showToast(data.message || "Invalid credentials", "error");
    }
  } catch (error) {
    showToast("Network error occurred", "error");
  } finally {
    setLoading("login", false, "Login");
  }
});

async function fetchCurrentUser() {
  const profileLoading = document.getElementById("profile-loading");
  const profileData = document.getElementById("profile-data");

  profileLoading.classList.remove("hidden");
  profileData.classList.add("hidden");

  try {
    const url = `${BASE_URL}/current-user`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, options);
    const data = await res.json();

    if (res.ok) {
      const user = data.data;

      document.getElementById("profile-id").textContent = user._id;
      document.getElementById("profile-username").textContent = user.username;
      document.getElementById("profile-email").textContent = user.email;
      document.getElementById("profile-role").textContent = user.role;

      profileLoading.classList.add("hidden");
      profileData.classList.remove("hidden");
    } else {
      showToast("Session expired. Please log in again.", "error");
      removeToken();
      toggleScreen("login-screen");
    }
  } catch (error) {
    showToast("Failed to load profile", "error");
    profileLoading.textContent = "Failed to load data. Please refresh.";
  }
}

document.getElementById("logout-btn").addEventListener("click", async () => {
  setLoading("logout", true, "Logout");

  try {
    const url = `${BASE_URL}/logout`;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, options);

    if (res.ok) {
      removeToken();
      showToast("Logged out successfully");
      toggleScreen("login-screen");
    } else {
      removeToken();
      toggleScreen("login-screen");
    }
  } catch (error) {
    showToast("Network error", "error");
  } finally {
    setLoading("logout", false, "Logout");
  }
});

import { useEffect, useRef, useState } from "react";
import Spinner from "../components/Spinner.jsx";
import Toast from "../components/Toast.jsx";
import BackLink from "../components/BackLink.jsx";

const BASE_URL = "https://api.freeapi.app/api/v1/users";

const getToken = () => localStorage.getItem("accessToken");
const setToken = (token) => localStorage.setItem("accessToken", token);
const removeToken = () => localStorage.removeItem("accessToken");

function AuthApp() {
  const [screen, setScreen] = useState("login");
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });
  const toastTimeout = useRef(null);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  function showToast(message, type = "success") {
    setToast({ message, type, visible: true });
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3000);
  }

  async function fetchCurrentUser() {
    setProfileLoading(true);

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
        setProfile(data.data);
      } else {
        showToast("Session expired. Please log in again.", "error");
        removeToken();
        setScreen("login");
      }
    } catch (error) {
      showToast("Failed to load profile", "error");
      removeToken();
      setScreen("login");
    } finally {
      setProfileLoading(false);
    }
  }

  useEffect(() => {
    if (getToken()) {
      setScreen("dashboard");
      fetchCurrentUser();
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const url = `${BASE_URL}/login`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      };
      const res = await fetch(url, options);
      const data = await res.json();

      if (res.ok) {
        setToken(data.data.accessToken);
        showToast("Logged in successfully!");
        setLoginUsername("");
        setLoginPassword("");
        setScreen("dashboard");
        fetchCurrentUser();
      } else {
        showToast(data.message || "Invalid credentials", "error");
      }
    } catch (error) {
      showToast("Network error occurred", "error");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setRegisterLoading(true);

    try {
      const url = `${BASE_URL}/register`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: regEmail,
          password: regPassword,
          role: "ADMIN",
          username: regUsername,
        }),
      };
      const res = await fetch(url, options);
      const data = await res.json();

      if (res.ok) {
        showToast("Registration successful! Please login.");
        setRegEmail("");
        setRegUsername("");
        setRegPassword("");
        setScreen("login");
      } else {
        showToast(data.message || "Registration failed", "error");
      }
    } catch (error) {
      showToast("Network error occurred", "error");
    } finally {
      setRegisterLoading(false);
    }
  }

  async function handleLogout() {
    setLogoutLoading(true);

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

      removeToken();
      if (res.ok) {
        showToast("Logged out successfully");
      }
      setScreen("login");
    } catch (error) {
      removeToken();
      showToast("Network error", "error");
      setScreen("login");
    } finally {
      setLogoutLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex items-center justify-center">
      <BackLink />
      <Toast toast={toast} />

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-4">
        {screen === "login" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loginLoading && <Spinner />}
                <span>{loginLoading ? "Loading..." : "Login"}</span>
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <button onClick={() => setScreen("register")} className="text-blue-600 hover:underline">
                Register
              </button>
            </p>
          </div>
        )}

        {screen === "register" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={registerLoading}
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-200 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {registerLoading && <Spinner />}
                <span>{registerLoading ? "Loading..." : "Register"}</span>
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <button onClick={() => setScreen("login")} className="text-blue-600 hover:underline">
                Login
              </button>
            </p>
          </div>
        )}

        {screen === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>

            <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-gray-200">
              {profileLoading ? (
                <p className="text-sm text-gray-500 animate-pulse text-center">
                  Loading profile data...
                </p>
              ) : (
                profile && (
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">ID:</span> {profile._id}
                    </p>
                    <p>
                      <span className="font-semibold">Username:</span> {profile.username}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {profile.email}
                    </p>
                    <p>
                      <span className="font-semibold">Role:</span>{" "}
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {profile.role}
                      </span>
                    </p>
                  </div>
                )
              )}
            </div>

            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-200 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {logoutLoading && <Spinner />}
              <span>{logoutLoading ? "Loading..." : "Logout"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthApp;

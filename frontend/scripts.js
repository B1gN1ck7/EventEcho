const API_URL = "http://localhost:5000"; //may need to adjust the port number
let accessToken = null;
let refreshToken = null;

const output = document.getElementById("output");
const secureBtn = document.getElementById("secure-btn");

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: form.get("username"), password: form.get("password") })
    });
    output.textContent = JSON.stringify(await res.json(), null, 2);
  } catch (err) {
    output.textContent = err;
  }
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: form.get("username"), password: form.get("password") })
    });
    const data = await res.json();
    if (res.ok) {
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
      secureBtn.disabled = false;
    }
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = err;
  }
});

secureBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`${API_URL}/api/secure-data`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (res.status === 401 && refreshToken) {
      // system will attempt a silent refresh.
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken })
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        accessToken = refreshData.access_token;
        return secureBtn.click(); // retry
      }
    }
    output.textContent = JSON.stringify(await res.json(), null, 2);
  } catch (err) {
    output.textContent = err;
  }
});

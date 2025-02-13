import { useState } from "react";

const LoginPage = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function setSessionStorageWithExpiry(key, value, expiryInMilliseconds) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInMilliseconds,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  const handleEnter = (e) => {
    if(e.key === "Enter") handleLogin();
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setUser({ name, email });

        // set up session storage to keep track of login
        const key = "loginSuccess";
        const value = true;
        const expiryTime = 3600000;
        setSessionStorageWithExpiry(key, value, expiryTime);
      } else alert("Login failed.");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginPage">
      <h1>Fetch Dog Finder 🐶</h1>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin} >
        Login
      </button>
    </div>
  );
};

export default LoginPage;

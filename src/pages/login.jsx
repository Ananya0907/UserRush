import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { BACKEND_URL, GAME_ID } from "../constants";

// Safe read from index.html
const config = window.APP_CONFIG || {};

const firebaseConfig = config.firebaseConfig;

// Initialize Firebase only if config exists
const app = firebaseConfig ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const provider = new GoogleAuthProvider();

// Force selection of student domain accounts (Optional but recommended)
provider.setCustomParameters({
  hd: "iiitl.ac.in",
  prompt: "select_account"
});

export default function Login() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.background = "#0a0a0c";
    document.body.style.overflow = "hidden";

    const root = document.getElementById("root");
    if (root) {
      root.style.width = "100%";
      root.style.height = "100%";
    }
  }, []);

  const handleLogin = async () => {
    if (!auth) {
      setStatus("Firebase config missing.");
      return;
    }

    setLoading(true);
    setStatus("Logging in...");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email && !user.email.endsWith('@iiitl.ac.in')) {
        await signOut(auth);
        setStatus("Only IIIT Lucknow institutional accounts are allowed.");
        return;
      }

      const idToken = await user.getIdToken();
      setStatus("Authenticating with server...");

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idToken,
          gameId: GAME_ID
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message || "Successfully tracked participation!");
        localStorage.setItem("idToken", idToken);

        setTimeout(() => {
          window.location.href = "/game";
        }, 1000);
      } else {
        setStatus(data.error || "Failed to record tracking info.");
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/unauthorized-domain') {
        setStatus("Submit your domain authorised on leaderboard website");
      } else {
        setStatus("Error logging in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0c0d1b", // dark navy background exactly like screenshot
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
        padding: "20px",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: "min(92vw, 400px)",
          padding: "40px",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          textAlign: "center",
          color: "white",
          boxSizing: "border-box"
        }}
      >
        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "28px",
            fontWeight: "800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}
        >
          <span>🎮</span> LCI2025013
        </h1>

        <p
          style={{
            margin: "0 0 24px",
            color: "#e2e8f0",
            fontSize: "14px",
            fontWeight: "400"
          }}
        >
          Sign in using your institute email to continue
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            background: loading ? "#3b82f6" : "#2563eb",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => !loading && (e.currentTarget.style.background = '#1d4ed8')}
          onMouseLeave={e => !loading && (e.currentTarget.style.background = '#2563eb')}
        >
          {loading ? "Logging in..." : "Login with Email"}
        </button>

        <p
          style={{
            marginTop: "24px",
            marginBottom: 0,
            fontSize: "12px",
            color: "#cbd5e1"
          }}
        >
          Submit your domain authorised on leaderboard website
        </p>

        {status && !status.includes("Submit your domain") && !status.includes("Logging in") && (
          <p
            style={{
              marginTop: "24px",
              marginBottom: 0,
              fontSize: "14px",
              color: status.toLowerCase().includes("success") ? "#10b981" : "#ef4444",
              fontWeight: 600,
              wordBreak: "break-word"
            }}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

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
        background: "linear-gradient(135deg, #ffe1e8 0%, #f3e8ff 50%, #e0e7ff 100%)",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
        padding: "20px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Floating Hearts Animation */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}vw`,
          bottom: '-50px',
          fontSize: `${Math.random() * 20 + 10}px`,
          animation: `float-up ${Math.random() * 10 + 5}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: 0.5,
          pointerEvents: 'none'
        }}>
          {['💖', '✨', '🌸'][Math.floor(Math.random() * 3)]}
        </div>
      ))}

      <div
        style={{
          width: "min(92vw, 440px)",
          padding: "clamp(30px, 6vw, 40px)",
          borderRadius: "32px",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 20px 40px rgba(255, 182, 193, 0.3)",
          textAlign: "center",
          color: "#4a4a4a",
          boxSizing: "border-box",
          zIndex: 10
        }}
      >
        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(28px, 5vw, 36px)",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #ec4899, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          💖 Love Journey
        </h1>

        <p
          style={{
            margin: "0 0 32px",
            color: "#6b7280",
            fontSize: "clamp(14px, 2vw, 16px)",
            lineHeight: "1.6",
            fontWeight: "500"
          }}
        >
          Begin your romantic adventure using your institute email.
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "999px",
            background: loading ? "#f472b6" : "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
            color: "white",
            fontSize: "clamp(15px, 2vw, 17px)",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 10px 25px rgba(236, 72, 153, 0.4)",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
        >
          {loading ? "Preparing your dates..." : "Start Journey"}
        </button>

        {status && (
          <p
            style={{
              marginTop: "24px",
              marginBottom: 0,
              fontSize: "clamp(13px, 2vw, 15px)",
              lineHeight: "1.5",
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

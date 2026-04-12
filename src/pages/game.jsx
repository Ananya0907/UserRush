import { useEffect } from "react";
import { GameProvider, useGame } from "../context/GameContext";
import ArcadeHub from "../components/ArcadeHub";
import Map from "../components/Map";

function GameContent() {
  const { currentView } = useGame();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%)",
        fontFamily: "'Inter', Arial, sans-serif",
        color: "white",
        overflow: "hidden",
        boxSizing: "border-box"
      }}
    >
      {currentView === 'map' && <Map />}
      {currentView === 'arcade' && <ArcadeHub />}
    </div>
  );
}

export default function Game() {
  useEffect(() => {
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.background = "#0f172a";
    document.body.style.overflow = "hidden";

    const root = document.getElementById("root");
    if (root) {
      root.style.width = "100%";
      root.style.height = "100%";
    }
  }, []);

  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

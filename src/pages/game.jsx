import { useEffect } from "react";
import { GameProvider, useGame } from "../context/GameContext";
import ArcadeHub from "../components/ArcadeHub";
import Map from "../components/Map";
import DateScreen from "../components/DateScreen";
import SelectionScreen from "../components/SelectionScreen";

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
        // Mature, static gradient: Pink -> Lavender -> Soft Blue
        background: "linear-gradient(135deg, #fdf2f8 0%, #ede9fe 50%, #eff6ff 100%)",
        fontFamily: "'Inter', Arial, sans-serif",
        color: "#4a4a4a",
        overflow: "hidden",
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      {/* Subtle Corner Glow Effects */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ zIndex: 10, width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        {currentView === 'selection' && <SelectionScreen />}
        {currentView === 'map' && <Map />}
        {currentView === 'arcade' && <ArcadeHub />}
        {currentView === 'date' && <DateScreen />}
      </div>
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

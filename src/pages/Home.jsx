import React from "react";
import Navbar from "../components/Navbar";
import SpaceHero from "../components/SpaceHero";
import HeroSection from "../components/HeroSection";
import MainSection from "../components/MainSection";

function Home() {
  return (
    <div style={{ position: "relative", background: "#020617" }}>

      {/* Space canvas — truly fixed, covers entire viewport forever */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}>
        <SpaceHero />
      </div>

      {/* Everything scrolls on top of the fixed space background */}
      <div style={{ position: "relative", zIndex: 10 }}>

        <Navbar />

        {/* Hero — 100vh, transparent so stars show fully */}
        <div style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 48px",
          color: "white",
          background: "transparent",
        }}>
          <HeroSection />
        </div>

        {/* Seamless fade overlay — transitions from fully transparent
            to the content bg over ~40vh so the seam is invisible */}
        <div style={{
          height: "40vh",
          marginTop: "-40vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(2,6,23,0.55) 40%, rgba(2,6,23,0.85) 70%, #020617 100%)",
          pointerEvents: "none",
          position: "relative",
          zIndex: 5,
        }} />

        {/* Main sections — solid bg starts here but stars bleed through above via the fade */}
        <div className="main-content-bg" style={{ position: "relative", zIndex: 6 }}>
          <MainSection />
        </div>

      </div>
    </div>
  );
}

export default Home;

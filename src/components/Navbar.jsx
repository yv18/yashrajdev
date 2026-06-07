import React, { useMemo, useState, useEffect } from "react";
import LogoIcon from "./LogoIcon";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const navItems = [
  { label: "About", href: "#about", icon: <PersonRoundedIcon fontSize="small" /> },
  { label: "Skills", href: "#skills", icon: <CodeRoundedIcon fontSize="small" /> },
  { label: "Projects", href: "#projects", icon: <CodeRoundedIcon fontSize="small" /> },
  { label: "Experience", href: "#experience", icon: <WorkHistoryRoundedIcon fontSize="small" /> },
  { label: "Contact", href: "#contact", icon: <ContactMailRoundedIcon fontSize="small" /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1200,
        width: "calc(100% - 48px)",
        maxWidth: 1100,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderRadius: 24,
          background: scrolled ? "rgba(2,6,23,0.88)" : "rgba(2,6,23,0.6)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(139,92,246,0.22)",
          boxShadow: "0 0 40px rgba(124,58,237,0.12)",
          transition: "background 0.3s",
        }}>
          {/* Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <LogoIcon size={44} />

            <div>
              <div style={{
                fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #ffffff 0%, #8b5cf6 45%, #38bdf8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontFamily: "'Syne', sans-serif",
              }}>Yashraj Raj</div>
              <div style={{ fontSize: "0.68rem", color: "#64748b", letterSpacing: "0.1em" }}>
                FULL STACK DEVELOPER
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}
            className="desktop-nav">
            {navItems.map((item) => (
              <button key={item.label}
                onClick={() => handleNav(item.href)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#cbd5e1",
                  padding: "8px 16px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.15)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-burger"
            style={{
              background: "rgba(139,92,246,0.18)", border: "1px solid rgba(139,92,246,0.35)",
              borderRadius: 12, width: 40, height: 40, cursor: "pointer",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div style={{
            marginTop: 10, borderRadius: 20,
            background: "rgba(2,6,23,0.95)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(139,92,246,0.22)",
            padding: "16px",
          }}>
            {navItems.map((item) => (
              <button key={item.label}
                onClick={() => handleNav(item.href)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  width: "100%", padding: "13px 16px", borderRadius: 14,
                  background: "transparent", border: "none",
                  color: "#cbd5e1", fontSize: "0.95rem", fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer", textAlign: "left", marginBottom: 4,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.14)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                <span style={{ color: "#8b5cf6" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-burger { display: none !important; }
        }
      `}</style>
    </>
  );
}

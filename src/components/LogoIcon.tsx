import React, { useRef, useEffect } from "react";

// Realistic 3D holographic code orb using Canvas
// No external deps — pure Canvas 2D with layered effects
export default function LogoIcon({ size = 44 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const dpr = window.devicePixelRatio || 1;
    const s = size * dpr;
    canvas.width = s;
    canvas.height = s;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";

    const cx = s / 2, cy = s / 2, r = s / 2 - 1;

    function draw() {
      if (!context) return;
      const t = (Date.now() - startRef.current) / 1000;
      context.clearRect(0, 0, s, s);

      // ── 1. Outer glow ring ──────────────────────────────────
      const outerGlow = context.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.1);
      outerGlow.addColorStop(0, "rgba(139,92,246,0.0)");
      outerGlow.addColorStop(0.6, "rgba(139,92,246,0.18)");
      outerGlow.addColorStop(1, "rgba(56,189,248,0.0)");
      context.beginPath();
      context.arc(cx, cy, r * 1.08, 0, Math.PI * 2);
      context.fillStyle = outerGlow;
      context.fill();

      // ── 2. Main sphere body ─────────────────────────────────
      const sphere = context.createRadialGradient(
        cx - r * 0.28, cy - r * 0.3, r * 0.05,
        cx, cy, r
      );
      sphere.addColorStop(0.0,  "rgba(200,180,255,0.95)");
      sphere.addColorStop(0.18, "rgba(139,92,246,0.95)");
      sphere.addColorStop(0.5,  "rgba(79,50,180,0.97)");
      sphere.addColorStop(0.8,  "rgba(30,20,90,0.99)");
      sphere.addColorStop(1.0,  "rgba(10,5,40,1)");
      context.beginPath();
      context.arc(cx, cy, r, 0, Math.PI * 2);
      context.fillStyle = sphere;
      context.fill();

      // ── 3. Animated nebula layer (slow colour shift) ────────
      const hue1 = (220 + Math.sin(t * 0.4) * 30);
      const hue2 = (260 + Math.cos(t * 0.3) * 25);
      const nebula = context.createRadialGradient(
        cx + Math.cos(t * 0.6) * r * 0.25,
        cy + Math.sin(t * 0.5) * r * 0.2,
        0,
        cx, cy, r * 0.85
      );
      nebula.addColorStop(0, `hsla(${hue1},90%,70%,0.22)`);
      nebula.addColorStop(0.5, `hsla(${hue2},80%,55%,0.1)`);
      nebula.addColorStop(1, "rgba(0,0,0,0)");
      context.beginPath();
      context.arc(cx, cy, r, 0, Math.PI * 2);
      context.fillStyle = nebula;
      context.fill();

      // ── 4. Specular highlight (top-left) ────────────────────
      const spec = context.createRadialGradient(
        cx - r * 0.3, cy - r * 0.35, 0,
        cx - r * 0.1, cy - r * 0.15, r * 0.52
      );
      spec.addColorStop(0,   "rgba(255,255,255,0.72)");
      spec.addColorStop(0.35,"rgba(255,255,255,0.18)");
      spec.addColorStop(1,   "rgba(255,255,255,0.0)");
      context.beginPath();
      context.arc(cx, cy, r, 0, Math.PI * 2);
      context.fillStyle = spec;
      context.fill();

      // ── 5. Bottom reflection ─────────────────────────────────
      const refl = context.createRadialGradient(
        cx + r * 0.2, cy + r * 0.42, 0,
        cx, cy + r * 0.5, r * 0.45
      );
      refl.addColorStop(0,   "rgba(56,189,248,0.35)");
      refl.addColorStop(0.5, "rgba(56,189,248,0.08)");
      refl.addColorStop(1,   "rgba(0,0,0,0)");
      context.beginPath();
      context.arc(cx, cy, r, 0, Math.PI * 2);
      context.fillStyle = refl;
      context.fill();

      // ── 6. Clip to circle for text ───────────────────────────
      context.save();
      context.beginPath();
      context.arc(cx, cy, r, 0, Math.PI * 2);
      context.clip();

      // ── 7. Code symbol  </> ──────────────────────────────────
      const pulse = 1 + Math.sin(t * 1.8) * 0.03; // subtle breathe
      const fontSize = Math.round(s * 0.32 * pulse);
      context.font = `900 ${fontSize}px 'Courier New', monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      // Shadow / depth
      context.shadowColor = "rgba(0,0,0,0.7)";
      context.shadowBlur = s * 0.06;
      context.shadowOffsetY = s * 0.025;

      // Text gradient — white core to cyan edge
      const tg = context.createLinearGradient(cx, cy - fontSize * 0.5, cx, cy + fontSize * 0.5);
      tg.addColorStop(0,   "rgba(255,255,255,1)");
      tg.addColorStop(0.45,"rgba(220,210,255,0.95)");
      tg.addColorStop(1,   "rgba(130,220,255,0.85)");
      context.fillStyle = tg;
      context.fillText("</>", cx, cy + s * 0.02);

      // Inner shine on text
      context.shadowBlur = 0; context.shadowOffsetY = 0;
      const tg2 = context.createLinearGradient(cx, cy - fontSize * 0.5, cx, cy - fontSize * 0.05);
      tg2.addColorStop(0, "rgba(255,255,255,0.55)");
      tg2.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = tg2;
      context.fillText("</>", cx, cy + s * 0.02);

      context.restore();

      // ── 8. Hard edge rim ─────────────────────────────────────
      context.beginPath();
      context.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
      context.strokeStyle = "rgba(180,140,255,0.35)";
      context.lineWidth = 1;
      context.stroke();

      // ── 9. Animated orbit ring ───────────────────────────────
      context.save();
      context.translate(cx, cy);
      context.rotate(t * 0.5);
      context.scale(1, 0.28);
      context.beginPath();
      context.arc(0, 0, r * 0.92, 0, Math.PI * 2);
      context.strokeStyle = "rgba(56,189,248,0.3)";
      context.lineWidth = 1.2;
      context.setLineDash([s * 0.1, s * 0.08]);
      context.stroke();
      context.restore();

      frameRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "50%",
        display: "block",
        flexShrink: 0,
        filter: "drop-shadow(0 0 10px rgba(139,92,246,0.7)) drop-shadow(0 0 22px rgba(56,189,248,0.3))",
      }}
    />
  );
}

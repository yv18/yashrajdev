import React, { useEffect, useRef } from "react";

function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "opacity 1s ease, transform 1s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200);
  }, []);

  return (
    <div ref={textRef} className=" mt-5 hero-content">

      <p className="hero-greeting">
        Hey, I'm{" "}
        <span className="hero-name">Yashraj Raj</span>
      </p>

      <h1 className="hero-title">
        Software<br />
        <span className="hero-title-accent">Engineer</span>
      </h1>

      <p className="hero-desc">
        Building and deploying full-stack web applications and REST APIs with Python, JavaScript/TypeScript,
        Node.js, and React.js. Focused on secure coding, testing, and CI/CD within Agile/SDLC environments.
      </p>

      <div className="hero-actions">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="#contact" className="btn-secondary">Get in Touch</a>
      </div>

      <div className="hero-tech-stack">
        {["Python", "React", "Node.js", "TypeScript", "AWS", "Azure"].map((tech) => (
          <span key={tech} className="tech-pill">{tech}</span>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;

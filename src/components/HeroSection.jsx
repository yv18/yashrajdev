import React, { useEffect, useRef } from "react";

function HeroSection() {
  const textRef = useRef();

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
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Available for opportunities
      </div>

      <p className="hero-greeting">
        Hey, I'm{" "}
        <span className="hero-name">Yashraj Raj</span>
      </p>

      <h1 className="hero-title">
        Full Stack<br />
        <span className="hero-title-accent">Developer</span>
      </h1>

      <p className="hero-desc">
        Crafting scalable MERN stack applications and beautiful web experiences.
        Passionate about clean code, performance, and impactful digital solutions.
      </p>

      <div className="hero-actions">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="#contact" className="btn-secondary">Get in Touch</a>
      </div>

      <div className="hero-tech-stack">
        {["React", "Node.js", "MongoDB", "TypeScript", "Azure"].map((tech) => (
          <span key={tech} className="tech-pill">{tech}</span>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;

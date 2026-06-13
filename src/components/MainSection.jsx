import React, { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";

// MUI Icons
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

function useInView(ref, options = {}) {
  const [inView, setInView] = React.useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.15, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function AnimatedSection({ children, className = "" }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`animated-section ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  );
}

const skills = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C#", "HTML5", "CSS3"],
  Frontend: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Responsive Design"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Firebase"],
  Databases: ["MongoDB", "MySQL", "PostgreSQL"],
  "DevOps & Cloud": ["Docker", "CI/CD", "Git", "GitHub", "Microsoft Azure"],
};

const skillColors = {
  Languages: "#8b5cf6",
  Frontend: "#38bdf8",
  Backend: "#34d399",
  Databases: "#f97316",
  "DevOps & Cloud": "#e879f9",
};

const projects = [
  {
    title: "PaySlice",
    description: "A modern bill-splitting web app that lets groups divide expenses fairly and track who owes what in real time. Built with a clean UI and seamless UX for shared payments.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    Icon: AccountBalanceWalletOutlinedIcon,
    color: "#34d399",
    liveUrl: "https://payslice-mu.vercel.app/",
    githubUrl: null,
  },
  {
    title: "Web Chat Application",
    description: "Real-time chat application with public messaging and live updates using WebSockets. Built with the full MERN stack for a seamless, responsive experience.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "WebSockets"],
    Icon: ChatBubbleOutlineRoundedIcon,
    color: "#8b5cf6",
    liveUrl: "https://gc-o1wg.onrender.com/",
    githubUrl: null,
  },
  {
    title: "Invoice Generation System",
    description: "Automated invoice generation tool with dynamic form inputs, real-time calculations, and PDF export functionality. Streamlines billing workflows efficiently.",
    tech: ["MySQL", "JavaScript", "Bootstrap", "HTML", "CSS"],
    Icon: ReceiptLongOutlinedIcon,
    color: "#38bdf8",
    liveUrl: null,
    githubUrl: "https://github.com/yv18/poptospizza",
  },
];

const experiences = [
  {
    role: "Technical Support Specialist, Tier II",
    company: "Concentrix",
    location: "Belleville, ON",
    period: "Jun 2025 – Present",
    color: "#8b5cf6",
    points: [
      "Delivered Tier II technical support for hardware, software, networking, and account issues via phone, chat, and remote sessions — leveraging Azure cloud knowledge to assist enterprise clients.",
      "Diagnosed and resolved complex technical problems, maintaining high customer satisfaction scores and SLA compliance.",
      "Escalated critical incidents with proper documentation; utilized ticketing systems to manage and track cases efficiently.",
      "Maintained detailed records of troubleshooting steps, contributing to a growing internal knowledge base.",
    ],
  },
  {
    role: "Intern Software Engineer",
    company: "Tridhya Tech Limited",
    location: "Ahmedabad, Gujarat, IN",
    period: "Jul 2022 – Dec 2022",
    color: "#38bdf8",
    points: [
      "Developed and maintained full stack web applications using JavaScript, PHP, and MySQL; contributed to 3+ production features.",
      "Integrated REST APIs and managed relational databases for dynamic, data-driven web applications.",
      "Collaborated with senior developers in an Agile environment to debug, test, and optimize application performance.",
      "Improved UI/UX responsiveness across devices by standardizing CSS best practices.",
    ],
  },
];

const education = [
  {
    degree: "Post Graduation in Web Development",
    school: "Conestoga College",
    period: "May 2023 – Aug 2024",
    cgpa: "3.84 / 4.0",
    Icon: SchoolOutlinedIcon,
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "SPU",
    period: "Jul 2019 – Apr 2022",
    cgpa: "8.48 / 10.0",
    Icon: MenuBookOutlinedIcon,
  },
];

const certifications = [
  { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", Icon: CloudOutlinedIcon,   color: "#38bdf8" },
  { name: "CompTIA A+ Core 1 (220-1101)",          issuer: "CompTIA",   Icon: ComputerOutlinedIcon, color: "#8b5cf6" },
];

const contactItems = [
  { Icon: EmailOutlinedIcon,       label: "Email",    value: "rajyashraj333@gmail.com",      href: "mailto:rajyashraj333@gmail.com",               color: "#8b5cf6" },
  { Icon: PhoneIphoneRoundedIcon,  label: "Phone",    value: "+1 (613) 661-6919",            href: "tel:+16136616919",                             color: "#38bdf8" },
  { Icon: PlaceOutlinedIcon,       label: "Location", value: "Belleville, Ontario, Canada",  href: null,                                           color: "#34d399" },
  { Icon: LinkedInIcon,            label: "LinkedIn", value: "linkedin.com/in/yashraj-raj",  href: "https://www.linkedin.com/in/yashraj-raj-a04166258/", color: "#0a66c2" },
];

const aboutMeta = [
  { Icon: PlaceOutlinedIcon,      text: "Belleville, Ontario, Canada" },
  { Icon: EmailOutlinedIcon,      text: "rajyashraj333@gmail.com" },
  { Icon: PhoneIphoneRoundedIcon, text: "+1 (613) 661-6919" },
];

function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="section-header">
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

export default function MainSection() {
  return (
    <div className="main-wrapper">

      {/* About */}
      <section id="about" className="portfolio-section">
        <AnimatedSection>
          <SectionHeader label="01 / ABOUT" title="Who I Am" />
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a results-driven <span className="highlight">Full Stack Developer</span> based in Belleville, ON,
                with hands-on experience building scalable MERN stack applications, RESTful APIs, and responsive interfaces.
              </p>
              <p>
                I'm passionate about writing clean, maintainable code and delivering user-centric digital solutions.
                Whether it's a real-time chat app or an enterprise-grade system, I bring dedication to every project.
              </p>
              <div className="about-meta">
                {aboutMeta.map(({ Icon, text }) => (
                  <div key={text} className="meta-item">
                    <Icon className="meta-icon" sx={{ fontSize: 16 }} />
                    {text}
                  </div>
                ))}
              </div>
              <div className="about-actions">
                <a href="https://www.linkedin.com/in/yashraj-raj-a04166258/" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn ↗</a>
                <a href="#contact" className="btn-outline">Contact ↗</a>
              </div>
            </div>
            <div className="about-card-stack">
              <div className="stat-card" style={{ "--accent": "#8b5cf6" }}>
                <span className="stat-num">3+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="stat-card" style={{ "--accent": "#38bdf8" }}>
                <span className="stat-num">2+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-card" style={{ "--accent": "#34d399" }}>
                <span className="stat-num">2</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Skills */}
      <section id="skills" className="portfolio-section">
        <AnimatedSection>
          <SectionHeader label="02 / SKILLS" title="Technical Stack" subtitle="Technologies and tools I work with" />
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-category" style={{ "--cat-color": skillColors[category] }}>
                <div className="skill-category-header">
                  <span className="skill-dot" />
                  <h3>{category}</h3>
                </div>
                <div className="skill-tags">
                  {items.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Projects */}
      <section id="projects" className="portfolio-section">
        <AnimatedSection>
          <SectionHeader label="03 / PROJECTS" title="Featured Work" subtitle="Things I've built" />
          <div className="projects-grid">
            {projects.map(({ title, description, tech, Icon, color, liveUrl, githubUrl }) => (
              <div key={title} className="project-card" style={{ "--project-color": color }}>
                <div className="project-icon-wrap">
                  <Icon sx={{ fontSize: 28, color }} />
                </div>
                <div className="project-body">
                  <h3 className="project-title">{title}</h3>
                  <p className="project-desc">{description}</p>
                  <div className="project-tech">
                    {tech.map((t) => (
                      <span key={t} className="project-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="project-links">
                  {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noreferrer" className="project-link project-link--live">
                      <OpenInNewRoundedIcon sx={{ fontSize: 15 }} />
                      Live Demo
                    </a>
                  )}
                  {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noreferrer" className="project-link project-link--github">
                      <GitHubIcon sx={{ fontSize: 15 }} />
                      GitHub
                    </a>
                  )}
                </div>
                <div className="project-glow" />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Experience */}
      <section id="experience" className="portfolio-section">
        <AnimatedSection>
          <SectionHeader label="04 / EXPERIENCE" title="Work History" subtitle="My professional journey" />
          <div className="timeline">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item" style={{ "--exp-color": exp.color }}>
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                  {i < experiences.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <div className="timeline-meta">
                        <span className="timeline-company">{exp.company}</span>
                        <span className="timeline-sep">·</span>
                        <span className="timeline-location">{exp.location}</span>
                      </div>
                    </div>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <ul className="timeline-points">
                    {exp.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="portfolio-section">
        <AnimatedSection>
          <SectionHeader label="05 / EDUCATION & CERTS" title="Learning Path" />
          <div className="edu-cert-grid">
            <div className="edu-col">
              <h3 className="subsection-title">Education</h3>
              {education.map(({ degree, school, period, cgpa, Icon }) => (
                <div key={degree} className="edu-card">
                  <Icon className="edu-icon" sx={{ fontSize: 28, color: "#8b5cf6" }} />
                  <div>
                    <p className="edu-degree">{degree}</p>
                    <p className="edu-school">{school}</p>
                    <div className="edu-meta">
                      <span>{period}</span>
                      <span className="edu-cgpa">CGPA: {cgpa}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cert-col">
              <h3 className="subsection-title">Certifications</h3>
              {certifications.map(({ name, issuer, Icon, color }) => (
                <div key={name} className="cert-card" style={{ "--cert-color": color }}>
                  <Icon className="cert-icon" sx={{ fontSize: 28, color }} />
                  <div>
                    <p className="cert-name">{name}</p>
                    <p className="cert-issuer">{issuer}</p>
                  </div>
                  <div className="cert-glow" />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Contact */}
      <section id="contact" className="portfolio-section">
        <AnimatedSection>
          <SectionHeader label="06 / CONTACT" title="Let's Connect" subtitle="Open to new opportunities and collaborations" />
          <div className="contact-grid">
            <div className="contact-info">
              <p className="contact-intro">
                I'm currently open to full-time roles, freelance projects, and exciting collaborations.
                Drop me a message and I'll reply within 48 hours.
              </p>
              {contactItems.map(({ Icon, label, value, href, color }) => (
                <div key={label} className="contact-card">
                  <Icon className="contact-icon" sx={{ fontSize: 22, color }} />
                  <div>
                    <p className="contact-label">{label}</p>
                    {href
                      ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-value">{value}</a>
                      : <p className="contact-value">{value}</p>
                    }
                  </div>
                  <div className="contact-card-shine" />
                </div>
              ))}
              <div className="contact-availability">
                <span className="avail-dot" />
                Available for new opportunities
              </div>
            </div>
            <ContactForm />
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>Designed & Built by <span className="highlight">Yashraj Raj</span> · Full Stack Developer</p>
        <p className="footer-sub">Belleville, ON · 2025</p>
      </footer>
    </div>
  );
}

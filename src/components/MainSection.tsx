import React, { useEffect, useRef } from "react";
import ContactForm from "./ContactForm.js";

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
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";

function useInView(ref: React.RefObject<HTMLElement | null>, options: IntersectionObserverInit = {}) {
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

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`animated-section ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  );
}

const skills = {
  Languages: ["Python", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "C#", "VB.NET"],
  "Software Engineering": ["Data Structures & Algorithms", "OOP", "Unit & Component Testing", "Integration Testing", "SDLC", "Code Reviews", "Performance Optimization"],
  "APIs & Backend": ["Node.js", "Express.js", "RESTful APIs", "GraphQL", "Middleware", "JWT Authentication", "OAuth"],
  "Security & Access Control": ["Secure Coding", "Role-Based Access Control (RBAC)", "Authorization", "Access Governance", "Security Validation"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Database Design", "Query Optimization"],
  "Cloud & DevOps": ["AWS", "Microsoft Azure", "Docker", "CI/CD", "GitHub Actions", "Railway", "Vercel"],
  "Testing & Quality": ["Unit Testing", "API Testing (Postman)", "Defect Resolution", "Performance Testing", "Test Documentation"],
  "Engineering Practices": ["Agile", "Scrum", "Version Control (Git/GitHub)", "Technical Documentation", "AI-Assisted Development"],
};

const skillColors: Record<string, string> = {
  Languages: "#8b5cf6",
  "Software Engineering": "#38bdf8",
  "APIs & Backend": "#34d399",
  "Security & Access Control": "#f97316",
  Databases: "#e879f9",
  "Cloud & DevOps": "#2dd4bf",
  "Testing & Quality": "#fbbf24",
  "Engineering Practices": "#fb7185",
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
    liveUrl: "https://groupchatv1-1.onrender.com/",
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
    role: "Full Stack Engineer",
    company: "MyTripMatch",
    location: "Remote · Part-Time",
    period: "Jul 2026 – Present",
    color: "#8b5cf6",
    points: [
      "Design, develop, and maintain full-stack application features using React.js, JavaScript, Node.js, Express.js, and RESTful APIs, following documented architecture and deployment patterns.",
      "Build responsive, reusable frontend components and integrate them with backend REST APIs to support data-driven application workflows.",
      "Develop and enhance backend services, authentication workflows, and business logic; perform unit and component testing to validate functionality before release.",
      "Troubleshoot application defects and backend errors through structured debugging and root-cause analysis, escalating and documenting findings as needed.",
      "Use Git/GitHub for version control and follow Agile/SDLC practices, contributing to code quality, documentation, and continuous improvement.",
    ],
  },
  {
    role: "Software Developer I",
    company: "Micro1",
    location: "Remote · Contract",
    period: "Sep 2025 – Feb 2026",
    color: "#38bdf8",
    points: [
      "Developed custom full-stack web applications for business clients using React.js, Node.js, Express.js, MongoDB, and RESTful APIs, translating business requirements into technical specifications.",
      "Built an Inventory Management System supporting inventory tracking, billing, invoice generation, and PDF export, including secure REST APIs for core business modules.",
      "Implemented JWT authentication and role-based authorization to protect application resources and enforce access control.",
      "Integrated online payment workflows with transaction validation and error handling; optimized database queries to improve responsiveness and reliability.",
      "Performed debugging, software testing, and defect resolution throughout the delivery lifecycle; deployed applications to production and configured hosting/CI-CD settings.",
      "Followed Agile development, code review, and SDLC practices, and maintained technical documentation covering implementation, testing, and deployment.",
    ],
  },
  {
    role: "Technical Support Specialist, Tier II",
    company: "Concentrix",
    location: "Belleville, ON · Full-Time",
    period: "Jun 2024 – Jul 2026",
    color: "#34d399",
    points: [
      "Provided Tier II technical support and advanced troubleshooting for software, application, account, and system-related issues, analyzing incidents and implementing resolution procedures.",
      "Diagnosed software and system defects, escalating complex incidents to appropriate technical teams and following structured incident-management workflows.",
      "Maintained detailed technical documentation, troubleshooting procedures, and resolution notes; identified recurring issues and contributed to process improvements.",
      "Communicated technical information clearly to users, technical teams, and internal stakeholders while maintaining service quality and operational standards.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Tridhya Tech Limited",
    location: "Ahmedabad, Gujarat, IN · Full-Time",
    period: "Mar 2022 – Apr 2023",
    color: "#f97316",
    points: [
      "Developed and maintained web application features using JavaScript, HTML5, CSS3, REST APIs, and database operations, collaborating with senior engineers on requirements analysis.",
      "Developed and integrated RESTful APIs supporting application features and communication between frontend and backend services.",
      "Participated in debugging, testing, defect resolution, and code reviews, investigating issues and implementing changes to improve reliability and performance.",
      "Used Git for source control and worked within Agile/Scrum and SDLC methodologies to deliver assigned application features.",
    ],
  },
];

const education = [
  {
    degree: "Post-Graduate Diploma, Web Development",
    school: "Conestoga College, Canada",
    period: "May 2023 – Aug 2024",
    Icon: SchoolOutlinedIcon,
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Sardar Patel University, India",
    period: "Jul 2019 – Apr 2022",
    Icon: MenuBookOutlinedIcon,
  },
];

const certifications = [
  { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft",               Icon: CloudOutlinedIcon,       color: "#38bdf8" },
  { name: "CompTIA A+",                            issuer: "CompTIA",                 Icon: ComputerOutlinedIcon,    color: "#8b5cf6" },
  { name: "Agile Software Development",            issuer: "Professional Training",   Icon: LoopRoundedIcon,         color: "#34d399" },
  { name: "Software Testing & Quality Assurance",  issuer: "Professional Training",   Icon: BugReportOutlinedIcon,   color: "#f97316" },
  { name: "REST API Development",                  issuer: "Professional Training",   Icon: ApiRoundedIcon,          color: "#e879f9" },
  { name: "Git & Version Control",                 issuer: "Professional Training",   Icon: AccountTreeRoundedIcon,  color: "#2dd4bf" },
];

const contactItems = [
  { Icon: EmailOutlinedIcon,       label: "Email",    value: "rajyashraj333@gmail.com",      href: "mailto:rajyashraj333@gmail.com",               color: "#8b5cf6" },
  { Icon: PhoneIphoneRoundedIcon,  label: "Phone",    value: "+1 (613) 661-6919",            href: "tel:+16136616919",                             color: "#38bdf8" },
  { Icon: PlaceOutlinedIcon,       label: "Location", value: "Ontario, Canada",  href: null,                                           color: "#34d399" },
  { Icon: LinkedInIcon,            label: "LinkedIn", value: "linkedin.com/in/yashraj-raj",  href: "https://www.linkedin.com/in/yashraj-raj-a04166258/", color: "#0a66c2" },
];

const aboutMeta = [
  { Icon: PlaceOutlinedIcon,      text: "Ontario, Canada" },
  { Icon: EmailOutlinedIcon,      text: "rajyashraj333@gmail.com" },
  { Icon: PhoneIphoneRoundedIcon, text: "+1 (613) 661-6919" },
];

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
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
                I'm a <span className="highlight">Software Engineer</span> based in ON, CAN, with 3+ years of experience
                developing, testing, and deploying full-stack web applications and REST APIs using Python, JavaScript/TypeScript,
                Node.js, and React.js.
              </p>
              <p>
                I'm skilled in secure coding, role-based access control, unit and component testing, and CI/CD deployment
                within Agile/SDLC environments — integrating relational and NoSQL databases and building scalable backend
                services in a validated, review-driven workflow.
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
              <div className="stat-card" style={{ "--accent": "#8b5cf6" } as React.CSSProperties}>
                <span className="stat-num">3+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="stat-card" style={{ "--accent": "#38bdf8" } as React.CSSProperties}>
                <span className="stat-num">3+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-card" style={{ "--accent": "#34d399" } as React.CSSProperties}>
                <span className="stat-num">6</span>
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
              <div key={category} className="skill-category" style={{ "--cat-color": skillColors[category] } as React.CSSProperties}>
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
              <div key={title} className="project-card" style={{ "--project-color": color } as React.CSSProperties}>
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
              <div key={i} className="timeline-item" style={{ "--exp-color": exp.color } as React.CSSProperties}>
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
              {education.map(({ degree, school, period, Icon }) => (
                <div key={degree} className="edu-card">
                  <Icon className="edu-icon" sx={{ fontSize: 28, color: "#8b5cf6" }} />
                  <div>
                    <p className="edu-degree">{degree}</p>
                    <p className="edu-school">{school}</p>
                    <div className="edu-meta">
                      <span>{period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cert-col">
              <h3 className="subsection-title">Certifications</h3>
              {certifications.map(({ name, issuer, Icon, color }) => (
                <div key={name} className="cert-card" style={{ "--cert-color": color } as React.CSSProperties}>
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
                Drop me a message and I'll reply within 6 hours.
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
              
            </div>
            <ContactForm />
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>Designed & Built by <span className="highlight">Yashraj Raj</span> · Software Engineer</p>
        <p className="footer-sub"> ON, CAN · 2023</p>
      </footer>
    </div>
  );
}

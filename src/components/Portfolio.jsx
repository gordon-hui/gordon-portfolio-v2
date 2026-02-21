"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, ChevronDown, ChevronUp, ExternalLink, ArrowRight, Linkedin, Mail, Send } from "lucide-react";

const COLORS = {
  light: {
    bg: "#FAF9F6",
    bgAlt: "#F0EFEB",
    text: "#1A1A1A",
    textSecondary: "#5C5C5C",
    textMuted: "#8A8A8A",
    accent: "#C45D3E",
    accentHover: "#A84B30",
    border: "#E0DED8",
    cardBg: "#FFFFFF",
    cardHover: "#FAFAF8",
    navBg: "rgba(250, 249, 246, 0.9)",
    tagBg: "#F0EFEB",
    tagText: "#5C5C5C",
  },
  dark: {
    bg: "#131316",
    bgAlt: "#1C1C21",
    text: "#E8E6E1",
    textSecondary: "#A8A6A0",
    textMuted: "#6B6966",
    accent: "#D4785E",
    accentHover: "#E08B70",
    border: "#2A2A30",
    cardBg: "#1C1C21",
    cardHover: "#222228",
    navBg: "rgba(19, 19, 22, 0.9)",
    tagBg: "#2A2A30",
    tagText: "#A8A6A0",
  },
};

// Profile photo - replace with actual image path in production
const PROFILE_PHOTO = "/profile.jpg";

function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Nav({ theme, toggleTheme, c }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimer = useRef(null);
  const router = useRouter();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const next = logoClicks + 1;
    if (next >= 5) {
      setLogoClicks(0);
      window.open("https://gordon-blog.sanity.studio", "_blank");
    } else {
      setLogoClicks(next);
      clearTimeout(logoClickTimer.current);
      logoClickTimer.current = setTimeout(() => setLogoClicks(0), 2000);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Experience", "Projects", "Blog", "Contact"];

  const handleNavClick = (l) => {
    if (l === "Blog") {
      router.push("/blog");
    } else {
      document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: c.navBg,
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? `1px solid ${c.border}` : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          onClick={handleLogoClick}
          style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 20, fontWeight: 700, color: c.text, cursor: "pointer", letterSpacing: "-0.02em" }}
        >
          GH
        </span>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div className="nav-links-desktop" style={{ display: "flex", gap: 28 }}>
            {links.map((l) => (
              <span
                key={l}
                onClick={() => handleNavClick(l)}
                style={{ fontSize: 14, color: c.textSecondary, cursor: "pointer", letterSpacing: "0.03em", fontFamily: "'Nunito Sans', sans-serif", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = c.accent)}
                onMouseLeave={(e) => (e.target.style.color = c.textSecondary)}
              >
                {l}
              </span>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            style={{ background: "none", border: "none", cursor: "pointer", color: c.textSecondary, padding: 4, display: "flex", alignItems: "center" }}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: c.textSecondary, padding: 4, display: "none", flexDirection: "column", gap: 4 }}
          >
            <span style={{ width: 20, height: 2, background: c.textSecondary, borderRadius: 1, transition: "0.2s" }} />
            <span style={{ width: 20, height: 2, background: c.textSecondary, borderRadius: 1, transition: "0.2s" }} />
            <span style={{ width: 20, height: 2, background: c.textSecondary, borderRadius: 1, transition: "0.2s" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ padding: "8px 24px 20px", display: "flex", flexDirection: "column", gap: 16, background: c.navBg }}>
          {links.map((l) => (
            <span
              key={l}
              onClick={() => handleNavClick(l)}
              style={{ fontSize: 15, color: c.textSecondary, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}
            >
              {l}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function Hero({ c }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative" }}>
      <div style={{ maxWidth: 820, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 400px" }}>
        <div style={{ overflow: "hidden", marginBottom: 16 }}>
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: c.accent,
              fontWeight: 500,
              transform: loaded ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.6s ease 0.2s",
            }}
          >
            Software Engineer
          </p>
        </div>
        <div style={{ overflow: "hidden", marginBottom: 24 }}>
          <h1
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(40px, 8vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: c.text,
              letterSpacing: "-0.03em",
              transform: loaded ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.7s ease 0.35s",
            }}
          >
            Gordon Hui
          </h1>
        </div>
        <div style={{ overflow: "hidden", marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "clamp(18px, 3vw, 22px)",
              color: c.textSecondary,
              lineHeight: 1.5,
              maxWidth: 540,
              transform: loaded ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.7s ease 0.5s",
            }}
          >
            I ship products, solve problems, and never stop learning.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s",
          }}
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#fff",
              background: c.accent,
              padding: "12px 28px",
              borderRadius: 6,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "background 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = c.accentHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = c.accent)}
          >
            Get in touch <ArrowRight size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/gordon-hui/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: c.textSecondary,
              padding: "12px 28px",
              borderRadius: 6,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: `1px solid ${c.border}`,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textSecondary; }}
          >
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>
        </div>

        {/* Profile Photo */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "scale(1)" : "scale(0.9)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              overflow: "hidden",
              border: `4px solid ${c.border}`,
              boxShadow: `0 8px 32px ${c.accent}15`,
            }}
          >
            <img
              src={PROFILE_PHOTO}
              alt="Gordon Hui"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* Subtle decorative element */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c.accent}08, transparent)`,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

function About({ c }) {
  return (
    <section id="about" style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: c.accent, fontWeight: 500, marginBottom: 16 }}>
          About
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 700, color: c.text, lineHeight: 1.2, marginBottom: 28, letterSpacing: "-0.02em" }}>
          A bit about me
        </h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 16, color: c.textSecondary, lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 20 }}>
          <p>
            Software engineer at Meta, where I build creator tools and product discovery surfaces that reach millions of users. I came to tech through a non-traditional path — including a background in veterinary medicine — which gave me a unique perspective on problem-solving and empathy-driven product thinking.
          </p>
          <p>
            I'm passionate about building things that work well, learning in public, and currently diving deep into AI engineering and Python. When I'm not shipping features, you'll find me optimizing travel rewards, baking sourdough, or exploring what's next in the AI space.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

function Experience({ c }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const jobs = [
    {
      id: "meta",
      company: "Meta",
      role: "Software Engineer",
      period: "Jul 2024 — Present",
      current: true,
      summary: "Building creator tools and product discovery experiences across three teams.",
      details: [
        { team: "Affiliates", status: "current", desc: "Building creator tools and product discovery surfaces to help creators monetize and grow." },
        { team: "Facebook Subscriptions", status: "1 year", desc: "Increased creator payouts and shipped multi-tier subscription functionality." },
        { team: "Notifications", status: "6 months", desc: "Data-driven notification optimization to increase DAU and MAU." },
      ],
    },
    {
      id: "bill",
      company: "BILL",
      role: "Software Engineer II",
      period: "Jul 2022 — Jul 2024",
      current: false,
      summary: "Led frontend development for international payments, driving user engagement and revenue growth.",
      details: [
        { team: "International Payments", desc: "Spearheaded cross-functional discovery to resolve critical pain points, leading to the highest number of vendor sign-ups." },
        { team: "Data & Experimentation", desc: "Built data collection and A/B testing pipelines with Mixpanel and LaunchDarkly for data-informed optimizations." },
        { team: "Operations", desc: "Resolved a critical accounting sync issue that cleared a 10,000-vendor backlog and enabled 100-200 new vendors weekly." },
      ],
    },
  ];

  return (
    <section id="experience" style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: c.accent, fontWeight: 500, marginBottom: 16 }}>
          Experience
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 700, color: c.text, lineHeight: 1.2, marginBottom: 48, letterSpacing: "-0.02em" }}>
          Where I've worked
        </h2>
      </FadeIn>

      <div style={{ position: "relative", paddingLeft: 32 }}>
        {/* Timeline line */}
        <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: c.border }} />

        {jobs.map((job, i) => (
          <FadeIn key={job.id} delay={0.15 + i * 0.1}>
            <div style={{ marginBottom: 40, position: "relative" }}>
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: -32 + 2,
                  top: 8,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: job.current ? c.accent : c.border,
                  border: `2px solid ${job.current ? c.accent : c.textMuted}`,
                }}
              />

              <div
                style={{
                  background: c.cardBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  padding: "24px 28px",
                  cursor: "pointer",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onClick={() => toggle(job.id)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent + "60"; e.currentTarget.style.boxShadow = `0 2px 12px ${c.accent}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 18, fontWeight: 600, color: c.text, marginBottom: 2 }}>
                      {job.role}
                    </h3>
                    <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, color: c.accent, fontWeight: 500 }}>
                      {job.company}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, color: c.textMuted }}>
                      {job.period}
                    </span>
                    {expanded[job.id] ? <ChevronUp size={16} color={c.textMuted} /> : <ChevronDown size={16} color={c.textMuted} />}
                  </div>
                </div>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: c.textSecondary, lineHeight: 1.6, marginTop: 8 }}>
                  {job.summary}
                </p>

                {expanded[job.id] && (
                  <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16, borderTop: `1px solid ${c.border}`, paddingTop: 20 }}>
                    {job.details.map((d, j) => (
                      <div key={j}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, fontWeight: 600, color: c.text }}>
                            {d.team}
                          </span>
                          {d.status && (
                            <span
                              style={{
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: 11,
                                color: d.status === "current" ? c.accent : c.textMuted,
                                background: d.status === "current" ? c.accent + "15" : c.tagBg,
                                padding: "2px 8px",
                                borderRadius: 4,
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                              }}
                            >
                              {d.status}
                            </span>
                          )}
                        </div>
                        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>
                          {d.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Projects({ c }) {
  const projects = [
    {
      title: "AI Project",
      status: "Coming Soon",
      desc: "Exploring AI engineering — building tools at the intersection of machine learning and product development. More details coming soon.",
      tags: ["Python", "AI/ML", "In Progress"],
    },
    {
      title: "Learning in Public",
      status: "Ongoing",
      desc: "Documenting my journey from JavaScript to Python and AI engineering. Writing about what I learn, what breaks, and what clicks.",
      tags: ["Python", "AI", "Writing"],
    },
  ];

  return (
    <section id="projects" style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: c.accent, fontWeight: 500, marginBottom: 16 }}>
          Projects
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 700, color: c.text, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.02em" }}>
          What I'm building
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, color: c.textMuted, marginBottom: 40, lineHeight: 1.6 }}>
          Current and upcoming projects. This section grows as I build.
        </p>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {projects.map((p, i) => (
          <FadeIn key={i} delay={0.2 + i * 0.1}>
            <div
              style={{
                background: c.cardBg,
                border: `1px solid ${c.border}`,
                borderRadius: 10,
                padding: "28px 28px",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent + "60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 17, fontWeight: 600, color: c.text }}>
                  {p.title}
                </h3>
                <span
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 11,
                    color: c.accent,
                    background: c.accent + "15",
                    padding: "3px 10px",
                    borderRadius: 4,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {p.status}
                </span>
              </div>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: c.textSecondary, lineHeight: 1.65, marginBottom: 16 }}>
                {p.desc}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: 12,
                      color: c.tagText,
                      background: c.tagBg,
                      padding: "4px 10px",
                      borderRadius: 4,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Blog({ c, posts: livePosts }) {
  const fallbackPosts = [
    {
      title: "From JavaScript to Python: What I Wish I Knew Earlier",
      excerpt: "Scoping, closures, and hoisting — the mental model shifts that tripped me up and how I got past them.",
      publishedAt: null,
      tags: ["Python", "JavaScript"],
      slug: null,
    },
    {
      title: "My AI Engineering Learning Roadmap",
      excerpt: "A structured plan for going from frontend engineer to AI-literate builder. Tools, resources, and milestones.",
      publishedAt: null,
      tags: ["AI", "Career"],
      slug: null,
    },
    {
      title: "How I Use AI Models in My Dev Workflow",
      excerpt: "Different models for different phases — from scoping to debugging. My real workflow, not the hype.",
      publishedAt: null,
      tags: ["AI", "Productivity"],
      slug: null,
    },
  ];

  const posts = livePosts && livePosts.length > 0 ? livePosts : fallbackPosts;
  const hasLivePosts = livePosts && livePosts.length > 0;

  const formatDate = (dateStr) => {
    if (!dateStr) return "Coming Soon";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const PostCard = ({ p, i }) => {
    const card = (
      <div
        style={{
          background: c.cardBg,
          border: `1px solid ${c.border}`,
          borderRadius: 10,
          padding: "24px 28px",
          cursor: p.slug ? "pointer" : "default",
          transition: "border-color 0.2s, transform 0.2s",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent + "60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 16, fontWeight: 600, color: c.text, lineHeight: 1.4, flex: 1, marginRight: 16 }}>
            {p.title}
          </h3>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, color: c.textMuted, whiteSpace: "nowrap" }}>
            {formatDate(p.publishedAt)}
          </span>
        </div>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: c.textSecondary, lineHeight: 1.6, marginBottom: 12 }}>
          {p.excerpt}
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          {(p.tags || []).map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 12,
                color: c.tagText,
                background: c.tagBg,
                padding: "3px 8px",
                borderRadius: 4,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );

    if (p.slug) {
      return (
        <a href={`/blog/${p.slug.current || p.slug}`} style={{ textDecoration: "none" }}>
          {card}
        </a>
      );
    }
    return card;
  };

  return (
    <section id="blog" style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: c.accent, fontWeight: 500, marginBottom: 16 }}>
          Blog
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 700, color: c.text, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.02em" }}>
          Learning in public
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, color: c.textMuted, marginBottom: 40, lineHeight: 1.6 }}>
          Writing about Python, AI, and the things I pick up along the way.
        </p>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {posts.slice(0, 3).map((p, i) => (
          <FadeIn key={p._id || i} delay={0.2 + i * 0.1}>
            <PostCard p={p} i={i} />
          </FadeIn>
        ))}
      </div>

      {hasLivePosts && (
        <FadeIn delay={0.5}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a
              href="/blog"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: c.accent,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View all posts →
            </a>
          </div>
        </FadeIn>
      )}
    </section>
  );
}

function Contact({ c }) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://formspree.io/f/maqddzvz", {
      method: "POST",
      body: new FormData(e.target),
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) setSubmitted(true);
      })
      .catch(() => {});
  };

  return (
    <section id="contact" style={{ padding: "80px 24px 60px", maxWidth: 720, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: c.accent, fontWeight: 500, marginBottom: 16 }}>
          Contact
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 700, color: c.text, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.02em" }}>
          Let's connect
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, color: c.textMuted, marginBottom: 40, lineHeight: 1.6 }}>
          Have a question, want to collaborate, or just say hello? Drop me a message.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        {submitted ? (
          <div
            style={{
              background: c.cardBg,
              border: `1px solid ${c.accent}40`,
              borderRadius: 10,
              padding: "40px 28px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
            <h3 style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 18, fontWeight: 600, color: c.text, marginBottom: 8 }}>
              Message sent!
            </h3>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: c.textSecondary }}>
              Thanks for reaching out. I'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Honeypot field - hidden from humans, catches bots */}
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
            />
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 240px" }}>
                <label style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, color: c.textMuted, display: "block", marginBottom: 6, letterSpacing: "0.02em" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 14,
                    color: c.text,
                    background: c.bgAlt,
                    border: `1px solid ${c.border}`,
                    borderRadius: 6,
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = c.accent)}
                  onBlur={(e) => (e.target.style.borderColor = c.border)}
                />
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <label style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, color: c.textMuted, display: "block", marginBottom: 6, letterSpacing: "0.02em" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 14,
                    color: c.text,
                    background: c.bgAlt,
                    border: `1px solid ${c.border}`,
                    borderRadius: 6,
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = c.accent)}
                  onBlur={(e) => (e.target.style.borderColor = c.border)}
                />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, color: c.textMuted, display: "block", marginBottom: 6, letterSpacing: "0.02em" }}>
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 14,
                  color: c.text,
                  background: c.bgAlt,
                  border: `1px solid ${c.border}`,
                  borderRadius: 6,
                  outline: "none",
                  transition: "border-color 0.2s",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = c.accent)}
                onBlur={(e) => (e.target.style.borderColor = c.border)}
              />
            </div>
            <button
              type="submit"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#fff",
                background: c.accent,
                padding: "12px 32px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                transition: "background 0.2s",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = c.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = c.accent)}
            >
              <Send size={14} /> Send message
            </button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}

function Footer({ c }) {
  return (
    <footer style={{ padding: "40px 24px", maxWidth: 720, margin: "0 auto", borderTop: `1px solid ${c.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, color: c.textMuted }}>
          © {new Date().getFullYear()} Gordon Hui
        </p>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a
            href="https://www.linkedin.com/in/gordon-hui/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: c.textMuted, transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = c.textMuted)}
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:gordonhui.gh@gmail.com"
            style={{ color: c.textMuted, transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = c.textMuted)}
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio({ posts }) {
  const [theme, setTheme] = useState("light");
  const c = COLORS[theme];
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div style={{ background: c.bg, minHeight: "100vh", transition: "background 0.3s ease, color 0.3s ease" }}>
      <style>{`
        ::selection { background: ${c.accent}30; }
      `}</style>
      <Nav theme={theme} toggleTheme={toggleTheme} c={c} />
      <Hero c={c} />
      <About c={c} />
      <Experience c={c} />
      <Projects c={c} />
      <Blog c={c} posts={posts} />
      <Contact c={c} />
      <Footer c={c} />
    </div>
  );
}

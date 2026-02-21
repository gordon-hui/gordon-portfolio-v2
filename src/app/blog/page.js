"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { COLORS } from "@/lib/theme";

function BlogCard({ post, c }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Coming Soon";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const card = (
    <div
      style={{
        background: c.cardBg,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: "24px 28px",
        cursor: post.slug ? "pointer" : "default",
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = c.accent + "60";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = c.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <h3
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: c.text,
            lineHeight: 1.4,
            flex: 1,
            marginRight: 16,
          }}
        >
          {post.title}
        </h3>
        <span
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 12,
            color: c.textMuted,
            whiteSpace: "nowrap",
          }}
        >
          {formatDate(post.publishedAt)}
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: 14,
          color: c.textSecondary,
          lineHeight: 1.65,
          marginBottom: 14,
        }}
      >
        {post.excerpt}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(post.tags || []).map((t) => (
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

  if (post.slug) {
    return (
      <a
        href={`/blog/${post.slug.current || post.slug}`}
        style={{ textDecoration: "none" }}
      >
        {card}
      </a>
    );
  }
  return card;
}

export default function BlogPage() {
  const [theme, setTheme] = useState("light");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const c = COLORS[theme];
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPosts(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        background: c.bg,
        minHeight: "100vh",
        transition: "background 0.3s ease",
      }}
    >
      <style>{`::selection { background: ${c.accent}30; }`}</style>

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: c.navBg,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14,
              color: c.textSecondary,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.accent)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = c.textSecondary)
            }
          >
            <ArrowLeft size={16} /> Back home
          </a>
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: c.textSecondary,
              padding: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "100px 24px 80px" }}>
        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 14,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: c.accent,
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Blog
        </p>
        <h1
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: 700,
            color: c.text,
            lineHeight: 1.15,
            marginBottom: 12,
            letterSpacing: "-0.02em",
          }}
        >
          Learning in public
        </h1>
        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 16,
            color: c.textMuted,
            marginBottom: 48,
            lineHeight: 1.6,
            maxWidth: 540,
          }}
        >
          Writing about Python, AI, engineering, and the things I pick up along
          the way.
        </p>

        {loading ? (
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14,
              color: c.textMuted,
            }}
          >
            Loading posts...
          </p>
        ) : posts.length === 0 ? (
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14,
              color: c.textMuted,
            }}
          >
            No posts yet — check back soon.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {posts.map((post, i) => (
              <BlogCard key={post._id || i} post={post} c={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

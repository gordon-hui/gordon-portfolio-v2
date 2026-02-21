"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Moon, Sun, Calendar, Tag } from "lucide-react";
import { COLORS } from "@/lib/theme";

export default function BlogPost({ params }) {
  const [theme, setTheme] = useState("light");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const c = COLORS[theme];
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    fetch(`/api/posts/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Simple Portable Text renderer
  const renderBlock = (block, index) => {
    if (block._type === "block") {
      const style = block.style || "normal";
      const text = (block.children || [])
        .map((child) => {
          let t = child.text || "";
          if (child.marks?.includes("strong")) t = `<strong>${t}</strong>`;
          if (child.marks?.includes("em")) t = `<em>${t}</em>`;
          if (child.marks?.includes("code"))
            t = `<code style="background:${c.bgAlt};padding:2px 6px;border-radius:3px;font-size:0.9em">${t}</code>`;
          return t;
        })
        .join("");

      const baseStyle = {
        fontFamily: "'Nunito Sans', sans-serif",
        color: c.textSecondary,
        lineHeight: 1.8,
        marginBottom: 20,
      };

      switch (style) {
        case "h2":
          return (
            <h2
              key={index}
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: 28,
                fontWeight: 700,
                color: c.text,
                marginTop: 40,
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          );
        case "h3":
          return (
            <h3
              key={index}
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: 22,
                fontWeight: 600,
                color: c.text,
                marginTop: 32,
                marginBottom: 12,
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          );
        case "blockquote":
          return (
            <blockquote
              key={index}
              style={{
                ...baseStyle,
                borderLeft: `3px solid ${c.accent}`,
                paddingLeft: 20,
                fontStyle: "italic",
                color: c.textMuted,
                margin: "24px 0",
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          );
        default:
          return (
            <p
              key={index}
              style={{ ...baseStyle, fontSize: 16 }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          );
      }
    }

    if (block._type === "image") {
      return (
        <figure key={index} style={{ margin: "32px 0" }}>
          <img
            src={block.asset?.url || ""}
            alt={block.alt || ""}
            style={{
              width: "100%",
              borderRadius: 8,
              border: `1px solid ${c.border}`,
            }}
          />
          {block.caption && (
            <figcaption
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 13,
                color: c.textMuted,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    if (block._type === "code") {
      return (
        <pre
          key={index}
          style={{
            background: c.bgAlt,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            padding: "20px 24px",
            overflow: "auto",
            margin: "24px 0",
            fontFamily: "'Fira Code', 'SF Mono', monospace",
            fontSize: 14,
            lineHeight: 1.6,
            color: c.text,
          }}
        >
          <code>{block.code}</code>
        </pre>
      );
    }

    return null;
  };

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
            href="/blog"
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
            <ArrowLeft size={16} /> All posts
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
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "100px 24px 80px" }}>
        {loading ? (
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 14,
              color: c.textMuted,
            }}
          >
            Loading...
          </p>
        ) : !post ? (
          <div>
            <h1
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: 32,
                fontWeight: 700,
                color: c.text,
                marginBottom: 16,
              }}
            >
              Post not found
            </h1>
            <a
              href="/blog"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 14,
                color: c.accent,
              }}
            >
              ← Back to all posts
            </a>
          </div>
        ) : (
          <>
            {/* Header */}
            <header style={{ marginBottom: 48 }}>
              <h1
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "clamp(28px, 5vw, 42px)",
                  fontWeight: 700,
                  color: c.text,
                  lineHeight: 1.2,
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                }}
              >
                {post.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                {post.publishedAt && (
                  <span
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: 13,
                      color: c.textMuted,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Calendar size={14} />
                    {formatDate(post.publishedAt)}
                  </span>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {post.tags.map((t) => (
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
              )}

              {post.excerpt && (
                <p
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 18,
                    color: c.textSecondary,
                    lineHeight: 1.6,
                    marginTop: 24,
                    paddingBottom: 24,
                    borderBottom: `1px solid ${c.border}`,
                  }}
                >
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Body */}
            <div>{(post.body || []).map((block, i) => renderBlock(block, i))}</div>

            {/* Footer */}
            <div
              style={{
                marginTop: 60,
                paddingTop: 24,
                borderTop: `1px solid ${c.border}`,
              }}
            >
              <a
                href="/blog"
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 14,
                  color: c.accent,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <ArrowLeft size={14} /> Back to all posts
              </a>
            </div>
          </>
        )}
      </article>
    </div>
  );
}

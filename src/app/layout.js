export const metadata = {
  title: "Gordon Hui — Software Engineer",
  description:
    "I ship products, solve problems, and never stop learning. Software Engineer at Meta.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Nunito+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}

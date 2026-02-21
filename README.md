# Gordon Hui — Portfolio v2

Personal portfolio + blog built with Next.js and Sanity CMS, deployed on Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io
- **Hosting:** Vercel
- **Styling:** Inline styles (Lora + Nunito Sans)
- **Contact:** Formspree

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Sanity

1. Create a free account at [sanity.io](https://www.sanity.io)
2. Create a new project
3. Copy your Project ID from the Sanity dashboard
4. Create a `.env.local` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Set up Sanity Studio

Follow the Sanity docs to set up your Studio and import the schemas from `sanity/schemas.js`.

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  app/
    page.js              # Homepage
    layout.js            # Root layout
    blog/
      page.js            # Blog listing (/blog)
      [slug]/page.js     # Individual posts (/blog/my-post)
    api/
      posts/
        route.js         # GET /api/posts
        [slug]/route.js  # GET /api/posts/:slug
  components/
    Portfolio.jsx        # Main portfolio component
  lib/
    sanity.js           # Sanity client
    queries.js          # Sanity GROQ queries
    theme.js            # Color theme constants
sanity/
  schemas.js            # Sanity document schemas
```

## Deployment

Connected to Vercel for automatic deploys on push to `main`.
Add your Sanity env vars in Vercel → Settings → Environment Variables.

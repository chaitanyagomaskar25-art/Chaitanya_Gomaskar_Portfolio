# Full-Stack Developer Portfolio

A modern, premium, responsive developer portfolio built with React, Vite, Tailwind CSS, and Lucide React. Features a dark/light theme toggle, two-card project carousel (10 projects), certificate carousel with modal previews, validated contact form, and accessibility-focused design.

## s

- Sticky responsive navbar with mobile hamburger menu and active-section highlighting
- Hero section with availability badge, social links, and resume download
- About section with key interests and highlights
- Education timeline
- Organized skills grid grouped by category
- 10-project carousel (2 cards on desktop, 1 on mobile) with arrows and page indicator
- Certificate carousel with full-size modal preview and verification links
- Resume download with clear "not yet available" messaging when PDF is missing
- Contact form with validation (opens email client as fallback)
- Dark/light theme toggle with localStorage persistence and system preference detection
- Scroll-to-top button
- SEO metadata (Open Graph, Twitter cards, canonical, robots.txt)
- Responsive across 320px to 1440px+
- Respects `prefers-reduced-motion`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customization

All content lives in `src/data/`:

### Personal Info — `src/data/profile.ts`
- Set `name`, `role`, `email`, `github`, `linkedin`, `location`
- Add `profileImage` and `aboutImage` (URLs or imported assets)
- Set `resumeAvailable: true` and place your PDF at `public/resume.pdf`
- Edit `aboutHighlights` with your real numbers

### Projects — `src/data/projects.ts`
- Edit each project's `title`, `description`, `image`, `technologies`
- Set `githubUrl` and `liveDemoUrl` to real URLs (empty string disables the button)
- Set `featured: true` for important projects

### Certificates — `src/data/certificates.ts`
- Edit `title`, `issuer`, `date`, `description`, `image`
- Set `verifyUrl` to the official credential verification page
- Set `pdfUrl` to a PDF link for "Open in new tab" in the modal

### Education — `src/data/education.ts`
- Edit degree, institution, years, coursework, CGPA

### Skills — `src/data/skills.ts`
- Add or remove skills within each category

## Contact Form

The form uses a `mailto:` fallback that opens the visitor's email client. To enable server-side submission, connect an email service (e.g., EmailJS, Formspree, or a Supabase Edge Function) and wire it into `src/components/ContactForm.tsx`.

## Deployment

### Vercel
```bash
npm run build
# Deploy the dist/ folder via Vercel dashboard or CLI
```

### Netlify
```bash
npm run build
# Publish directory: dist
```

### GitHub Pages
Set `base` in `vite.config.ts` to your repo name, then deploy `dist/`.

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Lucide React icons

# Full-Stack MERN Developer Portfolio — Chaitanya Gomaskar

A modern, high-performance, full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** developer portfolio. Features real-time contact storage, project metrics (likes, views, and filtering), interactive endorsements, an admin console for message moderation, dark/light theme toggle, and 100% responsive design across all screen sizes.

---

## 🚀 Key Highlights & Architectural Features

### 💻 Full-Stack MERN Architecture
- **MongoDB & Mongoose**: Schemas and models for Contacts, Projects, Skills, Certificates, Education, Testimonials, and Analytics.
- **Express.js & Node.js Backend**: RESTful API on port `5050` with CORS, Helmet, Morgan, and rate-friendly request parsing.
- **Zero-Downtime Resilience**: Seamless MongoDB connection with an automatic in-memory/JSON fallback engine, ensuring the app never crashes even if MongoDB is starting up.
- **React 18 + Vite + Tailwind CSS**: Ultrafast client SPA with instant HMR and smooth glassmorphism styling.

### ✨ Interactive Capabilities
- **Direct Database Contact Form**: Submits messages directly into MongoDB/Express with validation, animated loading indicators, and success confirmation toasts.
- **Admin Inquiries Console**: Protected console (`admin123`) to view all incoming messages, filter by read/unread status, and track portfolio telemetry.
- **Interactive Project Showcase**:
  - Filter by category (**Full-Stack MERN**, **AI & APIs**, **Frontend & UI**).
  - Instant live keyword search.
  - Interactive **Like Button** with live database counters.
  - Quick view inspect modals and view tracking.
  - Toggle between **Grid View** and **Carousel View**.
- **Community Endorsements**: Visitors and mentors can leave recommendations with star ratings that save directly to the database.
- **Live Backend Telemetry Badge**: Navbar pulse dot showing live MERN API and database health status.
- **Light & Dark Mode**: Persistent theme switcher with high-contrast accessibility.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 5, Tailwind CSS 3, Lucide React Icons |
| **Backend** | Node.js, Express.js 5 |
| **Database** | MongoDB, Mongoose 9 |
| **Dev Tools** | Concurrently, PostCSS, Autoprefixer |

---

## 📦 Project Structure

```
├── server/
│   ├── config/
│   │   └── db.js               # MongoDB connection & fallback store
│   ├── controllers/
│   │   ├── contactController.js # Contact form submission & admin messages
│   │   ├── projectController.js # Projects, likes, and views
│   │   └── dataController.js    # Profile, skills, testimonials, telemetry
│   ├── models/
│   │   ├── Contact.js          # Mongoose Contact schema
│   │   ├── Project.js          # Mongoose Project schema
│   │   ├── Skill.js            # Mongoose Skill schema
│   │   ├── Certificate.js      # Mongoose Certificate schema
│   │   ├── Education.js        # Mongoose Education schema
│   │   ├── Testimonial.js      # Mongoose Testimonial schema
│   │   └── Analytics.js        # Mongoose Analytics schema
│   ├── routes/
│   │   └── api.js              # Central API router
│   ├── data/
│   │   └── seedData.js         # Pre-populated portfolio seed data
│   ├── .env                    # Server environment variables
│   └── server.js               # Express server entry point
├── src/
│   ├── components/             # Reusable UI components & modals
│   ├── data/                   # Client-side configuration
│   ├── hooks/                  # Custom React hooks (theme, carousel, typing)
│   ├── sections/               # Portfolio sections (Hero, About, Projects, etc.)
│   ├── services/
│   │   └── api.js              # Centralized API service with offline fallback
│   ├── App.jsx                 # Main application component
│   └── main.jsx
├── package.json
└── vite.config.js              # Vite config with backend proxy on /api
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy or adjust `server/.env`:
```env
PORT=5050
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
NODE_ENV=development
ADMIN_PASSCODE=admin123
```

### 3. Run in Development Mode
Starts both the Express backend (`http://localhost:5050`) and the Vite frontend (`http://localhost:5173`) in parallel:
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Run Full-Stack Production Server
```bash
npm run start
```
The Express server serves the compiled React frontend from `dist/` and powers the `/api` endpoints simultaneously on port `5050`.

---

## 📡 API Reference

- `GET /api/health` — Backend status and database health
- `GET /api/profile` — Full profile information and stats
- `GET /api/projects` — Filterable projects (supports `?category=...&search=...`)
- `POST /api/projects/:id/like` — Increment project likes
- `POST /api/projects/:id/view` — Increment project views
- `GET /api/skills` — Categorized skills
- `GET /api/certificates` — Verified credentials
- `GET /api/education` — Academic background
- `GET /api/testimonials` — Approved recommendations
- `POST /api/testimonials` — Submit a new endorsement
- `POST /api/contact` — Submit contact inquiry
- `GET /api/contact/messages` — Retrieve inquiries (requires header `x-admin-key: admin123`)
- `PATCH /api/contact/messages/:id` — Update message status (`read`/`unread`)
- `DELETE /api/contact/messages/:id` — Delete message
- `GET /api/analytics` — Real-time telemetry metrics

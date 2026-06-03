# EventSphere

A modern, production-quality event booking platform built as a Web Development Internship project. Discover premium events, explore details, and register — all with a polished UI inspired by Eventbrite, Luma, Airbnb, and Stripe.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Project Overview

**EventSphere** lets users browse curated events, filter and search in real time, view rich event details (agenda, speakers), and complete ticket registration. Data is served from static JSON; bookings and preferences persist in **LocalStorage** — no backend required.

## Features

### Core
- **Home page** — Hero with countdown, featured/upcoming events, categories, stats, testimonials, newsletter
- **Events listing** — Grid layout, search, category/date filters, sorting
- **Event details** — Banner, metadata, agenda, speakers, registration CTA
- **Booking flow** — Validated form (React Hook Form + Zod) → LocalStorage → confirmation page

### Bonus
- Dark mode toggle (next-themes)
- Favorite events (LocalStorage)
- Recently viewed events
- Ticket availability indicators
- Skeleton loading states
- Empty states

### UX & Quality
- Framer Motion animations (fade, slide, hover, page transitions)
- Responsive design (mobile, tablet, desktop)
- Semantic HTML, ARIA labels, keyboard navigation
- SEO metadata + OpenGraph + Twitter cards per page
- Next.js Image optimization

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 (App Router) | Framework, routing, SSR |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Shadcn UI patterns | Accessible UI primitives |
| Framer Motion | Animations |
| Lucide React | Icons |
| React Hook Form + Zod | Forms & validation |
| LocalStorage | Bookings, favorites, newsletter |

## Folder Structure

```
app/                    # App Router pages & layouts
├── page.tsx            # Home
├── events/             # Events list & [id] detail
├── book/[id]/          # Registration
└── confirmation/       # Success page

components/
├── ui/                 # Shadcn-style primitives
├── layout/             # Navbar, Footer, ThemeToggle
├── home/               # Hero, Newsletter, Stats, etc.
├── events/             # EventCard, EventGrid, SearchBar
├── booking/            # BookingForm, ConfirmationCard
├── motion/             # FadeIn, PageTransition
└── providers/          # ThemeProvider

features/               # Page-level client features
├── events/
└── confirmation/

data/                   # Static JSON (events, testimonials)
hooks/                  # useFavorites, useCountdown, etc.
lib/                    # Utils, storage, validations, metadata
types/                  # TypeScript interfaces
public/                 # Static assets
```

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

```bash
# Clone or navigate to the project
cd "Event booking platform"

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Screenshots

> Add screenshots of the home page, events listing, event detail, booking form, and confirmation page here after running the app.

Suggested captures:
1. Home — hero + featured events
2. `/events` — search and filters
3. `/events/evt-001` — event detail
4. `/book/evt-001` — registration form
5. `/confirmation` — success state (after booking)

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/events` | Browse all events |
| `/events/[id]` | Event details |
| `/book/[id]` | Registration |
| `/confirmation` | Booking success |

## Data & Storage

- **Events:** `data/events.ts` (14 events with full metadata)
- **Bookings:** `localStorage` key `eventsphere_bookings`
- **Favorites:** `eventsphere_favorites`
- **Recently viewed:** `eventsphere_recently_viewed`
- **Newsletter:** `eventsphere_newsletter`

## Future Improvements

- [ ] Backend API with real ticket inventory
- [ ] User authentication & booking history dashboard
- [ ] PDF ticket generation
- [ ] Payment integration (Stripe)
- [ ] Email notifications (Resend/SendGrid)
- [ ] Admin panel for event management
- [ ] Map integration for venues
- [ ] i18n / multi-language support
- [ ] PWA offline support

## License

Built for educational purposes as a Web Development Internship project.

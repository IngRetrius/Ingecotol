# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**Ingecotol ltda** is a professional corporate website for a civil engineering and telecommunications company. Built with React 19 + Vite 7, featuring a sophisticated animation system with GSAP and smooth scrolling with Lenis.

**Tech Stack:**
- React 19.1.1 with React Router 7.8.2
- Vite 7.1.2 (build tool)
- Tailwind CSS 4.1.12
- GSAP 3.13.0 with SplitText, ScrollTrigger, Physics2DPlugin
- Lenis 1.3.11 (smooth scrolling)

## Development Commands

```bash
pnpm dev      # Start development server (http://localhost:5173)
pnpm build    # Build for production
pnpm preview  # Preview production build
pnpm lint     # Run ESLint
```

## Project Structure

```
blank-studio/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── AnchorMenu.jsx
│   │   │   ├── BallCursor.jsx
│   │   │   ├── InkButton.jsx
│   │   │   ├── LinkMenu.jsx
│   │   │   ├── SimpleButton.jsx
│   │   │   └── SlideButton.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       └── Layout.jsx
│   ├── pages/
│   │   ├── Intro.jsx         # Landing page with brand animation
│   │   ├── Tienda.jsx        # Product catalog (masonry grid)
│   │   └── NotFound.jsx      # 404 page
│   ├── sections/             # Main app sections
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   └── Contact.jsx
│   ├── hooks/
│   │   ├── useFontLoading.js
│   │   └── useLocationHash.js
│   ├── theme/
│   │   └── colors.js         # Centralized color palette
│   ├── router/
│   │   └── index.jsx         # Route configuration
│   ├── main.jsx
│   └── index.css             # Global styles + Tailwind
├── public/
│   ├── fonts/                # Oswald + Lato font files
│   ├── icons/
│   └── images/
└── [config files]
```

## Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Intro.jsx` | Animated brand landing page |
| `/app` | `Layout.jsx` | Main SPA with all sections |
| `/tienda` | `Tienda.jsx` | Product catalog with masonry grid |
| `*` | `NotFound.jsx` | 404 handler |

**Navigation within `/app`:** Uses hash-based anchors:
- `#home-section`
- `#about-section`
- `#services-section`
- `#portfolio-section`
- `#contact-section`

## Color System (Plan 1: Corporativo Tech)

Colors are defined in `src/theme/colors.js`:

```javascript
// Primary Colors
darkBlue: '#0A2342'    // Titles, nav, footer
mediumBlue: '#2f5597'  // Secondary elements, decorative bars
lightBlue: '#4A90E2'   // Accents, cursor, service borders

// Accent Colors
red: '#DC3545'         // CTAs, buttons, registered mark
darkRed: '#A02128'     // Hover states

// Neutral Colors
white: '#FFFFFF'       // Backgrounds, text on dark
techGray: '#E8EEF2'    // Alternate section backgrounds
textGray: '#4A5568'    // Body text
borderGray: '#CBD5E0'  // Lines, separators
```

**Inline usage:** Colors are applied via Tailwind with hex values:
```jsx
<h1 className="text-[#0A2342]">Title</h1>
<button className="bg-[#DC3545] hover:bg-[#A02128]">CTA</button>
```

## Key Components

### BallCursor
Custom animated cursor that follows the mouse.
- Uses `forwardRef` for external positioning control
- Accepts `positionInitialCursor` prop for initial coordinates
- Color: Light Blue (`#4A90E2`)

### InkButton
Button with GSAP Physics2D ink splash effect.
- Border/text: Dark Blue
- Ink particles: Red (`#DC3545`)
- Requires `ballCursorRef` prop for cursor integration

### Header
Fixed navigation with collapsible mobile menu.
- Background: Dark Blue (`#0A2342`)
- Animated menu with GSAP

### Layout
Main app wrapper with:
- ReactLenis smooth scrolling (synced with GSAP ticker)
- Footer with copyright
- BallCursor component

## Animation System

All GSAP code must be wrapped in `useGSAP` hook:

```jsx
import { useGSAP } from "@gsap/react";

useGSAP(() => {
  gsap.from(".element", { /* ... */ });
}, { dependencies: [fontsLoaded] });
```

**Critical:** Wait for fonts before animating text:
```jsx
const fontsLoaded = useFontLoading();

useGSAP(() => {
  if (!fontsLoaded) return;
  // Animate text here
}, { dependencies: [fontsLoaded] });
```

## Tienda (Product Catalog)

Masonry grid layout using CSS `column-count`:

```css
.masonry-grid {
  column-count: 3;
  column-gap: 1rem;
}

.masonry-item {
  break-inside: avoid; /* Critical for masonry */
}
```

**Product sizes:** `normal`, `tall`, `wide`, `large`
**Categories:** Redes, Seguridad, Cableado, Infraestructura, Energia, Almacenamiento, Herramientas

## Fonts

- **Oswald** (Variable, 200-700): Titles, headings
- **Lato** (Multiple weights): Body text

Fonts are preloaded in `index.html` and checked via `useFontLoading` hook.

## Deployment

Configured for Vercel with SPA rewrites in `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Important Patterns

1. **Component refs:** Interactive components accept `ballCursorRef` for cursor integration
2. **Section IDs:** All sections use `id="{name}-section"` pattern for anchor navigation
3. **Scroll sync:** Lenis smooth scrolling is synced with GSAP ticker in Layout.jsx
4. **State management:** Local state only (useState, useRef), no global state library

## Accessibility

All color combinations meet WCAG 2.1 AA standards:
- Dark Blue on White: 15.8:1 (AAA)
- Medium Blue on White: 4.7:1 (AA)
- Red on White: 4.5:1 (AA)
- Text Gray on White: 8.6:1 (AAA)

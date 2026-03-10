# PROTEA Website Pages Design

## Overview

Add Shop, About, and Contact pages to the PROTEA protein drink website. Maintain the existing premium black/white aesthetic with GSAP scroll animations. Update all navigation links to point to real routes.

## Pages

### Shop (`/shop`)

**Hero banner** — ~60vh, large heading ("The Collection"), fade-in animation.

**Flavor grid** — 3 cards in a row (1 column mobile):
- White Peach (warm peach/amber accent)
- Cactus/Lime (green/teal accent)
- Berry Oolong (deep rose/purple accent)

Each card: product image placeholder, flavor name, short tagline, price, "Quick View" button.

**Product modal** — Backdrop blur overlay. Larger product image, flavor name, full description, nutrition specs (20g protein, 70cal, 0g sugar), quantity selector, "Add to Cart" button, close button.

**Cart slide-out** — Right-side panel triggered by cart icon. Shows items, quantities, total, "Checkout Coming Soon" message.

### About (`/about`)

**Hero** — ~70vh, large heading ("The Standard, Redefined." or similar), scroll-fade entrance.

**Brand story** — Split layout (text left, image right; stacked on mobile). Origin narrative, mission, brand meaning. `[PHOTO: Lifestyle shot]`

**Values strip** — 3 columns (stacked mobile). Bold keyword + supporting text each. Staggered fade-in. Keywords: "Clean", "Honest", "Uncompromising."

**Product deep-dive** — "What's Inside" heading. Split layout (image left, text right). Key ingredients, what's left out. Inline specs counter. `[PHOTO: Ingredients flat-lay]`

**Closing statement** — Full-width centered text. Single strong brand promise sentence. Fade-in.

### Contact (`/contact`)

**Hero** — ~50vh, "Get In Touch.", fade-in.

**Contact info** — Centered. Email (mailto: link), social icons row (Instagram, TikTok, X), short tagline line. Intentionally minimal with generous whitespace.

**Closing** — Small centered PROTEA logo + tagline.

## Shared Updates

**BlobMenu links:**
- Home → `/`
- Shop → `/shop`
- About → `/about`
- Contact → `/contact`

**Fixed buttons:**
- "Buy Now" (homepage top-right) → `/shop`
- "Order Now" (FinalCTA) → `/shop`

**Cart Context** — `CartProvider` in `layout.tsx`:
- State: `{ flavor, quantity, price }[]`
- Actions: add, remove, update quantity
- Cart icon in top-right on non-homepage pages

**Page transitions** — Simple GSAP fade-in on mount per page.

**Metadata** — Fix title from "NOVA" to "PROTEA", update description.

## Tech

- Next.js App Router for new routes
- React Context for cart state (no external libraries)
- GSAP for animations (already installed)
- Tailwind CSS for styling (already installed)
- No new dependencies required

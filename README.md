# Smart Assetz

Nigeria's Premium Property & Partner Ecosystem — Demo

## Features

- 🏠 **Property Listings** — Browse verified properties with filters
- 🎓 **Student Hostels** — Campus accommodation with ratings and amenities
- 💰 **Virtual Wallet** — Fund, transfer, track transactions
- 🔐 **KYC/NIN Verification** — Simulated facial biometrics
- 🎨 **Theme Switcher** — Multiple color themes
- 👤 **Avatar Customization** — Emoji or initials
- 🏢 **Partner Portals** — Agent, seller, landlord, investor, tenant, student, and short-let flows
- 🛒 **Checkout Flow** — Escrow deposit → payment → confirmation

## Tech Stack

- **Next.js 16**
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**
- **Lucide Icons**

## Deployment Setup

This project is designed to run on Vercel without needing live local edits after deployment.

### Required Vercel environment variables

Set these in your Vercel project dashboard under Settings → Environment Variables:

```env
NEXT_PUBLIC_APP_URL=https://your-demo-app.vercel.app
NEXT_PUBLIC_PARTNER_PORTAL_URL=https://your-partner-app.vercel.app
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

Use live production URLs in Vercel. Do not use local host URLs for production.

### Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Built by

[Jare's Choice Labs (JCLs)](https://jclab-portfolio.vercel.app/)

© 2026 AY'SMART INVESTMENT LTD

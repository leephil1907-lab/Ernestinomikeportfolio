# Ernest Achuka — Personal Portfolio

A premium, dark editorial portfolio for Ernest Achuka, Founder of Reachmark Digital.

## Stack
- Next.js 15 App Router + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Vercel Analytics

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Production build
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Import `leephil1907-lab/Ernestinomikeportfolio` into Vercel.
2. Set the environment variables from `.env.example`.
3. Deploy using the Next.js preset.

## Before launch
- Replace the designed project-preview panels with approved, real product screenshots in `public/projects/`.
- Verify each live project URL and repository link.
- Add approved client testimonials only when supplied.
- Add Resend contact delivery and server-side validation before enabling a contact form.
- Set the final production domain in `NEXT_PUBLIC_SITE_URL`.

Project descriptions are positioning summaries, not claims of measured business results.

## Interface and portfolio features
- Liquid Glass-inspired navigation, content surfaces, modal and mobile contact dock.
- Scroll progress, active-section navigation, command palette (`Ctrl/Cmd + K`) and back-to-top control.
- Reduced-motion-aware Lenis scrolling, Framer Motion section reveals and a lazy-loaded 3D hero.
- Expertise, capabilities, founder story, entrepreneurial journey and working approach sections.
- Filterable project collection, cinematic visual treatment, project quick-view dialog and individual project routes.
- Responsive mobile navigation, keyboard focus states and skip-to-content link.
- Contact form API with Zod validation, honeypot and Resend delivery.

## Real project imagery
The project artwork component supports genuine local screenshots through the optional `image` property in `data/projects.ts`. Place approved captures in `public/projects/` and set each project's image path. Until then, the cards use a clearly stylized interface composition rather than claiming to show a real product screenshot.

## Required environment
`RESEND_API_KEY` and `CONTACT_TO` are required to deliver contact form messages. Configure a verified sender domain in Resend and update the `from` address in `app/api/contact/route.ts` before production.

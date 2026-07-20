# Ayushi Gupta — Portfolio

Personal portfolio built with Next.js (App Router), Tailwind CSS v4 and
Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To open the site on your phone over Wi-Fi, use your machine's LAN address
(e.g. `http://192.168.1.119:3000`). Those origins are already allowed in
[`next.config.ts`](next.config.ts) — without that, Next blocks the `/_next/*`
requests and the page loads with no images, CSS or JavaScript.

---

## Environment variables

Create `.env.local` in the project root:

```bash
RESEND_API_KEY=re_your_key_here
```

`.env*` is gitignored, so keys are never committed.

| Variable | Required | What it does |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the contact form | Authenticates sending. Without it the form returns a 500. |

Messages are delivered to the `email` set in
[`src/config/site.ts`](src/config/site.ts).

### Getting the Resend API key

The contact form ([`src/app/api/contact/route.ts`](src/app/api/contact/route.ts))
sends mail through [Resend](https://resend.com). Free tier covers 3,000 emails
a month, which is far more than a portfolio will ever need.

1. **Sign up at [resend.com/signup](https://resend.com/signup) using the same
   address the form should deliver to** — the one set as `email` in
   [`src/config/site.ts`](src/config/site.ts).

   This matters. Without a verified domain, Resend's shared sender
   (`onboarding@resend.dev`) may only send to the address that owns the Resend
   account. Sign up with a different address and every message is rejected.

2. Verify the email Resend sends you.

3. Go to **[API Keys](https://resend.com/api-keys)** in the dashboard →
   **Create API Key**.
   - Name: anything, e.g. `portfolio-local`
   - Permission: **Sending access** is enough
   - Domain: leave as *All domains*

4. Copy the key — it starts with `re_` and is **shown only once**. Losing it
   just means creating another one.

5. Paste it into `.env.local`:

   ```bash
   RESEND_API_KEY=re_your_key_here
   ```

6. Restart the dev server. Next only reads env files at boot, so a running
   server will not pick up the new key.

7. Submit the form. The message should arrive within a few seconds — check
   spam the first time.

### Using your own domain (optional)

Sending from `onboarding@resend.dev` works, but mail arrives from Resend rather
than from you. Once you own a domain, add it under
**[Domains](https://resend.com/domains)**, follow the DNS records they give
you, then change the `from` address in
[`src/app/api/contact/route.ts`](src/app/api/contact/route.ts) to something like
`hello@yourdomain.com`. That also lifts the "only send to yourself" limit.

### Deploying

`.env.local` never leaves your machine. On Vercel, add `RESEND_API_KEY` under
**Project → Settings → Environment Variables**, then redeploy. Forgetting this
is the usual reason a form that works locally fails in production.

---

## Where the content lives

Content is deliberately static — plain TypeScript files, no CMS or database.
Editing one and pushing is a one-minute round trip, and it keeps the site fast
and free to host.

| File | Holds |
| --- | --- |
| [`src/config/site.ts`](src/config/site.ts) | Name, role, email, location, availability, social links |
| [`src/data/hero.ts`](src/data/hero.ts) | Hero copy and the floating info capsules |
| [`src/data/about.ts`](src/data/about.ts) | About paragraphs |
| [`src/data/skills.ts`](src/data/skills.ts) | Skill groups (also drives the "Technologies" stat) |
| [`src/data/resume.ts`](src/data/resume.ts) | Education and experience (also drives the "Companies" stat) |
| [`src/data/projects.ts`](src/data/projects.ts) | Portfolio projects and their categories |
| [`src/data/navigation.ts`](src/data/navigation.ts) | Nav items and social links |

The GitHub contributions graph is the one live piece — it fetches from GitHub
in the browser, so it stays current on its own.

## Theming

Design tokens live in [`src/app/globals.css`](src/app/globals.css) under
`@theme`, with light-mode overrides on `:root[data-theme="light"]`. The theme
is stored in `localStorage` and applied before paint by
[`public/theme-init.js`](public/theme-init.js), so there is no flash on load.

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

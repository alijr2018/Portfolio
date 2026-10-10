# Rami Abdelali — Personal Portfolio

A polished, responsive React + TypeScript + Tailwind CSS portfolio for **Rami Abdelali**: a full-stack developer in training with a mechanical-design background. Its CV, 1337 transcript (issued 09 October 2026), supplied GitHub profile, and current ft_transcendence work inform the content.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS
- Framer Motion, with `prefers-reduced-motion` support
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Vite prints a local address (normally `http://localhost:5173`). Use `npm run build` to create a production build and `npm run preview` to serve that build locally.

```bash
npm run lint
npm run build
npm run preview
```

## Customize content

All portfolio copy, skills, projects, timeline entries, service copy, contact details, and social links live in:

```text
src/data/profile.ts
```

Key editable fields include:

- `name`, `initials`, `role`, `location`, and availability
- Contact details and social URLs
- Bio, skills, projects, and timeline entries
- Public `sourceUrl` values for projects

The contact section is intentionally simple: it provides a direct `mailto:` link to Rami’s email address and does not collect or store visitor data.

> **Privacy note:** The public site intentionally uses Rami’s city rather than his street address and does not show the date of birth, phone number, or full academic transcript. Review the email in `profile.ts` before publishing.

## Project structure

```text
src/
├── components/          # Reusable header, reveal, and section UI
├── data/profile.ts      # Central editable portfolio content
├── styles/index.css     # Tailwind entry point + global accessibility styles
├── App.tsx              # Page composition
└── main.tsx             # React entry point
```

## Deployment

The site is a static Vite build, so it can be deployed anywhere that serves static files.

### Vercel

1. Push this branch/repository to GitHub.
2. Import the repository at [vercel.com](https://vercel.com/new).
3. Vercel detects Vite automatically. If prompted, use:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy, then update the profile data with your production contact and social URLs.

### Netlify

1. Create a new site from the Git repository at [netlify.com](https://app.netlify.com/start).
2. Set **Build command** to `npm run build`.
3. Set **Publish directory** to `dist`.
4. Deploy.

### GitHub Pages

This repository uses GitHub Pages' branch deployment. Build the Pages version with:

```bash
npm run build:pages
```

That command creates the static site in `docs/` with relative asset paths. Configure GitHub Pages to serve the `/docs` folder from the `main` branch.

For another static host, publish the contents of `dist` after running `npm run build`.

## Quality checks included

- Responsive navigation with keyboard-accessible mobile menu
- Semantic sections, visible focus states, a skip link, labels, and strong contrast
- Respect for reduced-motion preferences
- Functional anchor navigation, public source links, and direct email contact
- Production build and lint scripts

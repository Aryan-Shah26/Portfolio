# Engineering Observatory

Personal engineering portfolio for Aryan Shah. The site presents projects, GitHub activity, technical experience, a resume, and a local retrieval-based AI assistant in a data-oriented interface.

Live site: [aryanshah.vercel.app](https://aryanshah.vercel.app)

## Features

- Overview dashboard with live GitHub metrics and contribution activity
- Project explorer backed by the GitHub GraphQL API
- Project search, category/status filters, and sorting
- Analytics view for repository, language, star, and contribution data
- Local RAG-style AI assistant over curated portfolio knowledge
- Markdown and GitHub-Flavored Markdown rendering in assistant responses
- Resume page with a deployable `public/resume.pdf` download
- Contact form with server-side email delivery through Resend
- Responsive desktop sidebar and mobile navigation
- Accessible keyboard behavior for the mobile navigation and form controls

## Tech Stack

- [Next.js](https://nextjs.org) 16 App Router
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [Resend](https://resend.com) for contact email delivery
- [React Markdown](https://github.com/remarkjs/react-markdown) and [remark-gfm](https://github.com/remarkjs/remark-gfm)
- Recharts, D3, Framer Motion, Lucide React, and utility libraries

## Requirements

- Node.js 20 or newer recommended
- npm
- A GitHub personal access token with permission to read the configured account's repositories and contribution data
- A Resend account and verified sender domain for the contact form

## Local Setup

Clone the repository, install dependencies, configure the environment, and start the development server:

```bash
git clone <repository-url>
cd portfolio
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On macOS/Linux, use `cp .env.example .env.local` instead of `copy`.

## Environment Variables

Create `.env.local` locally and add the following server-only variables. Never commit real values.

```env
GITHUB_API_TOKEN=github-token-with-required-read-access
GITHUB_USERNAME=your-github-username

RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Portfolio <hello@your-verified-domain.com>

# Optional. Use this only when the resume is hosted outside this project.
RESUME_URL=https://your-domain.com/resume.pdf
```

### GitHub

`GITHUB_API_TOKEN` and `GITHUB_USERNAME` are used by the server-side GitHub service. The app paginates through owned repositories and fetches repository metadata, language data, and contribution calendar data.

If GitHub is unavailable or not configured, the API returns a service-unavailable response and the client pages show an error state rather than presenting fabricated metrics.

### Contact Form

The contact form sends messages through the server route `/api/contact`; the API key is never exposed to the browser. `RESEND_FROM_EMAIL` must be a sender address or domain accepted by Resend. Messages are delivered to the email address in `src/lib/constants.ts` and use the visitor's address as `reply_to`.

The endpoint includes basic field validation, a hidden honeypot field, and an in-memory rate limit. For a multi-instance production deployment, replace the in-memory limit with a shared service such as Upstash Redis or add platform-level rate limiting.

### Resume

For the normal Vercel workflow, place the file at:

```text
public/resume.pdf
```

The Resume page detects this file automatically and provides a direct download. Replace the file and redeploy whenever the resume changes. `RESUME_URL` can override the local file with an HTTPS URL.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run check` | Run lint, typecheck, and build in sequence |

Run the full pre-deployment check with:

```bash
npm run check
```

## Project Structure

```text
src/
  app/                 Next.js routes and API handlers
  components/          Shared layout, overview, project, and resume UI
  data/                Resume data, metrics, and AI knowledge entries
  lib/
    services/          GitHub and blog data services
    constants.ts       Site configuration and navigation
    types.ts           Shared TypeScript contracts
public/                Static assets, including resume.pdf
```

Important routes:

- `/` - Overview dashboard
- `/projects` - GitHub-backed project explorer
- `/analytics` - GitHub analytics
- `/ai` - Portfolio knowledge assistant
- `/resume` - Resume and download action
- `/contact` - Contact form and social links
- `/api/github-stats` - Server-side GitHub data endpoint
- `/api/contact` - Server-side contact email endpoint

## Deployment

The project is designed for [Vercel](https://vercel.com):

1. Push the repository to GitHub without `.env.local` or other secrets.
2. Import the repository into Vercel.
3. Add `GITHUB_API_TOKEN`, `GITHUB_USERNAME`, `RESEND_API_KEY`, and `RESEND_FROM_EMAIL` in the Vercel project environment settings.
4. Add `public/resume.pdf` to the repository if the local resume download is required.
5. Deploy and verify `/`, `/projects`, `/analytics`, `/resume`, and `/contact`.

Do not use a Windows filesystem path such as `C:\Users\...` in `RESUME_URL`; that path exists only on the local computer and cannot be served by Vercel.

## Security Notes

- `.env.local` and all `.env.*` files are ignored by Git.
- Rotate any credential that has accidentally been exposed or committed.
- Keep GitHub and Resend keys server-side; do not prefix them with `NEXT_PUBLIC_`.
- Use a verified Resend domain in production.
- Review the contact endpoint's rate limiting before high-traffic deployment.

## License

No open-source license has been selected for this repository yet. Add a `LICENSE` file before publishing if you want others to reuse or modify the code under defined terms.

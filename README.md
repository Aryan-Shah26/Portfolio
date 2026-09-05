This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Form

The contact form sends messages through [Resend](https://resend.com) without redirecting visitors. Add these server-only variables to `.env.local` and your deployment environment:

```env
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Portfolio <hello@your-verified-domain.com>
```

`RESEND_FROM_EMAIL` must use a domain verified in Resend. Messages are delivered to the email address configured in `src/lib/constants.ts`.

To use a downloadable resume, place the file at `public/resume.pdf`. This file is deployed by Vercel and can be replaced whenever the resume changes. The page detects it automatically.

If you later host the resume elsewhere, you can override the local file with this server-side variable:

```env
RESUME_URL=https://your-domain.com/resume.pdf
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

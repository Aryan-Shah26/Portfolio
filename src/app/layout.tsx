import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryanshah.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Aryan Shah — Engineering Observatory",
    template: "%s | Aryan Shah",
  },
  description:
    "AI/ML Engineer & Data Scientist — Explore projects, experiments, and engineering work through data.",
  keywords: [
    "AI",
    "ML",
    "Machine Learning",
    "Data Science",
    "Software Engineering",
    "Portfolio",
    "Aryan Shah",
  ],
  authors: [{ name: "Aryan Shah" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryanshah.dev",
    title: "Aryan Shah — Engineering Observatory",
    description:
      "AI/ML Engineer & Data Scientist — Explore projects, experiments, and engineering work through data.",
    siteName: "Engineering Observatory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Shah — Engineering Observatory",
    description:
      "AI/ML Engineer & Data Scientist — Explore projects, experiments, and engineering work through data.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <Sidebar />

          {/* Mobile Navigation */}
          <MobileNav />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64">
            <div className="mx-auto max-w-6xl px-4 py-6 pt-16 sm:px-6 lg:px-8 lg:pt-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

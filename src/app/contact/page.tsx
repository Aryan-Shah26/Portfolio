'use client';

import { SITE_CONFIG } from '@/lib/constants';
import { Mail } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    document.title = 'Contact | Aryan Shah';
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    const website = (form.elements.namedItem('website') as HTMLInputElement).value;

    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message.');
      }

      form.reset();
      setStatus({ type: 'success', message: 'Your message was sent successfully.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to send your message.',
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Get in Touch</h1>
        <p className="text-muted">
          Have a question, opportunity, or just want to connect? Reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-card border-2 border-border rounded-none px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="w-full bg-card border-2 border-border rounded-none px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="How can I help you?"
                className="w-full bg-card border-2 border-border rounded-none px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground resize-none"
              />
            </div>

            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />
            
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-primary text-primary-foreground rounded-none py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            {status && (
              <p
                role="status"
                className={status.type === 'success' ? 'text-sm text-green-500' : 'text-sm text-red-400'}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>

        <div className="glass-card p-6 h-fit">
          <h2 className="text-lg font-semibold text-foreground mb-4">Direct Contact</h2>
          
          <div className="flex flex-col">
            <a 
              href={SITE_CONFIG.github} 
              className="flex items-center gap-3 py-3 border-b border-border text-muted hover:text-foreground transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            
            <a 
              href={SITE_CONFIG.linkedin} 
              className="flex items-center gap-3 py-3 border-b border-border text-muted hover:text-foreground transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE_CONFIG.email)}`}
              className="flex items-center gap-3 py-3 text-muted hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

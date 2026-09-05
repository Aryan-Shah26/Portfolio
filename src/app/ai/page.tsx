'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizontal, ExternalLink, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { findBestResponse } from '@/data/ai-knowledge';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { AISource } from '@/lib/types';

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: AISource[];
}

const SUGGESTED_PROMPTS = [
  "Which project best demonstrates ML engineering?",
  "Explain Aryan's RAG work.",
  "What technologies does Aryan use?",
  "Which projects are deployed?",
  "Compare Aryan's AI projects.",
  "Tell me about Aryan's experience.",
  "What is Aryan's education background?"
];

export default function AIPage() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: "Hi! I'm Aryan's AI assistant. I can answer questions about his projects, technical skills, experience, and engineering work. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const query = input;

    setTimeout(() => {
      const match = findBestResponse(query);
      
      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: match 
          ? match.response 
          : "I don't have specific information about that in my knowledge base. Try asking about Aryan's projects, technical skills, experience, or education.",
        sources: match?.sources
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700); // 800-1500ms
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
        <p className="text-muted">
          Ask anything about my projects, skills, experience, or technical work.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 glass-card p-0 flex flex-col h-[600px] overflow-hidden">
          <div className="bg-card/80 px-4 py-3 border-b border-border rounded-t-xl flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Ask my AI</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[80%]",
                  msg.role === 'user' ? "self-end items-end" : "self-start items-start"
                )}
              >
                <div 
                  className={cn(
                    "px-4 py-2.5 text-sm",
                    msg.role === 'user' 
                      ? "bg-primary/20 text-foreground rounded-2xl rounded-br-md" 
                      : "bg-card text-foreground rounded-2xl rounded-bl-md border-2 border-border"
                  )}
                >
                  {msg.role === 'assistant' ? (
                    <div className="space-y-2 leading-6 [&_a]:text-primary-light [&_a]:underline [&_code]:rounded [&_code]:bg-background/60 [&_code]:px-1 [&_code]:py-0.5 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:text-base [&_h2]:font-semibold [&_h3]:font-semibold [&_li]:ml-4 [&_ol]:list-decimal [&_p]:min-h-5 [&_strong]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-border [&_th]:bg-background/50 [&_th]:px-2 [&_th]:py-1 [&_ul]:list-disc">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => {
                            void node;
                            return <a {...props} target="_blank" rel="noreferrer" />;
                          },
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                
                {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-1">
                    {msg.sources.map((src, i) => {
                      const linkHref = src.type === 'project' 
                        ? `/projects/${src.slug}` 
                        : src.type === 'blog' 
                          ? `/blog/${src.slug}` 
                          : '#';
                          
                      const isLink = !!src.slug;

                      const SourceCard = (
                        <div className="flex items-center gap-1.5 bg-card/50 hover:bg-card border-2 border-border rounded-none px-3 py-1.5 text-xs transition-colors group">
                          <Tag className="w-3 h-3 text-muted" />
                          <span className="text-muted group-hover:text-foreground">
                            <span className="font-medium mr-1 capitalize">{src.type}:</span>
                            {src.title}
                          </span>
                          {isLink && <ExternalLink className="w-3 h-3 text-muted ml-1" />}
                        </div>
                      );

                      return isLink ? (
                        <Link key={i} href={linkHref}>
                          {SourceCard}
                        </Link>
                      ) : (
                        <div key={i}>{SourceCard}</div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="self-start items-start flex flex-col max-w-[80%]">
                <div className="px-4 py-3 bg-card text-foreground rounded-2xl rounded-bl-md border-2 border-border flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-border p-4 flex gap-2">
            <input
              id="ai-query"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, experience..."
              className="flex-1 bg-card border-2 border-border rounded-none px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
            />
            <label htmlFor="ai-query" className="sr-only">Ask a question</label>
            <button 
              type="submit"
              aria-label="Send question"
              disabled={!input.trim() || isTyping}
              className="bg-primary text-primary-foreground rounded-none p-2.5 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="w-full lg:w-80 glass-card p-5 h-fit space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Suggested Questions</h3>
          <div className="space-y-2">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handlePromptClick(prompt)}
                className="w-full text-left text-sm text-muted hover:text-foreground bg-card hover:bg-card-hover border-2 border-border rounded-none px-3 py-2.5 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

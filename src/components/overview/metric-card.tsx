'use client';

import { useEffect, useRef, useState } from 'react';
import { FolderGit2, GitCommitHorizontal, Code2, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  index?: number;
}

const iconMap: Record<string, React.ElementType> = {
  FolderGit2,
  GitCommitHorizontal,
  Code2,
  Layers,
};

function useCountUp(endValue: string | number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const numericEnd = typeof endValue === 'number' 
    ? endValue 
    : parseInt(endValue.toString().replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericEnd));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericEnd, duration, hasAnimated]);

  return { count, ref };
}

export default function MetricCard({ title, value, subtitle, icon, index = 0 }: MetricCardProps) {
  const Icon = iconMap[icon] || Code2;
  const { count, ref } = useCountUp(value);

  const displayValue = () => {
    if (typeof value === 'number') return count;
    const result = value.toString();
    if (result.includes('+')) return `${count}+`;
    if (result.includes(',')) return count.toLocaleString();
    return count;
  };

  return (
    <div 
      ref={ref}
      className={cn(
        "glass-card p-6 rounded-none hover:glow-sm transition-all duration-300",
        "flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4"
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="w-4 h-4 text-primary" />
      </div>
      
      <div>
        <div className="text-3xl font-bold text-foreground">
          {displayValue()}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1 h-1 rounded-full bg-accent-blue" />
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Tag({ children, variant = 'default', className }: TagProps) {
  const variants = {
    default: "bg-secondary text-secondary-foreground border-border",
    accent: "accent-bg text-accent border-accent/30",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs border editorial-spacing",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

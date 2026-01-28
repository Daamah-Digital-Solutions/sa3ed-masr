import { cn } from '@/lib/utils';

interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'accent' | 'primary';
  className?: string;
}

export function Chip({ 
  selected, 
  onClick, 
  children, 
  variant = 'accent',
  className 
}: ChipProps) {
  const baseStyles = "px-3 py-1.5 text-sm border transition-all cursor-pointer editorial-spacing select-none";
  
  const variants = {
    accent: selected 
      ? "bg-accent text-accent-foreground border-accent" 
      : "bg-transparent text-muted-foreground border-border hover:border-accent/50",
    primary: selected 
      ? "bg-primary text-primary-foreground border-primary" 
      : "bg-transparent text-muted-foreground border-border hover:border-foreground/30",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}

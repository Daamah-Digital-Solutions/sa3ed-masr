import { cn } from '@/lib/utils';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'primary';
  loading?: boolean;
}

export function SubmitButton({ 
  children, 
  variant = 'primary',
  loading,
  disabled,
  className,
  ...props 
}: SubmitButtonProps) {
  const variants = {
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  };

  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={cn(
        "px-6 py-2.5 text-sm font-medium transition-all editorial-spacing",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading ? 'جاري...' : children}
    </button>
  );
}

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm text-muted-foreground editorial-spacing">
            {label}
            {props.required && <span className="text-accent mr-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-3 py-2.5 bg-card border border-border text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none focus:border-accent transition-colors text-sm min-h-[120px] resize-none",
            error && "border-destructive",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

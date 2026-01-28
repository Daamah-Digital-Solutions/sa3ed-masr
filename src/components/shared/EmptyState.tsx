import { Link } from 'react-router-dom';

interface EmptyStateProps {
  message: string;
  actionLabel: string;
  actionLink: string;
}

export function EmptyState({ message, actionLabel, actionLink }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl text-muted-foreground/20 mb-4">◇</div>
      <p className="text-muted-foreground mb-6 editorial-spacing">{message}</p>
      <Link
        to={actionLink}
        className="inline-block px-4 py-2 bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-colors editorial-spacing"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

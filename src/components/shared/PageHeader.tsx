interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center accent-bg px-3 py-1 text-xs text-accent mb-4 editorial-spacing">
        {label}
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 editorial-spacing">{title}</h1>
      {description && (
        <p className="text-muted-foreground max-w-lg">{description}</p>
      )}
    </div>
  );
}

import { Tag } from '@/components/ui/Tag';
import { EXPERTISE_AREAS, HELP_TYPES } from '@/lib/constants';

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    title?: string | null;
    company?: string | null;
    expertise: string[];
    help_types?: string[] | null;
    linkedin?: string | null;
    email: string;
    message?: string | null;
  };
}

export function MentorCard({ mentor }: MentorCardProps) {
  const getExpertiseLabel = (id: string) => {
    const area = EXPERTISE_AREAS.find((a) => a.id === id);
    return area ? `${area.icon} ${area.label}` : id;
  };

  return (
    <div className="p-5 bg-card border border-border card-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{mentor.name}</h3>
            <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 glow-dot" />
          </div>
          
          {(mentor.title || mentor.company) && (
            <p className="text-sm text-muted-foreground mb-3 editorial-spacing">
              {mentor.title}
              {mentor.title && mentor.company && ' · '}
              {mentor.company}
            </p>
          )}
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            {mentor.expertise.map((exp) => (
              <Tag key={exp} variant="accent">
                {getExpertiseLabel(exp)}
              </Tag>
            ))}
          </div>
          
          {mentor.message && (
            <p className="text-sm text-muted-foreground italic quote-border mt-4 leading-relaxed">
              "{mentor.message}"
            </p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-border">
        {mentor.linkedin && (
          <a
            href={mentor.linkedin.startsWith('http') ? mentor.linkedin : `https://${mentor.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-xs border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-center editorial-spacing"
          >
            LinkedIn
          </a>
        )}
        <a
          href={`mailto:${mentor.email}`}
          className="px-3 py-2 text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center editorial-spacing flex-1"
        >
          تواصل ←
        </a>
      </div>
    </div>
  );
}

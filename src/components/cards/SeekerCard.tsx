import { Tag } from '@/components/ui/Tag';
import { HELP_TYPES, STAGES } from '@/lib/constants';

interface SeekerCardProps {
  seeker: {
    id: string;
    name: string;
    startup?: string | null;
    stage?: string | null;
    needs?: string[] | null;
    description: string;
    email: string;
    linkedin?: string | null;
  };
}

export function SeekerCard({ seeker }: SeekerCardProps) {
  const getHelpLabel = (id: string) => {
    const help = HELP_TYPES.find((h) => h.id === id);
    return help?.label || id;
  };

  const getStageLabel = (id: string) => {
    const stage = STAGES.find((s) => s.id === id);
    return stage?.label || id;
  };

  const truncatedDescription = seeker.description.length > 150
    ? seeker.description.slice(0, 150) + '...'
    : seeker.description;

  return (
    <div className="p-5 bg-card border border-border card-hover">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3 className="font-semibold text-foreground">{seeker.name}</h3>
            {seeker.startup && (
              <>
                <span className="text-muted-foreground">·</span>
                <span className="text-accent font-medium">{seeker.startup}</span>
              </>
            )}
          </div>
          
          {seeker.stage && (
            <Tag variant="accent" className="mb-3">
              {getStageLabel(seeker.stage)}
            </Tag>
          )}
          
          {seeker.needs && seeker.needs.length > 0 && (
            <div className="mb-3">
              <span className="text-xs text-muted-foreground ml-2 editorial-spacing">محتاج:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {seeker.needs.map((need) => (
                  <Tag key={need} variant="default">
                    {getHelpLabel(need)}
                  </Tag>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {truncatedDescription}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-border">
        {seeker.linkedin && (
          <a
            href={seeker.linkedin.startsWith('http') ? seeker.linkedin : `https://${seeker.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-xs border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-center editorial-spacing"
          >
            LinkedIn
          </a>
        )}
        <a
          href={`mailto:${seeker.email}`}
          className="px-3 py-2 text-xs bg-accent text-accent-foreground hover:bg-accent/90 transition-colors text-center editorial-spacing flex-1"
        >
          تواصل للمساعدة ←
        </a>
      </div>
    </div>
  );
}

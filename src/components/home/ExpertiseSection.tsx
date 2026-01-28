import { EXPERTISE_AREAS } from '@/lib/constants';
import { Tag } from '@/components/ui/Tag';

export function ExpertiseSection() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-xs text-muted-foreground mb-4 editorial-spacing uppercase tracking-widest">
          مجالات الخبرة
        </h2>
        <div className="flex flex-wrap gap-2">
          {EXPERTISE_AREAS.map((area) => (
            <Tag key={area.id} variant="default">
              <span>{area.icon}</span>
              <span>{area.label}</span>
            </Tag>
          ))}
        </div>
      </div>
    </section>
  );
}

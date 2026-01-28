import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function StatsSection() {
  const { data: mentorCount = 0 } = useQuery({
    queryKey: ['mentorCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('mentors')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  const { data: seekerCount = 0 } = useQuery({
    queryKey: ['seekerCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('seekers')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-6 accent-bg-solid text-accent-foreground">
            <div className="text-3xl md:text-4xl font-bold mb-1">{mentorCount}</div>
            <div className="text-sm opacity-80 editorial-spacing">خبير</div>
          </div>
          
          <div className="p-6 bg-card border border-border">
            <div className="text-3xl md:text-4xl font-bold mb-1">{seekerCount}</div>
            <div className="text-sm text-muted-foreground editorial-spacing">رائد أعمال</div>
          </div>
          
          <div className="p-6 bg-card border border-border">
            <div className="text-3xl md:text-4xl font-bold mb-1">10</div>
            <div className="text-sm text-muted-foreground editorial-spacing">مجال</div>
          </div>
          
          <div className="p-6 bg-card border border-border flex flex-col justify-center">
            <Link
              to="/mentors"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors editorial-spacing block"
            >
              تصفح المنتورز ←
            </Link>
            <Link
              to="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors editorial-spacing block mt-2"
            >
              تصفح المشاريع ←
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

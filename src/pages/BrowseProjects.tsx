import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterBar } from '@/components/shared/FilterBar';
import { SeekerCard } from '@/components/cards/SeekerCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { HELP_TYPES } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';

export default function BrowseProjects() {
  const [filter, setFilter] = useState('all');

  const { data: seekers = [], isLoading } = useQuery({
    queryKey: ['seekers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seekers')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredSeekers = filter === 'all'
    ? seekers
    : seekers.filter((s) => s.needs?.includes(filter));

  return (
    <Layout>
      <div className="container py-12">
        <PageHeader label="رواد الأعمال" title="المشاريع اللي محتاجة مساعدة" />

        <FilterBar
          options={HELP_TYPES.map((h) => ({ id: h.id, label: h.label }))}
          selected={filter}
          onSelect={setFilter}
        />

        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : filteredSeekers.length === 0 ? (
          <EmptyState
            message="لا يوجد طلبات مساعدة بعد"
            actionLabel="سجل مشروعك ←"
            actionLink="/seeker-register"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSeekers.map((seeker) => (
              <SeekerCard key={seeker.id} seeker={seeker} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

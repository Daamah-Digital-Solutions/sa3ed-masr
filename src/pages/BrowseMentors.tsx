import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterBar } from '@/components/shared/FilterBar';
import { MentorCard } from '@/components/cards/MentorCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { EXPERTISE_AREAS } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';

export default function BrowseMentors() {
  const [filter, setFilter] = useState('all');

  const { data: mentors = [], isLoading } = useQuery({
    queryKey: ['mentors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredMentors = filter === 'all'
    ? mentors
    : mentors.filter((m) => m.expertise.includes(filter));

  return (
    <Layout>
      <div className="container py-12">
        <PageHeader label="الدليل" title="المنتورز" />

        <FilterBar
          options={EXPERTISE_AREAS.map((a) => ({ id: a.id, label: a.label, icon: a.icon }))}
          selected={filter}
          onSelect={setFilter}
        />

        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : filteredMentors.length === 0 ? (
          <EmptyState
            message="لا يوجد خبراء مسجلين بعد"
            actionLabel="كن الأول ←"
            actionLink="/mentor-register"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

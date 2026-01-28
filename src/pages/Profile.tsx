import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tag } from '@/components/ui/Tag';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { EXPERTISE_AREAS, HELP_TYPES, STAGES } from '@/lib/constants';

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const { data: mentorProfile, isLoading: mentorLoading } = useQuery({
    queryKey: ['mentorProfile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: seekerProfile, isLoading: seekerLoading } = useQuery({
    queryKey: ['seekerProfile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('seekers')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const isLoading = authLoading || mentorLoading || seekerLoading;

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container py-24 max-w-md text-center">
          <span className="inline-block px-3 py-1 text-xs bg-accent/15 text-accent mb-4 editorial-spacing">
            الملف الشخصي
          </span>
          <h1 className="text-2xl font-bold mb-4 editorial-spacing">
            سجل دخولك أولاً
          </h1>
          <p className="text-muted-foreground mb-6 editorial-spacing">
            لازم تسجل دخولك عشان تشوف بياناتك
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors editorial-spacing"
          >
            تسجيل الدخول ←
          </button>
        </div>
      </Layout>
    );
  }

  const getExpertiseLabel = (id: string) => {
    const area = EXPERTISE_AREAS.find(a => a.id === id);
    return area ? `${area.icon} ${area.label}` : id;
  };

  const getHelpTypeLabel = (id: string) => {
    const type = HELP_TYPES.find(t => t.id === id);
    return type ? type.label : id;
  };

  const getStageLabel = (id: string) => {
    const stage = STAGES.find(s => s.id === id);
    return stage ? stage.label : id;
  };

  const hasNoProfiles = !mentorProfile && !seekerProfile;

  return (
    <Layout>
      <div className="container py-12 max-w-3xl">
        <PageHeader
          label="الملف الشخصي"
          title="بياناتك"
          description={user.email || ''}
        />

        {hasNoProfiles && (
          <div className="text-center py-12 border border-border bg-card">
            <span className="text-4xl opacity-20 block mb-4">◇</span>
            <p className="text-muted-foreground mb-6 editorial-spacing">
              لم تسجل أي بيانات بعد
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/mentor-register')}
                className="px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors editorial-spacing"
              >
                سجل كمنتور ←
              </button>
              <button
                onClick={() => navigate('/seeker-register')}
                className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors editorial-spacing"
              >
                اطلب مساعدة ←
              </button>
            </div>
          </div>
        )}

        {mentorProfile && (
          <div className="border border-border bg-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-accent text-lg">◈</span>
                <h2 className="text-lg font-bold editorial-spacing">بيانات المنتور</h2>
              </div>
              <button
                onClick={() => navigate('/mentor-register')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors editorial-spacing"
              >
                تعديل ←
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">الاسم</span>
                  <p className="font-medium">{mentorProfile.name}</p>
                </div>
                {mentorProfile.title && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">المنصب</span>
                    <p className="font-medium">{mentorProfile.title}</p>
                  </div>
                )}
                {mentorProfile.company && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">الشركة</span>
                    <p className="font-medium">{mentorProfile.company}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">الإيميل</span>
                  <p className="font-medium">{mentorProfile.email}</p>
                </div>
              </div>

              {mentorProfile.expertise && mentorProfile.expertise.length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-2">مجالات الخبرة</span>
                  <div className="flex flex-wrap gap-2">
                    {mentorProfile.expertise.map((exp) => (
                      <Tag key={exp} variant="accent">{getExpertiseLabel(exp)}</Tag>
                    ))}
                  </div>
                </div>
              )}

              {mentorProfile.help_types && mentorProfile.help_types.length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-2">نوع المساعدة</span>
                  <div className="flex flex-wrap gap-2">
                    {mentorProfile.help_types.map((type) => (
                      <Tag key={type} variant="default">{getHelpTypeLabel(type)}</Tag>
                    ))}
                  </div>
                </div>
              )}

              {mentorProfile.message && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">رسالة للشباب</span>
                  <p className="text-sm italic border-r-2 border-accent pr-3 text-muted-foreground">
                    "{mentorProfile.message}"
                  </p>
                </div>
              )}

              {mentorProfile.linkedin && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">LinkedIn</span>
                  <a 
                    href={mentorProfile.linkedin.startsWith('http') ? mentorProfile.linkedin : `https://${mentorProfile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                  >
                    {mentorProfile.linkedin}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {seekerProfile && (
          <div className="border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-accent text-lg">◉</span>
                <h2 className="text-lg font-bold editorial-spacing">طلب المساعدة</h2>
              </div>
              <button
                onClick={() => navigate('/seeker-register')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors editorial-spacing"
              >
                تعديل ←
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">الاسم</span>
                  <p className="font-medium">{seekerProfile.name}</p>
                </div>
                {seekerProfile.startup && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">الـ Startup</span>
                    <p className="font-medium text-accent">{seekerProfile.startup}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">الإيميل</span>
                  <p className="font-medium">{seekerProfile.email}</p>
                </div>
                {seekerProfile.stage && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">المرحلة</span>
                    <span className="inline-block px-2 py-0.5 text-xs bg-accent/15 text-accent">
                      {getStageLabel(seekerProfile.stage)}
                    </span>
                  </div>
                )}
              </div>

              {seekerProfile.needs && seekerProfile.needs.length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-2">محتاج مساعدة في</span>
                  <div className="flex flex-wrap gap-2">
                    {seekerProfile.needs.map((need) => (
                      <Tag key={need} variant="default">{getHelpTypeLabel(need)}</Tag>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs text-muted-foreground block mb-1">وصف المشروع</span>
                <p className="text-sm text-muted-foreground">{seekerProfile.description}</p>
              </div>

              {seekerProfile.linkedin && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">LinkedIn</span>
                  <a 
                    href={seekerProfile.linkedin.startsWith('http') ? seekerProfile.linkedin : `https://${seekerProfile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                  >
                    {seekerProfile.linkedin}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {!hasNoProfiles && (
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {!mentorProfile && (
              <button
                onClick={() => navigate('/mentor-register')}
                className="px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors editorial-spacing"
              >
                سجل كمنتور أيضاً ←
              </button>
            )}
            {!seekerProfile && (
              <button
                onClick={() => navigate('/seeker-register')}
                className="px-6 py-3 border border-border hover:bg-muted transition-colors editorial-spacing"
              >
                اطلب مساعدة أيضاً ←
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

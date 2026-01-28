import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { Chip } from '@/components/ui/Chip';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { HELP_TYPES, STAGES } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export default function SeekerRegister() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, loading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    startup: '',
    description: '',
    email: '',
    linkedin: '',
  });
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  // Check if user already has a seeker profile
  const { data: existingProfile, isLoading: profileLoading } = useQuery({
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

  // Populate form with existing data
  useEffect(() => {
    if (existingProfile) {
      setFormData({
        name: existingProfile.name,
        startup: existingProfile.startup || '',
        description: existingProfile.description,
        email: existingProfile.email,
        linkedin: existingProfile.linkedin || '',
      });
      setSelectedStage(existingProfile.stage);
      setSelectedNeeds(existingProfile.needs || []);
    } else if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [existingProfile, user]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const seekerData = {
        name: formData.name.trim(),
        startup: formData.startup.trim() || null,
        stage: selectedStage,
        needs: selectedNeeds.length > 0 ? selectedNeeds : null,
        description: formData.description.trim(),
        email: formData.email.trim(),
        linkedin: formData.linkedin.trim() || null,
        user_id: user.id,
      };

      if (existingProfile) {
        const { error } = await supabase
          .from('seekers')
          .update(seekerData)
          .eq('id', existingProfile.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('seekers').insert(seekerData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: existingProfile ? "تم التحديث ✓" : "تم الإرسال ✓",
        description: existingProfile ? "تم تحديث بياناتك بنجاح" : "هنتواصل معاك في أقرب وقت",
      });
      queryClient.invalidateQueries({ queryKey: ['seekers'] });
      queryClient.invalidateQueries({ queryKey: ['seekerProfile'] });
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "برجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!existingProfile) throw new Error('No profile to delete');
      const { error } = await supabase
        .from('seekers')
        .delete()
        .eq('id', existingProfile.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "تم الحذف ✓",
        description: "تم حذف بياناتك بنجاح",
      });
      queryClient.invalidateQueries({ queryKey: ['seekers'] });
      queryClient.invalidateQueries({ queryKey: ['seekerProfile'] });
      navigate('/');
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "برجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const isValid = formData.name.trim() && formData.description.trim() && formData.email.trim();

  if (authLoading || profileLoading) {
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
            طلب مساعدة
          </span>
          <h1 className="text-2xl font-bold mb-4 editorial-spacing">
            سجل دخولك أولاً
          </h1>
          <p className="text-muted-foreground mb-6 editorial-spacing">
            لازم تسجل دخولك عشان تقدر تطلب مساعدة
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

  return (
    <Layout>
      <div className="container py-12 max-w-2xl">
        <PageHeader
          label={existingProfile ? "تعديل البيانات" : "طلب مساعدة"}
          title={existingProfile ? "تعديل طلبك" : "محتاج مساعدة"}
          description={existingProfile ? "عدل بياناتك أو احذفها" : "قولنا عن مشروعك وهنوصلك بالخبراء المناسبين"}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="الاسم"
              placeholder="الاسم الكامل"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <FormInput
              label="الـ Startup"
              placeholder="اسم المشروع"
              value={formData.startup}
              onChange={(e) => setFormData({ ...formData, startup: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 editorial-spacing">
              المرحلة
            </label>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((stage) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                  className={`flex-1 min-w-[60px] px-3 py-2 text-sm border transition-all editorial-spacing ${
                    selectedStage === stage.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 editorial-spacing">
              محتاج مساعدة في
            </label>
            <div className="flex flex-wrap gap-2">
              {HELP_TYPES.map((type) => (
                <Chip
                  key={type.id}
                  selected={selectedNeeds.includes(type.id)}
                  onClick={() => toggleNeed(type.id)}
                  variant="primary"
                >
                  {type.label}
                </Chip>
              ))}
            </div>
          </div>

          <FormTextarea
            label="وصف المشروع"
            placeholder="احكيلنا عن مشروعك والمساعدة المطلوبة..."
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="الإيميل"
              type="email"
              placeholder="email@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormInput
              label="LinkedIn"
              placeholder="linkedin.com/in/..."
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
          </div>

          <div className="flex gap-4">
            <SubmitButton
              disabled={!isValid}
              loading={mutation.isPending}
              variant="primary"
              className="flex-1"
            >
              {existingProfile ? "تحديث ←" : "إرسال ←"}
            </SubmitButton>
            
            {existingProfile && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('هل أنت متأكد من حذف بياناتك؟')) {
                    deleteMutation.mutate();
                  }
                }}
                disabled={deleteMutation.isPending}
                className="px-6 py-3 border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors editorial-spacing"
              >
                {deleteMutation.isPending ? "جاري الحذف..." : "حذف"}
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}

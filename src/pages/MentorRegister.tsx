import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { Chip } from '@/components/ui/Chip';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { EXPERTISE_AREAS, HELP_TYPES } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export default function MentorRegister() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, loading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    linkedin: '',
    email: '',
    message: '',
  });
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedHelpTypes, setSelectedHelpTypes] = useState<string[]>([]);

  // Check if user already has a mentor profile
  const { data: existingProfile, isLoading: profileLoading } = useQuery({
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

  // Populate form with existing data
  useEffect(() => {
    if (existingProfile) {
      setFormData({
        name: existingProfile.name,
        title: existingProfile.title || '',
        company: existingProfile.company || '',
        linkedin: existingProfile.linkedin || '',
        email: existingProfile.email,
        message: existingProfile.message || '',
      });
      setSelectedExpertise(existingProfile.expertise || []);
      setSelectedHelpTypes(existingProfile.help_types || []);
    } else if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [existingProfile, user]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const mentorData = {
        name: formData.name.trim(),
        title: formData.title.trim() || null,
        company: formData.company.trim() || null,
        expertise: selectedExpertise,
        help_types: selectedHelpTypes.length > 0 ? selectedHelpTypes : null,
        linkedin: formData.linkedin.trim() || null,
        email: formData.email.trim(),
        message: formData.message.trim() || null,
        user_id: user.id,
      };

      if (existingProfile) {
        const { error } = await supabase
          .from('mentors')
          .update(mentorData)
          .eq('id', existingProfile.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('mentors').insert(mentorData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: existingProfile ? "تم التحديث ✓" : "تم التسجيل ✓",
        description: existingProfile ? "تم تحديث بياناتك بنجاح" : "شكراً لانضمامك لمجتمع ساعد مصر",
      });
      queryClient.invalidateQueries({ queryKey: ['mentors'] });
      queryClient.invalidateQueries({ queryKey: ['mentorProfile'] });
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
        .from('mentors')
        .delete()
        .eq('id', existingProfile.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "تم الحذف ✓",
        description: "تم حذف بياناتك بنجاح",
      });
      queryClient.invalidateQueries({ queryKey: ['mentors'] });
      queryClient.invalidateQueries({ queryKey: ['mentorProfile'] });
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

  const toggleExpertise = (id: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const toggleHelpType = (id: string) => {
    setSelectedHelpTypes((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const isValid = formData.name.trim() && formData.email.trim() && selectedExpertise.length > 0;

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
            تسجيل منتور
          </span>
          <h1 className="text-2xl font-bold mb-4 editorial-spacing">
            سجل دخولك أولاً
          </h1>
          <p className="text-muted-foreground mb-6 editorial-spacing">
            لازم تسجل دخولك عشان تقدر تسجل كمنتور
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
          label={existingProfile ? "تعديل البيانات" : "تسجيل منتور"}
          title={existingProfile ? "تعديل بياناتك" : "عايز أساعد"}
          description={existingProfile ? "عدل بياناتك أو احذفها" : "سجل بياناتك وهنوصلك بالناس اللي محتاجة خبرتك"}
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
              label="المنصب"
              placeholder="CEO, CTO..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <FormInput
            label="الشركة"
            placeholder="اسم الشركة"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />

          <div>
            <label className="block text-sm text-muted-foreground mb-2 editorial-spacing">
              مجالات الخبرة <span className="text-accent">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {EXPERTISE_AREAS.map((area) => (
                <Chip
                  key={area.id}
                  selected={selectedExpertise.includes(area.id)}
                  onClick={() => toggleExpertise(area.id)}
                  variant="accent"
                >
                  {area.icon} {area.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 editorial-spacing">
              نوع المساعدة
            </label>
            <div className="flex flex-wrap gap-2">
              {HELP_TYPES.map((type) => (
                <Chip
                  key={type.id}
                  selected={selectedHelpTypes.includes(type.id)}
                  onClick={() => toggleHelpType(type.id)}
                  variant="primary"
                >
                  {type.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="LinkedIn"
              placeholder="linkedin.com/in/..."
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
            <FormInput
              label="الإيميل"
              type="email"
              placeholder="email@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <FormTextarea
            label="رسالة للشباب"
            placeholder="نصيحة أو كلمة..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <div className="flex gap-4">
            <SubmitButton
              disabled={!isValid}
              loading={mutation.isPending}
              variant="accent"
              className="flex-1"
            >
              {existingProfile ? "تحديث ←" : "تسجيل ←"}
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

export const EXPERTISE_AREAS = [
  { id: 'finance', label: 'تمويل', icon: '₿' },
  { id: 'marketing', label: 'تسويق', icon: '◎' },
  { id: 'programming', label: 'برمجة', icon: '⌘' },
  { id: 'ai', label: 'AI', icon: '◈' },
  { id: 'operations', label: 'عمليات', icon: '⚙' },
  { id: 'sales', label: 'مبيعات', icon: '◉' },
  { id: 'product', label: 'منتجات', icon: '◐' },
  { id: 'legal', label: 'قانوني', icon: '§' },
  { id: 'fintech', label: 'Fintech', icon: '◇' },
  { id: 'growth', label: 'Growth', icon: '↗' },
] as const;

export const HELP_TYPES = [
  { id: 'mentorship', label: 'منتورشيب' },
  { id: 'training', label: 'تدريب' },
  { id: 'funding', label: 'تمويل' },
  { id: 'partnerships', label: 'شراكات' },
  { id: 'hiring', label: 'توظيف' },
  { id: 'consulting', label: 'استشارات' },
] as const;

export const STAGES = [
  { id: 'idea', label: 'فكرة' },
  { id: 'mvp', label: 'MVP' },
  { id: 'early', label: 'Early' },
  { id: 'growth', label: 'Growth' },
  { id: 'scale', label: 'Scale' },
] as const;

export const NAV_ITEMS = [
  { path: '/', label: 'الرئيسية', shortLabel: 'الرئيسية' },
  { path: '/mentor-register', label: 'عايز أساعد', shortLabel: 'أساعد' },
  { path: '/seeker-register', label: 'محتاج مساعدة', shortLabel: 'أحتاج' },
  { path: '/mentors', label: 'تصفح المنتورز', shortLabel: 'منتورز' },
  { path: '/projects', label: 'تصفح المشاريع', shortLabel: 'مشاريع' },
] as const;
